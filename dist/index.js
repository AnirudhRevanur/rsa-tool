#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genKeyPair_1 = require("./genKeyPair");
const algos_1 = require("./algos");
const sign_1 = require("./sign");
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    switch (command) {
        case '--generate':
            (0, genKeyPair_1.generateKeyPair)();
            break;
        case '--encrypt':
            const inputFileEncrypt = args[1];
            const outputFileEncrypt = args[2] || `${inputFileEncrypt}.enc`;
            if (!inputFileEncrypt) {
                console.log("Usage: rsa-tool --encrypt <inputFile> [outputFile]");
                return;
            }
            (0, algos_1.encryptFile)(inputFileEncrypt, outputFileEncrypt);
            break;
        case '--decrypt':
            const inputFileDecrypt = args[1];
            const outputFileDecrypt = args[2] || `${inputFileDecrypt}.dec`;
            if (!inputFileDecrypt) {
                console.log("Usage: rsa-tool --decrypt <inputFile> [outputFile]");
                return;
            }
            (0, algos_1.decryptFile)(inputFileDecrypt, outputFileDecrypt);
            break;
        case '--sign':
            const inputFileSign = args[1];
            const signatureFile = args[2];
            if (!inputFileSign || !signatureFile) {
                console.log("Usage: rsa-tool --sign <inputFile> <signatureFile>");
            }
            (0, sign_1.signFile)(inputFileSign, signatureFile);
            break;
        case '--verify':
            const inputFileVerification = args[1];
            const signatureFileVerification = args[2];
            if (!inputFileVerification || !signatureFileVerification) {
                console.log("Usage: rsa-tool --verify <inputFile> <signatureFile>");
            }
            (0, sign_1.verifySignature)(inputFileVerification, signatureFileVerification);
            break;
        default:
            console.log("Usage:");
            console.log("  rsa-tool --generate");
            console.log("  rsa-tool --encrypt <inputFile> [outputFile]");
            console.log("  rsa-tool --decrypt <inputFile> [outputFile]");
            console.log("  rsa-tool --sign <inputFile> <signatureFile>");
            console.log("  rsa-tool --verifySign <inputFile> <signatureFile>");
            break;
    }
}
main();
