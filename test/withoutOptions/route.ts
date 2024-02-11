import Duplo from "@duplojs/duplojs";
import duploStatic from "../../scripts/static";
import {parentPort} from "worker_threads";

const duplo = Duplo({port: 1506, host: "0.0.0.0", environment: "DEV"});

duplo.use(duploStatic, {staticFolder: __dirname + "/../public"});

duplo.launch(() => parentPort?.postMessage("ready"));
