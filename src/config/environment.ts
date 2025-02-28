import { config } from "dotenv";

const environment = (process.env.NODE_ENV || "development") as
	| "development"
	| "release"
	| "production";

config({
	path: `.env.${environment}`,
});

const envConfig = {
	development: {
		mongoURI: process.env.DEV_MONGO_URI,
		port: process.env.DEV_PORT || 3000,
	},
	release: {
		mongoURI: process.env.RELEASE_MONGO_URI,
		port: process.env.RELEASE_PORT || 4000,
	},
	production: {
		mongoURI: process.env.PROD_MONGO_URI,
		port: process.env.PROD_PORT || 5000,
	},
};

export default envConfig[environment];
