const gulp = require( 'gulp' );

const {src, dest, watch, series, parallel} = require( 'gulp' );
const sass          = require('gulp-sass')(require('sass'));
const sourcemaps    = require( 'gulp-sourcemaps' );
const babel         = require( "gulp-babel" );
const eslint        = require( 'gulp-eslint' );
const uglify        = require( 'gulp-uglify' );
const concat        = require( 'gulp-concat' );
const gutil         = require( 'gulp-util' );
const browserify    = require( 'gulp-browserify' );
const babelify      = require( 'babelify' );
const autoprefixer  = require('gulp-autoprefixer');
const rename = require('gulp-rename');

sass.compiler = require( 'node-sass' );

const paths = {
	styles: {
		src: 'sass/**/*.scss',
		dest: '../build/styles/'
	},
	scripts: {
		src: 'js/**/*.js',
		dest: '../build/js/'
	}
};


function js_compile() {
	return gulp.src( 'js/customization.js' )
		.pipe( sourcemaps.init() )
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )
		.pipe( browserify( {
			transform: ['babelify'],
		} ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( paths.scripts.dest ) )
		.on( 'error', gutil.log );
}

function js_compile_min() {
	return gulp.src( 'js/customization.js' )
		.pipe( eslint() )
		.pipe( eslint.format() )
		.pipe( eslint.failAfterError() )
		.pipe( browserify( {
			transform: ['babelify'],
		} ) )
		.pipe( uglify() )
		.pipe(rename({suffix: '.min'}))
		.pipe( gulp.dest( paths.scripts.dest ) )
		.on( 'error', gutil.log );
}


function combile_libs_js() {
	return gulp.src( [
		'js/jquery.fancybox.min.js',
		'node_modules/swiper/swiper-bundle.min.js',
		//'js/jquery.touchSwipe.min.js',
		//'js/js.cookie.js',
		'js/slick.js',
		'js/select2.min.js',
		//'js/jquery.formstyler.min.js',
		'js/rellax.min.js',	
		'js/lottie_svg.min.js',		
		'js/wow.js',
		'js/lozad.min.js',
	] )
		.pipe( concat( 'libs.js' ) )
		.pipe( gulp.dest( paths.scripts.dest ) )
		.on( 'error', gutil.log );
}

function styles() {
	return gulp.src( paths.styles.src )
		.pipe( sourcemaps.init() )
		.pipe( sass( {outputStyle: 'compressed'} ).on( 'error', sass.logError ) )
		.pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true }))
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( paths.styles.dest ) );
}

function styles_prod() {
	return gulp.src( paths.styles.src )
		.pipe( sass( {outputStyle: 'compressed'} ).on( 'error', sass.logError ) )
		.pipe(autoprefixer(['last 2 versions', '> 1%'], { cascade: true }))
		.pipe(rename({suffix: '.min'}))
		.pipe( gulp.dest( paths.styles.dest  ) );
}


function watch2() {
	gulp.watch( paths.styles.src, styles );
	gulp.watch( paths.styles.src, styles_prod );
	gulp.watch( paths.scripts.src, combile_libs_js );
	gulp.watch( paths.scripts.src, js_compile );
	gulp.watch( paths.scripts.src, js_compile_min() );
}

function build() {
	styles();
	styles_prod();
	combile_libs_js();
	js_compile();
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.watch = watch2;
exports.build = gulp.series(styles, styles_prod,  gulp.parallel( combile_libs_js, js_compile, js_compile_min ) );



