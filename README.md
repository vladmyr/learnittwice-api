# Node.js + TypeScript = Node.ts boilerplate
Simple and ready to use boilerplate with configured TypeScript nightly builds. Also contains Visual Studio Code configuration to work out of the box.

## Up and running
```bash
npm install
npm run tsc
node ./dist/index.js
```

## Project structure
```tree
├── .vscode
├── dist
|   ├── *.js
|   ├── *.map
├── node_modules
├── src
|   ├── *.ts
├── package.json
├── tsconfig.json
```
- All source code is placed into `/src` directory
- Compiled code as well as map files are place into `/dist` directory
- `.vscode` directory contains Visual Studio Code run/debug settings for project to work out of the box

## License
MIT