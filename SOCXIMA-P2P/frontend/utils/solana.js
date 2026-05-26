export let walletPublicKey = null;
export async function connectPhantomWallet(){
  if(!window.solana?.isPhantom) return null;
  try {
    const resp = await window.solana.connect();
    walletPublicKey = resp.publicKey.toString();
    return walletPublicKey;
  } catch {return null;}
}
