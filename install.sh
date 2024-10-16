#!/bin/bash

# Someone's curious about the install script. Am proud :)

set -e

npm install

mkdir -p src

mv *.ts src/ 2>/dev/null || true

cat >tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
EOL

npm pkg set main="dist/index.js"
npm pkg set bin.rsa-tool="./dist/index.js"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"

npm run build

chmod +x dist/index.js

sudo npm unlink -g rsa-tool 2>/dev/null || true

sudo npm link

echo "RSA Tool has been set up successfully. You can now use 'rsa-tool' command."
