import { ethers } from "ethers";

export default async function ConnectWallet(options) {
  if(options.customProvider) {
      const {
          chainId,
          nativeCurrency,
          chainName,
          rpcUrls,
          blockExplorerUrls
      } = options.customProvider;

    if (typeof window.ethereum !== "undefined") {
        const {ethereum} = window;

        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xA86A" }],
          });
        } catch (switchError) {
          /**
           * @dev This error code 4902 indicates that the chain
           * has not been added to MetaMask.
           * */
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId,
                    nativeCurrency,
                    chainName,
                    rpcUrls: rpcUrls[0],
                    blockExplorerUrls: blockExplorerUrls[0],
                  },
                ],
              });
            } catch (error) {
              throw new Error({
                error,
                msg: "Error while adding Avalanche C-Chain to MetaMask!",
              });
            }
          }
        }
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
      } else {
        throw new Error({ msg: "Metamask not found!" });
      }
  }else{
    if (typeof window.ethereum !== "undefined") {
        const {ethereum} = window;

        const provider = new ethers.providers.Web3Provider(ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
      } else {
        throw new Error({ msg: "Metamask not found!" });
      }
  }  
}
