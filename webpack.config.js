const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.jsx',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		publicPath: '/',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'modal-component.js',
		library: 'Modal',
		libraryTarget: 'umd',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: 'icons/[name][ext]',
					publicPath: '/dist/',
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/icons', to: 'icons' },
			],
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/modal-component.css',
		}),
	],
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
	},
};