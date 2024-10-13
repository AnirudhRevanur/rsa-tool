#!/usr/bin/env node

import { generateKeyPair } from "./genKeyPair";
import { encryptFile, decryptFile } from "./algos";
import { signFile, verifySignature } from "./sign";

function main() {
  const args: string[] = process.argv.slice(2);
  const command: string = args[0];

  switch (command) {
    case '--generate':
      const privateKeyFile: string = args[1];
      const publicKeyFile: string = args[2];
      if (!privateKeyFile || !publicKeyFile) {
        console.log("Usage: rsa-tool --generate <privateKeyFile> <publicKeyFile>")
        return
      }
      generateKeyPair(privateKeyFile, publicKeyFile);
      break;

    case '--encrypt':
      const inputFileEncrypt: string = args[1];
      const outputFileEncrypt: string = args[2];
      const publicKey: string = args[3]
      if (!inputFileEncrypt || !outputFileEncrypt || !publicKey) {
        console.log("Usage: rsa-tool --encrypt <inputFile> <outputFile> <publicKeyFile>");
        return;
      }
      encryptFile(inputFileEncrypt, outputFileEncrypt, publicKey);
      break;

    case '--decrypt':
      const inputFileDecrypt: string = args[1];
      const outputFileDecrypt: string = args[2];
      const privateKey: string = args[3]
      if (!inputFileDecrypt || !outputFileDecrypt || !privateKey) {
        console.log("Usage: rsa-tool --decrypt <inputFile> <outputFile> <privateKeyFile>");
        return;
      }
      decryptFile(inputFileDecrypt, outputFileDecrypt, privateKey);
      break;

    case '--sign':
      const inputFileSign: string = args[1];
      const signatureFile: string = args[2];

      if (!inputFileSign || !signatureFile) {
        console.log("Usage: rsa-tool --sign <inputFile> <signatureFile>")
      }
      signFile(inputFileSign, signatureFile);
      break;

    case '--verify':
      const inputFileVerification: string = args[1];
      const signatureFileVerification: string = args[2];

      if (!inputFileVerification || !signatureFileVerification) {
        console.log("Usage: rsa-tool --verify <inputFile> <signatureFile>")
      }
      verifySignature(inputFileVerification, signatureFileVerification);
      break;


    default:
      console.log("Usage:");
      console.log("  rsa-tool --generate <privateKeyFile> <publicKeyFile>");
      console.log("  rsa-tool --encrypt <inputFile> <outputFile> <publicKey>");
      console.log("  rsa-tool --decrypt <inputFile> <outputFile> <privateKey>");
      console.log("  rsa-tool --sign <inputFile> <signatureFile>");
      console.log("  rsa-tool --verify <inputFile> <signatureFile>");
      break;
  }
}

main();
