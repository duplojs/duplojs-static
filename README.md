# duplojs-static

## Instalation
```
npm i @duplojs/static
```

## Utilisation
```ts
import Duplo from "@duplojs/duplojs";
import duploStatic from "@duplojs/static";

const duplo = Duplo({port: 1506, host: "0.0.0.0"});

duplo.use(
    duploStatic, 
    {
        staticFolder: "./public", 
        prefix: "public",
    }
);

duplo.launch();
```