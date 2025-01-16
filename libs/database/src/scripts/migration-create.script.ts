import { spawn } from 'child_process';

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Error: Only one migration name is allowed');
    process.exit(1);
  }

  const migrationName = args[0];

  if (!migrationName) {
    console.error('Error: Migration name is required');
    process.exit(1);
  }

  const typeormCommandArgs = ['typeorm', 'migration:create', `./libs/database/src/migrations/${migrationName}`];

  const lintCommandArgs = ['migration:lint'];

  const buildCommandPromise = (command: string, commandArgs: string[]) =>
    new Promise<void>((resolve, reject) => {
      const typeOrmProcess = spawn(command, commandArgs);

      typeOrmProcess.stdout.on('end', () => {
        resolve();
      });

      typeOrmProcess.stdout.on('data', (data: Buffer) => {
        console.log(data.toString().trim());
      });

      typeOrmProcess.stderr.on('data', (data: Buffer) => {
        console.error(data.toString().trim());
        reject();
      });
    });

  await buildCommandPromise('yarn', typeormCommandArgs);
  await buildCommandPromise('yarn', lintCommandArgs);
}

if (require.main === module) {
  main();
}
