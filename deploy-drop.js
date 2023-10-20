import { AddressZero } from "@ethersproject/constants";
import { readFileSync } from "fs";
import sdk from "./initialize-sdk.js";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "Membro Flower",
      description: "Membros apoiadores do Flow Podcast",
      image: readFileSync("assets/flow-logo.png"),
      // We need to provide the address of the person who will be receiving the proceeds from the sales of the module's NFTs.
      // We are planning not to charge people for the drop, so we will pass the address 0x0
      // You can set this up for your own wallet if you want to charge for the drop.
      primary_sale_recipient: AddressZero,
    });

    // this initialization returns the address of our contract
    const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");

    // with this, we have the metadata in our contract
    const metadata = await editionDrop.metadata.get();
    
    console.log(
      "✅ Contrato editionDrop implantado com sucesso, endereço:",
      editionDropAddress,
    );
    console.log(
      "✅ bundleDrop metadados:",
      metadata,
    );
  } catch (error) {
    console.log("falha ao implantar contrato editionDrop", error);
  }
})()