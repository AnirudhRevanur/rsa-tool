import * as forge from 'node-forge'
import * as fs from 'fs'

export function generateKeyPair(privateKeyFile: string, publicKeyFile: string) {
  const { privateKey, publicKey }: { privateKey: forge.pki.PrivateKey, publicKey: forge.pki.PublicKey } = forge.pki.rsa.generateKeyPair(2048)
  const privatePem: string = forge.pki.privateKeyToPem(privateKey)
  const publicPem: string = forge.pki.publicKeyToPem(publicKey)

  fs.writeFileSync(privateKeyFile, privatePem)
  fs.writeFileSync(publicKeyFile, publicPem)

  console.log(`Key Pair Generated`)
}
