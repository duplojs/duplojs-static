import {DuploConfig, DuploInstance, PromiseOrNot, Request, Response} from "@duplojs/duplojs";
import {existsSync, mkdirSync} from "fs";
import {lstat} from "fs/promises";
import {resolve} from "path";

interface DuploStaticOptions {
	staticFolder?: string;
	prefix?: string;
	notfoundHandler?(request: Request, response: Response): PromiseOrNot<void>;
}

function duploStatic(
	instance: DuploInstance<DuploConfig>, 
	{
		staticFolder = "./public",
		prefix = "",
		notfoundHandler = (request, response) => response.code(404).info("NOTFOUND").send(`${request.method}:${request.path} not found`),
	}: DuploStaticOptions
){
	prefix = prefix.startsWith("/") ? prefix : "/" + prefix;
	prefix = prefix.endsWith("/") ? prefix : prefix + "/";
	staticFolder = resolve(staticFolder);

	if(!existsSync(staticFolder))mkdirSync(staticFolder, {recursive: true});

	instance
	.declareRoute("GET", prefix + "*")
	.process(
		instance
		.createProcess("static")
		.custom(async({}, request, response) => {
			const path = `${staticFolder}/${request.url.split("?")[0].replace(prefix, "")}`;
			if(
				!/\.\.\/|\/\.\./.test(path) && 
				existsSync(path) && 
				!(await lstat(path)).isDirectory()
			) response.code(200).sendFile(path);
			else await notfoundHandler(request, response);
		})
		.build()
	)
	.handler(() => {});
}

export default duploStatic;
