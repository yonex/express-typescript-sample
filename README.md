# express-typescript-sample
Express を TypeScript で書きたい！

### NodeJS をインストール
https://nodejs.org/
```sh
brew update
brew install nodejs
node -v # v5.5.0
npm -v # 3.5.3
```

準備オッケー :ok_woman:

### Express を動かす
http://expressjs.com/

```sh
npm install express-generator -g
express --version # 4.13.1
express myapp
cd myapp
npm install
DEBUG=myapp:* npm start
```

http://localhost:3000/ みえた :ok_woman:

### TypeScript にしていく
さっきのプロジェクトを TypeScript 仕様にしていく。
このへん参考に（特に後者）

- TypeScriptでNode.jsのexpressを使ってHello worldしてみる - oinume journal
http://oinume.hatenablog.com/entry/using-express-with-typescript
- czechboy0/Express-4x-Typescript-Sample: Starter-Kit Node.js Express 4.x app written in TypeScript
https://github.com/czechboy0/Express-4x-Typescript-Sample

とりあえず素の express をコミット
```sh
git init
gibo node >> .gitignore
git add .
git commit -m 'initial commit'
```
tsd install は package.json を見ながら指定する
```sh
npm install typescript tsd --save
./node_modules/.bin/tsd install body-parser cookie-parser debug express jade morgan serve-favicon --save
```
ソースをいろいろいじって…
コンパイルして同じように起動してみる
```sh
./node_modules/.bin/tsc --sourcemap --module commonjs ./bin/www.ts
DEBUG=myapp:* npm start
```
http://localhost:3000/ ｷﾀ━━(ﾟ∀ﾟ)━━!!
gitignore を整えてコミット
```sh
cat << FOO >> .gitignore
typings
**/*.js
**/*.js.map
FOO
git add .
git commit -m 'typescriptized'
```
ちなみにこれでも起動した
```sh
DEBUG=myapp:* node ./bin/www.js
```

### より便利にしたい
#### tsconfig
`tsconfig.json` ってやつを作っておくと、コンパイルコマンドが簡潔になってよさそう

- TypeScriptSamples/tsconfig.json at master · Microsoft/TypeScriptSamples
https://github.com/Microsoft/TypeScriptSamples/blob/master/imageboard/tsconfig.json

```sh
./node_modules/.bin/tsc --init --sourcemap --module commonjs --outDir . --target es6 ./bin/www.ts ./typings/tsd.d.ts
```
こうしておくと、コンパイルの設定が `tsconfig.json` に書き出されるので、このプロジェクトをコンパイルしたい人は、オプションなしの `tsc` を発動するだけでよくなる
```sh
./node_modules/.bin/tsc
```
ちなみに、ここで `./typings/tsd.d.ts` もコンパイル対象に追加したことで、 app.ts の先頭に書いていたこれも消せるということらしい
```ts
/// <reference path='./typings/tsd.d.ts' />
```
ということで消した

#### tsd reinstall 自動実行
このプロジェクトをクローンして起動したい人が `npm install` をしたとき同時に type definitions も install してやるには、 `package.json` の postinstall に `tsd reinstall` を追加しておけばよい

### tsd が deprecated なので typings にする
`npm install` するとこう言われる
```
npm WARN deprecated tsd@0.6.5: TSD is deprecated in favor of Typings (https://github.com/typings/typings) - see https://github.com/DefinitelyTyped/tsd/issues/269 for more information
```
https://github.com/DefinitelyTyped/tsd/issues/269 にしたがって tsd を typings に置き換えた
```sh
npm uninstall --save tsd
rm -rf typings/
npm install --save typings
./node_modules/.bin/typings init --upgrade
rm tsd.json
```
`package.json` の `postinstall` と、`tsconfig.json` の `files` も更新が必要
