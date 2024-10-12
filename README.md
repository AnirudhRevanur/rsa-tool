# RSA Command Line Interface Tool

## Introduction
This tool is a very basic and simple implementation of the RSA encryption and decryption in Typescript. RSA is an asymmetric cryptographic algorithm used for secure data transmission

## Features
- Generate RSA Key Pair (Public Private Key pair)
- Encrypt files and store that encrypted file
- Decrypt encrypted files
- Sign a file with your private key
- Verify the signature of any signed document

## Installation
To install the tool, clone the repository and run the install script. It will ask for admin privileges, so provide the password when prompted

It asks for admin privileges only because it needs to create a symlink, so that the tool can be accessed globally

```bash
git clone https://github.com/AnirudhRevanur/rsa-tool.git ~/rsa-tool
cd ~/rsa-tool
./install.sh
```

The script automatically installs all the dependencies, compiles the Typescript code into Javascript code, and configures the command line interface for easy access

## Usage

### Key Generation
To generate a new pair of keys, run the command
```bash
rsa-tool --generate
```

### Encryption
To encrypt a file, use the following command
```bash
rsa-tool --encrypt <inputFile> [outputFile]
```

We can use files over here, because I have performed chunking, as to allow larger messages or files to be encrypted by the RSA algorithm


### Decryption
To decrypt any file, use the following command
```bash
rsa-tool --decrypt <inputFile> [outputFile]
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

