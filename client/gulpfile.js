var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

function compile(watch) {
    var bundler = watchify(browserify('./app/app.js', { debug: true }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./app/build'));
    }

    if (watch) {
        bundler.on('update', function () {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('build', function () { return compile(); });
gulp.task('watch', function () {
    gulp.src('app')
        .pipe(webserver({
            port:9000,
            livereload: true,
            fallback: 'index.html'
        }));
    gulp.start('sass:watch');

    return watch();
});

gulp.task('sass', function () {
  return  gulp.src('./app/styles/**/*.scss')
    .pipe(sass(
        {
             includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
        }
    ).on('error', sass.logError))
    .pipe(gulp.dest('./app/build'));
});
 
gulp.task('sass:watch', function () {
  gulp.start('sass');
  gulp.watch('./app/styles/**/*.scss',['sass'])
});

gulp.task('default', ['watch']);