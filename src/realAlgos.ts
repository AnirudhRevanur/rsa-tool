import * as forge from 'node-forge'
import * as fs from 'fs'

export function encryptFileWithAes(inputFile: string, outputFile: string, publicKeyFile = 'publicKey.pem') {
  const publicPem = fs.readFileSync(publicKeyFile, 'utf8')
  // const publicKey = 
  const fileContent = fs.readFileSync(inputFile, 'utf8')

  // const aesKey = forge.util.bytesToHex(forge.random.getBytesSync())
  // const initialVector = forge.util.bytesToHex(forge.random.getBytesSync())

  const cipher = forge.cipher.createCipher('AES-CBC', forge.util.hexToBytes(aesKey))
  cipher.start({ iv: forge.util.hexToBytes(initialVector) })
  cipher.update(forge.util.createBuffer(fileContent, 'utf8'))
  cipher.finish()

  const encryptedData = cipher.output.getBytes()
  const encryptedAESKey = forge.util.bytesToHex(publicKey.encrypt(aesKey))

  const combinedData = JSON.stringify({
    iv: initialVector,
    encryptedKey: encryptedAESKey,
    encryptedData: forge.util.bytesToHex(encryptedData)
  })

  fs.writeFileSync(outputFile, combinedData, 'utf8')
}

export function decryptDataWithAES(inputFile: string, outputFile: string, privateKeyFile = 'privateKey.pem') {
  const fileContent = fs.readFileSync(inputFile, 'utf8')
  const { iv, encryptedKey, encryptedData } = JSON.parse(fileContent)

  const privatePem = fs.readFileSync(privateKeyFile, 'utf8')
  // const privateKey = 

  const aesKey = privateKey.decrypt(forge.util.hexToBytes(encryptedKey))

  const decipher = forge.cipher.createDecipher('AES-CBC', aesKey)
  decipher.start({ iv: forge.util.hexToBytes(iv) })
  decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encryptedData)))
  decipher.finish()

  const decryptedData = decipher.output.toString()
  fs.writeFileSync(outputFile, decryptedData, 'utf8')
}
