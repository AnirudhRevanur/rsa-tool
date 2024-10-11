import * as forge from 'node-forge';
import * as fs from 'fs';

const MAX_RSA_ENCRYPT_SIZE = 214;

export function encryptFile(inputFile: string, outputFile: string, publicKeyFile = 'publicKey.pem') {
  const publicPem = fs.readFileSync(publicKeyFile, 'utf8');
  const publicKey = forge.pki.publicKeyFromPem(publicPem);
  const fileContent = fs.readFileSync(inputFile);
  const contentString = fileContent.toString();
  const encryptedChunks: string[] = [];

  for (let i = 0; i < contentString.length; i += MAX_RSA_ENCRYPT_SIZE) {
    const chunk = contentString.substring(i, i + MAX_RSA_ENCRYPT_SIZE);
    const encryptedChunk = publicKey.encrypt(chunk, 'RSA-OAEP');
    const encodedChunk = forge.util.encode64(encryptedChunk);
    encryptedChunks.push(encodedChunk);
  }

  fs.writeFileSync(outputFile, encryptedChunks.join('\n'));
  console.log(`File encrypted and written to ${outputFile}`);
}

export function decryptFile(inputFile: string, outputFile: string, privateKeyFile = 'privateKey.pem') {
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

