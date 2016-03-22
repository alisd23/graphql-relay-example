const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const appConfig = require('./app.config');

module.exports = {
	cache: true,
  devtool: 'source-map',
  progress: true,
	context: __dirname,

	entry: [
    `webpack-dev-server/client?http://localhost:${appConfig.WEBPACK_PORT}`, // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		'./client/main.jsx'
	],

	resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },

	output: {
		path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
	},

	plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					{
						loader: 'babel'
					}
				],
				include: path.join(__dirname, 'client')
			},
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap&importLoaders=1', 'sass'],
				include: path.join(__dirname, 'sass')
      },
		]
	}
};
