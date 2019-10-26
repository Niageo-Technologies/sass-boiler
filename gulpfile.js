const { src, dest, watch } = require('gulp');

const concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglifycss'),
	prefix = require('gulp-autoprefixer');

const path = { main: {}, sass: {}, css: {}, normalize: {} };
path.main.folder = 'small-projects';
path.css.folder = path.main.folder + '/css';
path.css.file = path.css.folder + '/style.css';
path.css.files = path.css.folder + '/*.css';
path.sass.folder = path.main.folder + '/sass';
path.sass.file = path.sass.folder + '/style.sass';
path.sass.files = path.sass.folder + '/*.sass';
path.normalize.folder = 'node_modules/normalize.css';
path.normalize.file = path.normalize.folder + '/normalize.css';


function compSass() {
	return src(path.sass.file)
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('last 5 version'))
		.pipe(dest(path.css.folder));
}

function concatNormalize() {
	return src([path.normalize.file, path.css.file])
	.pipe(concat('style.min.css'))
	.pipe(uglify({
		'uglyComments': true
	}))
	.pipe(dest(path.css.folder))
	
}

function watchFiles() {
	watch(path.sass.files, compSass);
	watch(path.css.file, concatNormalize);
}

exports.sass = compSass;
exports.concat = concatNormalize;
exports.watch = watchFiles;

