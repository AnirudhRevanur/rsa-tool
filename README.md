# RSA Command Line Interface Tool

## Table Of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Key Generation](#key-generation)
  - [Encryption](#encryption)
  - [Decryption](#decryption)
  - [Sign a File](#sign-a-file)
  - [Verify a signature](#verify-a-signature)

## Introduction
This tool is a very basic and simple implementation of the RSA encryption and decryption in Typescript. RSA is an asymmetric cryptographic algorithm used for secure data transmission

## Features
- Generate RSA Key Pair (Public Private Key pair)
- Encrypt files and store that encrypted file
- Decrypt encrypted files
- Sign a file with your private key
- Verify the signature of any signed document

## Installation
**Important:** Before installing this tool with the help of the install script, it is mandatory to install the latest version of NodeJS and NPM to make sure that the tool works

To see how to install NodeJS and NPM(if not already installed), go to [Installing NodeJS](./PREREQUISITES.md)

To install the tool, clone the repository and run the install script. It will ask for admin privileges, so provide the password when prompted

It asks for admin privileges only because it needs to create a symlink, so that the tool can be accessed globally

```bash
git clone https://github.com/AnirudhRevanur/rsa-tool.git ~/rsa-tool
cd ~/rsa-tool
./install.sh
```

The script automatically installs all the dependencies, compiles the Typescript code into Javascript code, and configures the command line interface for easy access

You can verify the installation by running the following command
```bash
rsa-tool
```

## Usage

### Key Generation
To generate a new pair of keys, run the command
```bash
rsa-tool --generate <privateKey> <publicKey>
```

### Encryption
To encrypt a file, use the following command
```bash
rsa-tool --encrypt <inputFile> <outputFile> <publicKey>
```

We can use files over here, because I have performed chunking, as to allow larger messages or files to be encrypted by the RSA algorithm


### Decryption
To decrypt any file, use the following command
```bash
rsa-tool --decrypt <inputFile> <outputFile> <privateKey>
```

### Sign a File
In order to sign a file, run the following command
```bash
rsa-tool --sign <inputFile> <signatureFile>
```

### Verify a signature
In order to verify a signature, run the following command
```bash
rsa-tool --verify <inputFile> <signatureFile>
```
## To Do List
- Implement an algorithm that encrypts the file using AES, then encrypts the AES key with the shared RSA key
- Feel free to add more features or rewrite this in Rust idm :)
