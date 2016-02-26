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
    concat = require('gulp-concat'),
    mainBowerFiles = require('gulp-main-bower-files'),
    open = require('gulp-open'),
    runSequence = require('run-sequence'),
    config = require('./gulpConfig');

// Develop server
gulp.task('connectDev', function() {
  connect.server({
    root: config.root.dev,
    livereload: true,
    port: config.serverPort.dev
  });

  return gulp.src(config.staticIndex.dev).pipe(open({ uri: config.getUri('dev') }));
});

// Distribution server
gulp.task('connectDist', function() {
  connect.server({
    root: config.root.dist,
    port: config.serverPort.dist
  });

  return gulp.src(config.staticIndex.dev).pipe(open({ uri: config.getUri('dist') }));
});

// SASS dev compile
gulp.task('sass-dev', function () {
    var configSass = config.sass;

    return gulp.src(configSass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: configSass.outputStyle}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(configSass.dest.dev))
        .pipe(connect.reload());
});

// SASS dist compile
gulp.task('sass-dist', function(){
    var configSass = config.sass;
    
    return gulp.src(configSass.src)
        .pipe(sass({outputStyle: configSass.outputStyle}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(configSass.dest.dist))
})

// Template Cache compile
gulp.task('templateCache', function(cb){
    var configTemplate = config.htmlTemplate;

    return gulp.src(configTemplate.src)
        .pipe(templateCache({
            standalone: true,
            root: configTemplate.folderRoot
        }))
        .pipe(gulp.dest(configTemplate.dest))
        .pipe(connect.reload());

    cb(err);
});

// Reload
gulp.task('reload', function(){
  return gulp.src(config.staticIndex.dev)
    .pipe(connect.reload());
});

// Watch
gulp.task('watch', function(){
    var configWatch = config.watch;

    gulp.watch(configWatch.sass, ['sass']);
    gulp.watch(configWatch.templates, ['templateCache']);
    gulp.watch(configWatch.js, ['reload']);
});

// Copy faile to dist
gulp.task('copy', function(){
    var configCopy = config.copy;

    gulp.src(configCopy.replace.src)
        .pipe(htmlreplace({
            'js': configCopy.replace.js
        }))
        .pipe(gulp.dest(configCopy.replace.dest));

    gulp.src(configCopy.img.src)
        .pipe(gulp.dest(configCopy.img.dest));

    gulp.src(configCopy.font.src)
        .pipe(gulp.dest(configCopy.font.dest));

    gulp.src(configCopy.others.src)
        .pipe(gulp.dest(configCopy.others.dest))
});

// Scripts app to dist
gulp.task('scripts', ['templateCache'], function(){
    var configScripts = config.js.app;

    return gulp.src(configScripts.src)
        .pipe(concat(configScripts.outputName))
        .pipe(uglify())
        .pipe(iife())
        .pipe(gulp.dest(configScripts.dest));
});

// Vendor to dist
gulp.task('vendors', function(){
    var configVendors = config.js.vendor;
    
    return gulp.src(configVendors.src)
        .pipe(mainBowerFiles())
        .pipe(concat(configVendors.outputName))
        .pipe(uglify())
        .pipe(gulp.dest(configVendors.dest));
});


gulp.task('dev', devTask);
gulp.task('dist', ['connectDist']);
gulp.task('build', buildTask);

function devTask () {
    runSequence('sass-dev', 'templateCache', 'watch', 'connectDev');
}

function buildTask () {
    runSequence('templateCache', 'sass-dist', 'scripts', 'vendors', 'copy');
}