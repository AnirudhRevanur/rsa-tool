# Install NodeJS and NPM

Click on the respective Distribution you have in order to see the commands for that distro

## Ubuntu/Kali

1. Open the terminal application
2. Add the NodeJS repository by running the following command:
  ```bash
  curl -fsSl https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  ```
3. Install NodeJS and NPM:
  ```bash
  sudo apt-get install -y nodejs
  ```
4. Verify the installation
  ```bash
  node --version
  npm --version
```

## Arch Linux

1. Open the terminal application.
2. Install the latest NodeJS LTS and NPM using pacman:
   ```bash
   sudo pacman -S nodejs-lts-gallium npm
   ```
3. Verify the installation:
   ``` bash
   node --version
   npm --version
   ```

## Void Linux

1. Open the terminal application.
2. Install the latest NodeJS LTS and NPM using xbps-install:
   ```bash
   sudo xbps-install -S nodejs-lts npm
   ```
3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```

## Fedora

1. Open the Terminal application.
2. Install the latest Node.js LTS and NPM using dnf:
   ```bash
   sudo dnf install nodejs-lts npm
   ```
3. Verify the installation:
   ```bash
   node --version
   npm --version
   ```
