const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: {
		popup: "./src/",
		content_script: "./src/contentScript/helper.ts"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "popup.html",
			chunks: ['popup']
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "public",
				},
			],
		}),
	],
};
