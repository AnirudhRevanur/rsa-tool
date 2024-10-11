import * as forge from 'node-forge'
import * as fs from 'fs'

export function encryptFile(inputFile: string, outputFile: string, publicKeyFile = 'publicKey.pem') {
  const publicPem = fs.readFileSync(publicKeyFile, 'utf8')
  const publicKey = forge.pki.publicKeyFromPem(publicPem)

  const fileContent = fs.readFileSync(inputFile, 'utf8')
  const encrypted = publicKey.encrypt(fileContent, 'RSA-OAEP')
  const encoded = forge.util.encode64(encrypted)

  fs.writeFileSync(outputFile, encoded)

  console.log(`File encrypted and written to ${outputFile}`)
}

export function decryptFile(inputFile: string, outputFile: string, privateKeyFile = 'privateKey.pem') {
  const privatePem = fs.readFileSync(privateKeyFile, 'utf8')
  const privateKey = forge.pki.privateKeyFromPem(privatePem)

  const encodedContent = fs.readFileSync(inputFile, 'utf8')
  const decodedContent = forge.util.decode64(encodedContent)
  const decrypted = privateKey.decrypt(decodedContent, 'RSA-OAEP')

  fs.writeFileSync(outputFile, decrypted)

  console.log(`File decrypted and written to ${outputFile}`)
}
