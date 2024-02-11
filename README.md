# duplojs-static
[![NPM version](https://img.shields.io/npm/v/@duplojs/static)](https://www.npmjs.com/package/@duplojs/static)

## Instalation
```
npm i @duplojs/static
```

## Utilisation
```ts
import Duplo from "@duplojs/duplojs";
import duploStatic from "@duplojs/static";

const duplo = Duplo({port: 1506, host: "localhost", environment: "DEV"});

duplo.use(
    duploStatic, 
    {
        staticFolder: "./public", 
        prefix: "public",
    }
);

duplo.launch();
```