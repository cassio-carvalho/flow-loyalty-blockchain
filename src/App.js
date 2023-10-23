import { ConnectWallet, Web3Button, useAddress, useContract, useNFTBalance } from '@thirdweb-dev/react';
import { useMemo } from 'react';

const App = () => {
  // Use the connectWallet hook that thirdweb gives us.
  const address = useAddress();
  console.log("👋 Address:", address);

  const editionDropAddress = "0x1F04620e4A295Bf0d1573b74d226530DffBF7642"
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");

  // Hook para verificar se o úsuario tem a NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

    const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
    }, [nftBalance])

  // This is the case where the user has not yet connected their wallet
  // Let it call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Bem-vindo ao Flow Loyalty Program</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🚴 Página dos membros do Flow</h1>
        <p>Obrigado por apoiar o Flow!</p>
      </div>
    )
   };
  
  // This case where we have the user's address
  // which means he has connected his wallet to our website
  return (
    <div className="mint-nft">
      <h1>Cunhe seu NFT 🍪 ele mostra que você é membro do Flow</h1>
      <div className="btn-hero">
        <Web3Button 
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT (FREE)
        </Web3Button>
      </div>
    </div>
  );

}

export default App;