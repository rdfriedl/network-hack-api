import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import chalk from "chalk";
import mongoose from "mongoose";
import expressStatusMonitor from "express-status-monitor";
import cors from "cors";

import graphqlRoutes from "./graphql";

/** Create Express server */
const app = express();

/** Connect to MongoDB */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
	console.error(err);
	console.log("%s MongoDB connection error. Please make sure MongoDB is running.", chalk.red("✗"));
	process.exit();
});

/** Express configuration */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(expressStatusMonitor());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(graphqlRoutes);

/** Start Express server */
app.listen(app.get("port"), () => {
	console.log("%s App is running at http://localhost:%d in %s mode", chalk.green("✓"), app.get("port"), app.get("env"));
	console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
