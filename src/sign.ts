import * as forge from 'node-forge'
import * as fs from 'fs'

export function signFile(inputFile: string, signatureFile: string, privateKeyFile = 'privateKey.pem') {
  const privatePem: string = fs.readFileSync(privateKeyFile, 'utf8')
  const privateKey: forge.pki.PrivateKey = forge.pki.privateKeyFromPem(privatePem)

  const fileContent: string = fs.readFileSync(inputFile, 'utf8')
  const messageDigest: forge.md.MessageDigest = forge.md.sha256.create()
  messageDigest.update(fileContent, 'utf8')

  const signature: string = privateKey.sign(messageDigest)
  const encodedSignature: string = forge.util.encode64(signature)

  fs.writeFileSync(signatureFile, encodedSignature)

  console.log(`File signed and written to ${signatureFile}`)
}

export function verifySignature(inputFile: string, signatureFile: string, publicKeyFile = 'publicKey.pem') {
  const publicPem: string = fs.readFileSync(publicKeyFile, 'utf8')
  const publicKey: forge.pki.PublicKey = forge.pki.publicKeyFromPem(publicPem)

  const fileContent: string = fs.readFileSync(inputFile, 'utf8')
  const encodedSignature: string = fs.readFileSync(signatureFile, 'utf8')
  const signature: string = forge.util.decode64(encodedSignature)

  const messageDigest: forge.md.MessageDigest = forge.md.sha256.create()
  messageDigest.update(fileContent, 'utf8')

  const isValid: boolean = publicKey.verify(messageDigest.digest().bytes(), signature)

  if (isValid) {
    console.log('Signature is valid')
  } else {
    console.log('Signature is not valid')
  }
}
