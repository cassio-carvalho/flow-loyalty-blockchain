import { readFileSync } from "fs";
import sdk from "./initialize-sdk.js";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x533D3705F7c03cd857fcA68A03dc9dc94907B550", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "Flower",
        description: "Esse NFT vai te dar acesso à área de membros do Flow!",
        image: readFileSync("assets/flower.jpeg"),
      },
    ]);
    console.log("✅ Novo NFT criado com sucesso!");
  } catch (error) {
    console.error("falha ao criar o novo NFT", error);
  }
})()