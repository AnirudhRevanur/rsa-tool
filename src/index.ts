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

      if (!inputFileEncrypt) {
        console.log("Usage: rsa-cipher --encrypt <inputFile> [outputFile]");
        return;
      }
      encryptFile(inputFileEncrypt, outputFileEncrypt);
      break;

    case '--decrypt':
      const inputFileDecrypt = args[1];
      const outputFileDecrypt = args[2] || `${inputFileDecrypt}.dec`;
      if (!inputFileDecrypt) {
        console.log("Usage: rsa-cipher --decrypt <inputFile> [outputFile]");
        return;
      }
      decryptFile(inputFileDecrypt, outputFileDecrypt);
      break;

    default:
      console.log("Usage:");
      console.log("  rsa-tool --generate");
      console.log("  rsa-tool --encrypt <inputFile> [outputFile]");
      console.log("  rsa-tool --decrypt <inputFile> [outputFile]");
      break;
  }
}

main();
