import { Connection, Transaction, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import { SystemProgram } from "@solana/web3.js";

// Load environment variables
import "dotenv/config";

// Define the payer's keypair
const payer = getKeypairFromEnvironment('SECRET_KEY');

// Define the recipient's public key
const recipientPublicKey = new PublicKey("92gY5W3yaHHZ1qKWVdYxZMwqgFyZy2KNetvrnQGfwgoo");

// Define the connection to the Devnet
const connection = new Connection("https://devnet.solana.com", 'confirmed');


// Get the payer's account info
const payerBalanceBefore = await connection.getBalance(payer.publicKey);
console.log(`Payer's balance before transaction: ${payerBalanceBefore / LAMPORTS_PER_SOL} SOL`);

// Define the transfer instruction
const instruction = SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: recipientPublicKey,
    lamports: 1 * LAMPORTS_PER_SOL // Transfer 1 SOL
});


// Create the transaction
const transaction = new Transaction().add(instruction);

// Sign the transaction
transaction.sign(payer);

// Serialize the transaction
const serializedTransaction = transaction.serialize();

// Send the transaction and get the transaction signature
const signature = await connection.sendRawTransaction(serializedTransaction);

console.log(`Transaction ${signature} confirmed.`);


// Confirm the transaction
await sendAndConfirmTransaction(connection, transaction, [payer]);

console.log(`Transaction ${signature} confirmed.`);

// Get the payer's account info after the transaction
const payerBalanceAfter = await connection.getBalance(payer.publicKey);
console.log(`Payer's balance after transaction: ${payerBalanceAfter / LAMPORTS_PER_SOL} SOL`);
