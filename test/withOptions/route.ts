import Duplo from "@duplojs/duplojs";
import duploStatic from "../../scripts/static";
import {parentPort} from "worker_threads";

const duplo = Duplo({port: 1506, host: "0.0.0.0"});

duplo.use(duploStatic, {
	staticFolder: __dirname + "/../public", 
	prefix: "public",
	notfoundHandler: (req, res) => {
		res.code(404).info("notfound").send("notfound");
	},
	abstractRoute: duplo.declareAbstractRoute("testAbstract").handler(() => parentPort?.postMessage("flag abstract")).build()()
});

duplo.launch(() => parentPort?.postMessage("ready"));
