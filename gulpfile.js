var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    htmlreplace = require('gulp-html-replace'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    iife = require("gulp-iife"),
    sftp = require('gulp-sftp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// Develop server
gulp.task('connectDev', function() {
  connect.server({
    root: 'dev/',
    livereload: true,
    port: 8000,
    debug: true
  });
});

// Distribution server
gulp.task('connectDist', function() {
  connect.server({
    root: 'dist/',
    port: 3000,
  });
});

// SASS dev compile
gulp.task('sass', function () {
  return gulp.src('dev/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dev/css'))
    .pipe(connect.reload());
});

// SASS dist compile
gulp.task('sass-dist', function(){
  return gulp.src('dev/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
})

// Template Cache
gulp.task('templateCache', function(cb){
  return gulp.src('dev/app/templates/*.html')
    .pipe(templateCache({
      standalone: true,
      root: 'app/templates'
    }))
    .pipe(gulp.dest('dev/app/'))
    .pipe(connect.reload());

    cb(err);
});

// Reload
gulp.task('reload', function(){
  return gulp.src('dev/index.html')
    .pipe(connect.reload());
});

// Watch
gulp.task('watch', function(){
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch(['dev/index.html', 'dev/app/templates/*.html'], ['templateCache']);
  gulp.watch('dev/app/**/*.js', ['reload']);
});

// Copy faile to dist
gulp.task('copy', function(){
  gulp.src('dev/index.html')
    .pipe(htmlreplace({
        'js': ['js/vendor.js', 'js/app.js']
    }))
    .pipe(gulp.dest('dist/'));

  gulp.src('dev/img/*')
    .pipe(gulp.dest('dist/img/'));

  gulp.src('dev/font/*')
    .pipe(gulp.dest('dist/font/'));

  gulp.src(['dev/404.html', 'dev/favicon.ico'])
    .pipe(gulp.dest('dist/'))
});

// Scripts app to dist
gulp.task('scripts', ['templateCache'], function(){
  return gulp.src(['dev/app/app.main.js', 'dev/app/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(iife())
    .pipe(gulp.dest('dist/js/'));
});

// Vendor to dist
gulp.task('vendors', function(){
  return gulp.src([
    // Dependencies here
    'dev/vendor/angular-ui-router/release/angular-ui-router.min.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));
});


gulp.task('dev', ['sass', 'templateCache', 'watch', 'connectDev']);
gulp.task('dist', ['connectDist']);
gulp.task('build', ['templateCache', 'sass-dist', 'scripts', 'vendors', 'copy']);