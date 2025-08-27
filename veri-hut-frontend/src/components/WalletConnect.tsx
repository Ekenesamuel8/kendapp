// src/components/WalletConnect.tsx

import { useState } from 'react';
import { ethers } from 'ethers';

// Add this type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState<string>('');

  // Function to connect to the wallet (e.g., MetaMask)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request the user's accounts (MetaMask will prompt the user)
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []); // Request account
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setWalletAddress(address);
        setIsConnected(true);

        // Sign a message with the wallet's private key (for authentication)
        const message = "Please sign this message to authenticate.";
        const signature = await signer.signMessage(message);

        // Send the wallet address and signature to the backend for verification
        await verifyWallet(address, signature);
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Function to send the wallet address and signature to your Django backend
  const verifyWallet = async (address: string, signature: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-wallet/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: address,
          signature: signature,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Wallet verified successfully!");
        // You can store the response data (user details, JWT tokens, etc.)
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error verifying wallet:", error);
    }
  };

  return (
    <div>
      <h1>Connect Your Wallet</h1>
      {isConnected ? (
        <div>
          <p>Wallet Connected: {walletAddress}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>
          {isConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
