import * as forge from 'node-forge'
import * as fs from 'fs'

export function signFile(inputFile: string, signatureFile: string, privateKeyFile = 'privateKey.pem') {
  const privatePem = fs.readFileSync(privateKeyFile, 'utf8')
  const privateKey = forge.pki.privateKeyFromPem(privatePem)

  const fileContent = fs.readFileSync(inputFile, 'utf8')
  const messageDigest = forge.md.sha256.create()
  messageDigest.update(fileContent, 'utf8')

  const signature = privateKey.sign(messageDigest)
  const encodedSignature = forge.util.encode64(signature)

  fs.writeFileSync(signatureFile, encodedSignature)

  console.log(`File signed and written to ${signatureFile}`)
}

export function verifySignature(inputFile: string, signatureFile: string, publicKeyFile = 'publicKey.pem') {
  const publicPem = fs.readFileSync(publicKeyFile, 'utf8')
  const publicKey = forge.pki.publicKeyFromPem(publicPem)

  const fileContent = fs.readFileSync(inputFile, 'utf8')
  const encodedSignature = fs.readFileSync(signatureFile, 'utf8')
  const signature = forge.util.decode64(encodedSignature)

  const messageDigest = forge.md.sha256.create()
  messageDigest.update(fileContent, 'utf8')

  const isValid = publicKey.verify(messageDigest.digest().bytes(), signature)

  if (isValid) {
    console.log('Signature is valid')
  } else {
    console.log('Signature is not valid')
  }
}
