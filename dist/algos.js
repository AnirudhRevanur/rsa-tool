"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptFile = encryptFile;
exports.decryptFile = decryptFile;
const forge = __importStar(require("node-forge"));
const fs = __importStar(require("fs"));
const MAX_RSA_ENCRYPT_SIZE = 214;
function encryptFile(inputFile, outputFile, publicKeyFile = 'publicKey.pem') {
    const publicPem = fs.readFileSync(publicKeyFile, 'utf8');
    const publicKey = forge.pki.publicKeyFromPem(publicPem);
    const fileContent = fs.readFileSync(inputFile);
    const contentString = fileContent.toString();
    const encryptedChunks = [];
    for (let i = 0; i < contentString.length; i += MAX_RSA_ENCRYPT_SIZE) {
        const chunk = contentString.substring(i, i + MAX_RSA_ENCRYPT_SIZE);
        const encryptedChunk = publicKey.encrypt(chunk, 'RSA-OAEP');
        const encodedChunk = forge.util.encode64(encryptedChunk);
        encryptedChunks.push(encodedChunk);
    }
    fs.writeFileSync(outputFile, encryptedChunks.join('\n'));
    console.log(`File encrypted and written to ${outputFile}`);
}
function decryptFile(inputFile, outputFile, privateKeyFile = 'privateKey.pem') {
    const privatePem = fs.readFileSync(privateKeyFile, 'utf8');
    const privateKey = forge.pki.privateKeyFromPem(privatePem);
    const encodedContent = fs.readFileSync(inputFile, 'utf8');
    const encodedChunks = encodedContent.split('\n');
    let decryptedContent = '';
    for (const encodedChunk of encodedChunks) {
        const decodedChunk = forge.util.decode64(encodedChunk);
        const decryptedChunk = privateKey.decrypt(decodedChunk, 'RSA-OAEP');
        decryptedContent += decryptedChunk;
    }
    fs.writeFileSync(outputFile, decryptedContent);
    console.log(`File decrypted and written to ${outputFile}`);
}
