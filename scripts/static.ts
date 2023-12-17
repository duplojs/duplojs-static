import {AbstractRouteInstance, DuploConfig, DuploInstance, PromiseOrNot, Request, Response} from "@duplojs/duplojs";
import {existsSync, mkdirSync} from "fs";
import {lstat} from "fs/promises";
import {resolve} from "path";
import packageJson from "../package.json";

declare module "@duplojs/duplojs" {
	interface Plugins {
		"@duplojs/static": {version: string},
	}
}

interface DuploStaticOptions {
	staticFolder?: string;
	prefix?: string;
	notfoundHandler?(request: Request, response: Response): PromiseOrNot<void>;
	abstractRoute?: AbstractRouteInstance
}

function duploStatic(
	instance: DuploInstance<DuploConfig>, 
	{
		staticFolder = "./public",
		prefix = "",
		notfoundHandler = (request, response) => response.code(404).info("NOTFOUND").send(`${request.method}:${request.path} not found`),
		abstractRoute
	}: DuploStaticOptions = {}
){
	instance.plugins["@duplojs/static"] = {version: packageJson.version};

	prefix = prefix.startsWith("/") ? prefix : "/" + prefix;
	prefix = prefix.endsWith("/") ? prefix : prefix + "/";
	staticFolder = resolve(staticFolder);

	if(!existsSync(staticFolder))mkdirSync(staticFolder, {recursive: true});

	(abstractRoute || instance)
	.declareRoute("GET", prefix + "*")
	.cut(async({}, response, request) => {
		const path = `${staticFolder}/${request.url.split("?")[0].replace(prefix, "")}`;
		if(
			!/\.\.\/|\/\.\./.test(path) && 
			existsSync(path) && 
			!(await lstat(path)).isDirectory()
		) response.code(200).sendFile(path);
		else await notfoundHandler(request, response);
	})
	.handler(() => {});
}

export default duploStatic;
