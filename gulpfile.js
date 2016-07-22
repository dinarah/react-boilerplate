var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var gutil = require("gulp-util");
var browserSync = require("browser-sync").create();
var exorcist = require("exorcist");
var path = require("path");
var sass = require("gulp-sass");
var del = require('del');
var fs = require("fs");
var argv = require('yargs').argv;

// Directories
const publicDir = "public";
const srcDir = "src";

// Bundle file
const bundleFileName = "bundle.js";
const bundleFilePath = path.join(publicDir, bundleFileName);
const bundleMapFilePath = path.join(publicDir, bundleFileName + ".map");

// Entry file
const entryFileName = "app.jsx";
const entryFilePath = path.join(srcDir, entryFileName);

// SASS/CSS
const allSassFilesGlob = path.join(__dirname, publicDir, "sass", "**/*.scss");
const cssOutputDir = path.join(publicDir, "css");

function shouldGenerateSourceMaps() {
  return !argv.prod || argv.sourcemaps;
}

function initBrowserSync() {
  return browserSync.init({
    port: 4000,
    server: {
      baseDir: publicDir
    },
    ghostMode: false,
    online: false,
    open: true
  });
}

function initBrowserify() {
  return browserify({
    cache: {},
    packageCache: {},
    entries: entryFilePath,
    debug: shouldGenerateSourceMaps()
  });
}

function compileSass() {
  gutil.log("Compiling", gutil.colors.green("SASS files") + "...");
  var stream = gulp.src(allSassFilesGlob);

  // Decide if we minify CSS files or not
  if (argv.prod) {
    stream = stream.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError));
  }
  else {
    stream = stream.pipe(sass().on("error", sass.logError));
  }

  // Inject CSS
  if (argv.browserSync) {
    stream = stream.pipe(browserSync.stream());
  }

  stream = stream.pipe(gulp.dest(cssOutputDir));
}

function bundleJS(bundler) {
  var stream = bundler.bundle();
  stream = stream.on("error", function(error) {
    gutil.log(gutil.colors.red(error.message));
    this.emit('end');
  });

  if (shouldGenerateSourceMaps()) {
    stream = stream.pipe(exorcist(bundleMapFilePath));
  }

  stream = stream.pipe(source(bundleFileName));

  if (argv.browserSync) {
    stream = stream.pipe(browserSync.stream());
  }

  stream = stream.pipe(gulp.dest(publicDir));
  stream = stream.on("end", function() {
    gutil.log("Bundled", gutil.colors.green(entryFilePath));
  });
}

function build() {
  if (argv.browserSync) {
    initBrowserSync();
  }

  var bundler = initBrowserify();

  // Babel
  bundler.transform("babelify", {presets: ["es2015", "react"]})

  // Minify code if we are in production mode
  if (argv.prod) {
    bundler.transform("uglifyify", {global: true});
  }

  if (argv.watch) {
    bundler = watchify(bundler);
    bundler.on("update", function() {
      bundleJS(bundler);
    });

    gulp.watch(allSassFilesGlob, compileSass);
  }

  bundleJS(bundler);
  compileSass();
}

function clean() {
  del([
    bundleFilePath,
    bundleMapFilePath,
    cssOutputDir
  ]);
}

gulp.task("build", build);
gulp.task("clean", clean);