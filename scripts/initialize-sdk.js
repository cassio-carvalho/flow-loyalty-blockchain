import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import dotenv from "dotenv";
dotenv.config();

// A few quick checks to make sure our .env is working.
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("🛑 Chave privada não encontrada.")
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("🛑 Endereço de carteira não encontrado.")
}

if (!process.env.THIRDWEB_CLIENT_ID || process.env.THIRDWEB_CLIENT_ID === "") {
  console.log("🛑 Client ID não encontrado.")
}

if (!process.env.THIRDWEB_SECRET_KEY || process.env.THIRDWEB_SECRET_KEY === "") {
  console.log("🛑 Secret Key não encontrada.")
}

const sdk = ThirdwebSDK.fromPrivateKey(
  process.env.PRIVATE_KEY, 
  "mumbai",
  {
    clientId: process.env.THIRDWEB_CLIENT_ID,
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  }
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK inicializado pelo endereço:", address)
  } catch (err) {
    console.error("Falha ao buscar apps no sdk", err);
    process.exit(1);
  }
})()

export default sdk;