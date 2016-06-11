/// <binding AfterBuild='build-debug' Clean='clean' />
/// <binding AfterBuild='build-debug' />

var gulp = require("gulp");
var gutil = require("gulp-util");
var rimraf = require("rimraf");
var mocha = require('gulp-mocha');
var babel = require('babel-core/register');
var path = require('path');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


var CONFIG_PRODUCTION = 0;
var CONFIG_DEVELOPMENT = 1;
var CONFIG_DEVELOPMENT_HOT = 2;

var paths = {
	webroot: "./wwwroot/"
};
paths.jsDist = paths.webroot + 'js/dist/';
paths.jsSrc = paths.webroot + 'js/src/';
paths.bundle = paths.js + 'bundle.js';
paths.minifiedBundle = paths.js + 'bundle.min.js';

gulp.task("clean", function (cb) {
	rimraf(paths.jsDist, cb);
});

gulp.task('build', ['build-debug', 'build-release']);

gulp.task('build-debug', function (callback) {
	webpack(createWebpackConfig(CONFIG_DEVELOPMENT), function (err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString(createStatsConfig()));
		callback();
	});
});


gulp.task('build-release', function (callback) {
	webpack(createWebpackConfig(CONFIG_PRODUCTION), function (err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString(createStatsConfig()));
		callback();
	});
});

// Watch for changes and serve updated bundles on a dev server (localhost:1334).
// The client is set up to load both the compiled build and the build on the dev server
// Whatever is exported to `window` is replaced by the dev server version onLoad
gulp.task('hot-watch', function () {
	var config = createWebpackConfig(CONFIG_DEVELOPMENT_HOT);
	var app = require('express')();
	var compiler = webpack(config)
	app.use(require('webpack-dev-middleware')(compiler, {
		hot: true,
		publicPath: config.output.publicPath,
		stats: createStatsConfig()
	}));
	app.use(require('webpack-hot-middleware')(compiler, {
		path: '/__webpack_hmr'
	}));

	app.listen(1334, 'localhost', function(err) {
		if (err) throw new gutil.PluginError('hot-watch', err);
		gutil.log('[hot-watch]', 'Listening on port 1334');
		gutil.log('[hot-watch]', 'Builing initial bundle...');
	});
});

gulp.task('test', function () {
	return gulp.src(paths.jsSrc + '**/__tests__/*.js')
		.pipe(mocha({
			compilers: {
				js: babel
			},
			reporter: 'spec'
		}));
});
gulp.task('test:watch', function () {
	gulp.watch([paths.jsSrc + '/**'], ['test']);
});

gulp.task('open-in-atom', function () {
	var spawn = require('child_process').spawn;
	console.log(paths.jsSrc);
	spawn('cmd', ['/c', 'atom', './'], { cwd: paths.jsSrc });
	console.log('Don\'t forget to install the language-babel atom package');
});
gulp.task('open-in-explorer', function () {
	var spawn = require('child_process').spawn;
	spawn('explorer', ['.'], { cwd: process.cwd() });
});


// Watch for changes and serve updated bundles on a dev server (localhost:1334).
// The client is set up to load both the compiled build and the build on the dev server
// Whatever is exported to `window` is replaced by the dev server version onLoad
var autoprefixer = require('autoprefixer');
function createWebpackConfig(type) {
	var config = {
		devtool: 'source-map',
		entry: [
			paths.jsSrc + 'index'
		],
		output: {
			path: path.resolve(paths.jsDist),
			filename: 'bundle.js',
			publicPath: '/js/dist/'
		},
		plugins: [
			new webpack.NoErrorsPlugin()
		],
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						presets: ['es2015', 'stage-0', 'react'],
						plugins: ['typecheck']
					}
				},
				{
					test: /.css$/,
					exclude: [/node_modules/],
					loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
				},
				{
					test: /\.css$/,
					include: [/node_modules/],
					loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
				},
				{
					test: /\.json$/,
					loader: 'json'
				},
				{
					test: /\.(png|gif)$/,
					loader: 'file?name=[name]-[sha512:hash:base64:7].[ext]'
				}
			]
		},
		postcss: [
			autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
		]
	};

	if (type === CONFIG_DEVELOPMENT || type === CONFIG_DEVELOPMENT_HOT) {
		config.module.loaders[0].query.plugins.push('import-asserts');
	}

	if (type === CONFIG_DEVELOPMENT) {
		config.plugins.push(
			new webpack.DefinePlugin({ __HOT__: false })
		);

	} else if (type === CONFIG_DEVELOPMENT_HOT) {
		config.devtool = 'cheap-module-eval-source-map';
		// Set up webpack development server path
		config.output.publicPath = 'http://localhost:1334/';

		// Lint everything
		config.module.loaders.push({
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
		});

		// Include webpack development code in the javascript bundle
		config.entry.unshift(
			'webpack-hot-middleware/client?path=http://localhost:1334/__webpack_hmr'
		);

		// Add the hot module replacement javascript transform
		config.plugins = [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({ __HOT__: true }),
		];

		// Add the React hot reloading babel plugin
		config.module.loaders[0].query.plugins.push([
			'react-transform', {
				transforms: [
					{
						transform: 'react-transform-hmr',
						imports: ['react'],
						locals: ['module']
					},
					{
						transform: 'react-transform-catch-errors',
						imports: ['react', 'redbox-react']
					}
				]
			}
		]);

	} else if (type === CONFIG_PRODUCTION) {
		config.output.filename = 'bundle.min.js';

		// https://webpack.github.io/docs/list-of-plugins.html
		config.plugins.push(new webpack.DefinePlugin({ __HOT__: false }));
		config.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }));
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, screw_ie8: true }));
	}

	return config;
}

function createStatsConfig() {
	return {
		colors: true,
		timings: true,
		chunkModules: false
	}
}
