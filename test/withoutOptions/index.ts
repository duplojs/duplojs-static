import {zod} from "@duplojs/duplojs";
import {workerTesting} from "@duplojs/worker-testing";
import {readFileSync} from "fs";

export default workerTesting(
	__dirname + "/route.ts",
	[
		{
			title: "get html",
			url: "http://localhost:1506/test.html",
			method: "GET",
			response: {
				code: 200,
				headers: {
					"content-type": "text/html"
				},
				body: zod.literal(readFileSync(__dirname + "/../public/test.html", "utf-8"))
			}
		},
		{
			title: "get css",
			url: "http://localhost:1506/css/ex.css",
			method: "GET",
			response: {
				code: 200,
				headers: {
					"content-type": "text/css"
				},
				body: zod.literal(readFileSync(__dirname + "/../public/css/ex.css", "utf-8"))
			}
		},
		{
			title: "notfound",
			url: "http://localhost:1506/js/index.js",
			method: "GET",
			response: {
				code: 404,
				info: "NOTFOUND",
				body: zod.literal("GET:/js/index.js not found")
			}
		},
	]
);
