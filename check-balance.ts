import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("92gY5W3yaHHZ1qKWVdYxZMwqgFyZy2KNetvrnQGfwgoo");
// const publicKey = new PublicKey('toly.sol');

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// const connection = new Connection("https://api.mainNet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);