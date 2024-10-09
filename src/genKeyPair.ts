import * as forge from 'node-forge'
import * as fs from 'fs'

export function generateKeyPair(privateKeyFile = 'privateKey.pem', publicKeyFile = 'publicKey.pem') {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048)
  const privatePem = forge.pki.privateKeyToPem(privateKey)
  const publicPem = forge.pki.publicKeyToPem(publicKey)

  fs.writeFileSync(privateKeyFile, privatePem)
  fs.writeFileSync(publicKeyFile, publicPem)

  console.log(`Key Pair Generated`)
}
