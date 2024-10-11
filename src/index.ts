#!/usr/bin/env node

import { generateKeyPair } from "./genKeyPair";
import { encryptFile, decryptFile } from "./algos";
import { signFile, verifySignature } from "./sign";


function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case '--generate':
      generateKeyPair();
      break;

    case '--encrypt':
      const inputFileEncrypt = args[1];
      const outputFileEncrypt = args[2] || `${inputFileEncrypt}.enc`;

      if (!inputFileEncrypt) {
        console.log("Usage: rsa-tool --encrypt <inputFile> [outputFile]");
        return;
      }
      encryptFile(inputFileEncrypt, outputFileEncrypt);
      break;

    case '--decrypt':
      const inputFileDecrypt = args[1];
      const outputFileDecrypt = args[2] || `${inputFileDecrypt}.dec`;

      if (!inputFileDecrypt) {
        console.log("Usage: rsa-tool --decrypt <inputFile> [outputFile]");
        return;
      }
      decryptFile(inputFileDecrypt, outputFileDecrypt);
      break;

    case '--sign':
      const inputFileSign = args[1];
      const signatureFile = args[2];

      if (!inputFileSign || !signatureFile) {
        console.log("Usage: rsa-tool --sign <inputFile> <signatureFile>")
      }
      signFile(inputFileSign, signatureFile);
      break;

    case '--verify':
      const inputFileVerification = args[1];
      const signatureFileVerification = args[2];

      if (!inputFileVerification || !signatureFileVerification) {
        console.log("Usage: rsa-tool --verify <inputFile> <signatureFile>")
      }
      verifySignature(inputFileVerification, signatureFileVerification);
      break;


    default:
      console.log("Usage:");
      console.log("  rsa-tool --generate");
      console.log("  rsa-tool --encrypt <inputFile> [outputFile]");
      console.log("  rsa-tool --decrypt <inputFile> [outputFile]");
      console.log("  rsa-tool --sign <inputFile> <signatureFile>");
      console.log("  rsa-tool --verify <inputFile> <signatureFile>");
      break;
  }
}

main();
