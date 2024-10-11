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
exports.signFile = signFile;
exports.verifySignature = verifySignature;
const forge = __importStar(require("node-forge"));
const fs = __importStar(require("fs"));
function signFile(inputFile, signatureFile, privateKeyFile = 'privateKey.pem') {
    const privatePem = fs.readFileSync(privateKeyFile, 'utf8');
    const privateKey = forge.pki.privateKeyFromPem(privatePem);
    const fileContent = fs.readFileSync(inputFile, 'utf8');
    const messageDigest = forge.md.sha256.create();
    messageDigest.update(fileContent, 'utf8');
    const signature = privateKey.sign(messageDigest);
    const encodedSignature = forge.util.encode64(signature);
    fs.writeFileSync(signatureFile, encodedSignature);
    console.log(`File signed and written to ${signatureFile}`);
}
function verifySignature(inputFile, signatureFile, publicKeyFile = 'publicKey.pem') {
    const publicPem = fs.readFileSync(publicKeyFile, 'utf8');
    const publicKey = forge.pki.publicKeyFromPem(publicPem);
    const fileContent = fs.readFileSync(inputFile, 'utf8');
    const encodedSignature = fs.readFileSync(signatureFile, 'utf8');
    const signature = forge.util.decode64(encodedSignature);
    const messageDigest = forge.md.sha256.create();
    messageDigest.update(fileContent, 'utf8');
    const isValid = publicKey.verify(messageDigest.digest().bytes(), signature);
    if (isValid) {
        console.log('Signature is valid');
    }
    else {
        console.log('Signature is not valid');
    }
}
