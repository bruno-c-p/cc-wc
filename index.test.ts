import { describe, expect, test } from "bun:test";
import { spawnSync } from "bun";

const WC_PATH = "./index.ts";
const TEST_FILE = "test.txt";

describe("wc", () => {
  test("should count bytes with -c", () => {
    const { stdout } = spawnSync(["bun", WC_PATH, "-c", TEST_FILE]);

    const output = stdout.toString().trim();

    expect(output).toBe("23 test.txt");
  });

  test("should count lines with -l", () => {
    const { stdout } = spawnSync(["bun", WC_PATH, "-l", TEST_FILE]);

    const output = stdout.toString().trim();

    expect(output).toBe("2 test.txt");
  });

  test("should count words with -w", () => {
    const { stdout } = spawnSync(["bun", WC_PATH, "-w", TEST_FILE]);

    const output = stdout.toString().trim();

    expect(output).toBe("4 test.txt");
  });

  test("should count characters with -m", () => {
    const { stdout } = spawnSync(["bun", WC_PATH, "-m", TEST_FILE]);

    const output = stdout.toString().trim();

    expect(output).toBe("23 test.txt");
  });

  test("should output default stats with no flags", () => {
    const { stdout } = spawnSync(["bun", WC_PATH, TEST_FILE]);

    const output = stdout.toString().trim();

    expect(output).toBe("2 4 23 test.txt");
  });

  test("should read from stdin", () => {
    const input = "one two three";
    const { stdout } = spawnSync(["bun", WC_PATH], {
      stdin: Buffer.from(input),
    });

    const output = stdout.toString().trim();

    expect(output).toBe("0 \t3 \t13");
  });
});
