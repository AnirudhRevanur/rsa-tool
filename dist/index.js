#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genKeyPair_1 = require("./genKeyPair");
const algos_1 = require("./algos");
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
                console.log("Usage: rsa-cipher --encrypt <inputFile> [outputFile]");
                return;
            }
            (0, algos_1.encryptFile)(inputFileEncrypt, outputFileEncrypt);
            break;
        case '--decrypt':
            const inputFileDecrypt = args[1];
            const outputFileDecrypt = args[2] || `${inputFileDecrypt}.dec`;
            if (!inputFileDecrypt) {
                console.log("Usage: rsa-cipher --decrypt <inputFile> [outputFile]");
                return;
            }
            (0, algos_1.decryptFile)(inputFileDecrypt, outputFileDecrypt);
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
