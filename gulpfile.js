let gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  csscomb = require('gulp-csscomb'),
  autoprefixer = require('autoprefixer'),
  filter = require('gulp-filter'),
  browserSync = require('browser-sync').create();

const paths = {
  scss: {
    src: 'scss/**/*.scss',
    dest: 'css',
    watch: 'scss/**/*.scss'
  },
  js: {  }
};

// Compile sass into CSS & auto-inject into browsers.
function compile () {
  var sassOptions = {
    outputStyle: 'expanded',
    indentType: 'space',
    indentWidth: 2,
    linefeed: 'lf'
  };

  // Filter mixins and variables not to be compiled to CSS.
  const filterFiles = filter(['**', '!variables.scss']);

  return gulp.src([paths.scss.src])
    .pipe(filterFiles)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(csscomb())
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Watching scss files.
function watch () {
  gulp.watch([paths.scss.watch], compile);
}

const build = gulp.series(compile, gulp.parallel(watch));

exports.compile = compile;
exports.watch = watch;

exports.default = build;
