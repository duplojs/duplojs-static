import {zod} from "@duplojs/duplojs";
import {workerTesting} from "@duplojs/worker-testing";
import {readFileSync} from "fs";

export default workerTesting(
	__dirname + "/route.ts",
	[
		{
			title: "get html",
			url: "http://localhost:1506/public/test.html",
			method: "GET",
			output: ["flag abstract"],
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
			url: "http://localhost:1506/public/css/ex.css",
			method: "GET",
			output: ["flag abstract"],
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
			url: "http://localhost:1506/public/js/index.js",
			method: "GET",
			output: ["flag abstract"],
			response: {
				code: 404,
				info: "notfound",
				body: zod.literal("notfound")
			}
		},
	]
);
