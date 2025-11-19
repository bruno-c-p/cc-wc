# wc

A modern TypeScript implementation of the classic UNIX `wc` (word count) command, built with Bun. This tool counts lines, words, characters, and bytes in text files or from standard input.

## Features

- **Line counting** (`-l`): Count newline characters in the input
- **Word counting** (`-w`): Count words separated by Unicode whitespace
- **Character counting** (`-m`): Count Unicode characters
- **Byte counting** (`-c`): Count raw bytes in the input
- **Standard input support**: Read from stdin when no file is provided
- **Multiple file support**: Process files from command line arguments
- **Unicode aware**: Properly handles Unicode whitespace and characters

## Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd wc
```

2. Install dependencies:

```bash
bun install
```

3. Make the script executable (optional):

```bash
chmod +x index.ts
```

## Usage

### Basic Usage

```bash
# Count lines, words, and characters in a file
bun index.ts file.txt

# Or using the binary command (after setup)
bun run wc file.txt
```

### Options

- `-l`: Count only lines
- `-w`: Count only words
- `-m`: Count only characters
- `-c`: Count only bytes

### Examples

```bash
# Count all metrics (default behavior)
bun index.ts README.md
# Output:     15     120    850    850 README.md

# Count only lines
bun index.ts -l README.md
# Output:     15 README.md

# Count only words
bun index.ts -w README.md
# Output:     120 README.md

# Count only characters
bun index.ts -m README.md
# Output:     850 README.md

# Count only bytes
bun index.ts -c README.md
# Output:     850 README.md

# Read from standard input
echo "Hello world" | bun index.ts
# Output:      1       2      12      12

# Count lines from stdin
echo -e "line1\nline2\nline3" | bun index.ts -l
# Output:      3
```

## Implementation Details

- **Language**: TypeScript
- **Runtime**: Bun
- **Unicode Support**: Uses `\s` regex pattern for Unicode whitespace detection
- **Stream Processing**: Efficiently processes large files using Node.js streams
- **Error Handling**: Graceful error handling with informative messages

## Development

### Running Tests

```bash
bun test
```

### Development Mode

```bash
bun --watch index.ts
```

## Compatibility

This implementation aims to be compatible with the standard UNIX `wc` command behavior, with the following considerations:

- Unicode whitespace detection for word counting
- Proper handling of different line endings
- Stream-based processing for memory efficiency
