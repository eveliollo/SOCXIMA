const {Transaction, SystemProgram} = require('@solana/web3.js');
async function createEscrow(from, to, amount){
  return {status:'pending', from, to, amount, tx:true};
}
module.exports = {createEscrow};
