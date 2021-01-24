const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname) + "/dist/src/index.js",
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		alias: {
			react: path.join(__dirname, 'node_modules', 'react'),
		},
	},
	module: {
		rules: [
			{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
		}),
	],
};
