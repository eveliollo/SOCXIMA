const {Connection, PublicKey, LAMPORTS_PER_SOL} = require('@solana/web3.js');
const connection = new Connection('https://api.devnet.solana.com');
async function getBalance(pub){
  try {
    const b = await connection.getBalance(new PublicKey(pub));
    return (b/LAMPORTS_PER_SOL).toFixed(4);
  } catch {return 0;}
}
module.exports = {connection, getBalance};
