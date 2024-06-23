import * as fs from 'fs';
import * as path from 'path';

interface Args {
  directory: string;
  exclude: string[];
  output_file: string;
}

function filter_files_and_directories(
  directory: string,
  exclude: string[],
): string[] {
  const filtered_files: string[] = [];
  const files = fs.readdirSync(directory);

  for (const file of files) {
    if (!exclude.some((excluded) => file.includes(excluded))) {
      filtered_files.push(path.resolve(directory, file));
    }
  }

  return filtered_files;
}

function main() {
  const args: Args = {
    directory: process.argv[2],
    exclude: process.argv.slice(3, -1),
    output_file: process.argv[process.argv.length - 1],
  };

  const filtered_files = filter_files_and_directories(
    args.directory,
    args.exclude,
  );

  fs.writeFileSync(args.output_file, JSON.stringify(filtered_files, null, 4));

  console.log(`Filtered files have been saved to ${args.output_file}`);
}

main();
