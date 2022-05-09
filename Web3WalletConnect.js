import React from 'react'
import ConnectWallet from "./utils/ConnectWallet";

// export default function Web3WalletConnect(options) {
export default function Web3WalletConnect() {
  const options = {
      method: "connect",
    customProvider: {
      chainId: "0xA86A",
      nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
      },
      chainName: "Avalanche Mainnet C-Chain",
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://snowtrace.io/"],
    },
  };
  React.useEffect(() => {
    if(options.method === "connect"){
        ConnectWallet(options);
    }
  }, [])
}
