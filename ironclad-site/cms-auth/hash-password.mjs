// Make a password hash for the USERS secret:  node hash-password.mjs <username>
// Prompts for the password (not echoed, never stored in shell history) and prints the JSON entry.
import { hashPassword } from './worker.js';
import readline from 'node:readline';

const user = (process.argv[2] || '').trim().toLowerCase();
if (!user) { console.error('Usage: node hash-password.mjs <username>'); process.exit(1); }
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl._writeToOutput = (s) => { if (!rl.muted) rl.output.write(s); };
process.stdout.write('Password (min 14 characters): '); rl.muted = true;
rl.question('', async (pw) => {
  rl.close(); process.stdout.write('\n');
  if (pw.length < 14) { console.error('Too short: use at least 14 characters.'); process.exit(1); }
  console.log(JSON.stringify({ [user]: await hashPassword(pw) }));
});
