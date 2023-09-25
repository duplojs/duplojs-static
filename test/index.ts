import Duplo from "@duplojs/duplojs";
import duploStatic from "../scripts/static";

const duplo = Duplo({port: 1506, host: "0.0.0.0"});

duplo.use(
	duploStatic, 
	{
		staticFolder: "./test/public", 
		prefix: "public",
		notfoundHandler: (request, response) => response.code(404).send("NOT FOUND")
	}
);

duplo.launch();
