import { ConnectWallet, useAddress } from '@thirdweb-dev/react';

const App = () => {
  // Use the connectWallet hook that thirdweb gives us.
  const address = useAddress();
  console.log("👋 Address:", address);

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
  
  // This case where we have the user's address
  // which means he has connected his wallet to our website
  return (
    <div className="landing">
      <h1>Carteira Conectada</h1>
    </div>);
};

export default App;