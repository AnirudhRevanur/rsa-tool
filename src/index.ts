#!/usr/bin/env node

import { generateKeyPair } from "./genKeyPair";
import { encryptFile, decryptFile } from "./algos";

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
      const publicKeyFile = args[3]

      if (!inputFileEncrypt) {
        console.log("Usage: rsa-cipher --encrypt <inputFile> [outputFile] [publicKey]");
        return;
      }
      encryptFile(inputFileEncrypt, outputFileEncrypt, publicKeyFile);
      break;

    case '--decrypt':
      const inputFileDecrypt = args[1];
      const outputFileDecrypt = args[2] || `${inputFileDecrypt}.dec`;
      const privateKeyFile = args[3]

      if (!inputFileDecrypt) {
        console.log("Usage: rsa-cipher --decrypt <inputFile> [outputFile] [privateKey]");
        return;
      }
      decryptFile(inputFileDecrypt, outputFileDecrypt, privateKeyFile);
      break;

    default:
      console.log("Usage:");
      console.log("  rsa-tool --generate");
      console.log("  rsa-tool --encrypt <inputFile> [outputFile] [publicKeyFile]");
      console.log("  rsa-tool --decrypt <inputFile> [outputFile] [privateKeyFile]");
      break;
  }
}

main();
