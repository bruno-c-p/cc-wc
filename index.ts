#!/usr/bin/env bun
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import type { Readable } from "node:stream";

const UNICODE_WHITESPACE_REGEX = /\s/; // Matches any Unicode whitespace character. Spaces, tabs, newlines, and more.

let options: string | undefined = "";
let filePath: string | undefined = "";

const args = Bun.argv.slice(2);
if (args[0] && args[0].startsWith("-")) {
  options = args[0];
  filePath = args[1];
} else {
  options = undefined;
  filePath = args[0];
}

let fileStream: Readable;
if (filePath) {
  fileStream = createReadStream(filePath);
} else {
  fileStream = process.stdin || Bun.stdin;
}

const { charactersCount, lineCount, wordCount, bytesCount } =
  await countAllFromStream(fileStream);

try {
  switch (options?.substring(1)) {
    case "c":
      if (filePath) {
        const fileStats = await stat(filePath);
        printResult(filePath, fileStats.size);
      } else {
        printResult(filePath, bytesCount);
      }
      break;
    case "l":
      printResult(filePath, lineCount);
      break;
    case "w":
      printResult(filePath, wordCount);
      break;
    case "m":
      printResult(filePath, charactersCount);
      break;
    default:
      printResult(filePath, lineCount, wordCount, charactersCount);
  }
} catch (err) {
  if (err instanceof Error) console.error(err.message);
  process.exit(1);
}

function printResult(filePath: string | undefined, ...results: number[]) {
  if (filePath) {
    const message = results.join(" ");
    console.log(`${message} ${filePath}`);
  } else {
    const message = results.map((r) => `\t${r}`).join(" ");
    console.log(message);
  }
}

async function countAllFromStream(fileStream: Readable): Promise<{
  lineCount: number;
  wordCount: number;
  charactersCount: number;
  bytesCount: number;
}> {
  let inWord = false;
  let lineCount = 0;
  let wordCount = 0;
  let charactersCount = 0;
  let bytesCount = 0;

  return new Promise((resolve, reject) => {
    fileStream.on("data", (chunk: Buffer) => {
      bytesCount += chunk.length;

      const chunkStr = chunk.toString();

      for (let char of chunkStr) {
        charactersCount++;

        if (char === "\n") {
          lineCount++;
        }

        const isWhitespace = UNICODE_WHITESPACE_REGEX.test(char);
        if (isWhitespace && inWord) {
          inWord = false;
        } else if (!inWord && !isWhitespace) {
          inWord = true;
          wordCount++;
        }
      }
    });

    fileStream.on("error", (err) => reject(err));

    fileStream.on("end", () =>
      resolve({ lineCount, wordCount, charactersCount, bytesCount })
    );
  });
}
