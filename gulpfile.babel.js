var gulp        = require('gulp');
var browserSync = require('browser-sync');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var pug          = require('pug');
var gulpPug      = require('gulp-pug');
var sass         = require('gulp-sass');
var babel        = require('gulp-babel');
var print        = require('gulp-print');
var cache        = require('gulp-cached');
// import cache from 'gulp-cached';


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
             .on('close', done);
});

 // Rebuild Jekyll & do page reload

gulp.task('jekyll-rebuild', ['jekyll-build'], () => browserSync.reload());



/**
 * Wait for jekyll-build, then launch the Server
 */

gulp.task('browser-sync', () =>
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    })
);


gulp.task('sass', () =>
    gulp.src('assets/css/main.scss')
        .pipe(cache('sassing'))
	      .pipe(print())
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 9',], { cascade: true }))
        //.pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'))
);

gulp.task('pug', () =>
    gulp.src('_pugfiles/*.pug')
    .pipe(cache('pugging'))
    .pipe(print())
    .pipe(gulpPug({
      pug: pug,
      pretty: true
    }))
    .pipe(gulp.dest('_includes'))
);

gulp.task('js', () =>
  gulp.src('assets/js/es6/*.js')
        .pipe(cache('jsing'))
        .pipe(print())
        .pipe(babel({presets:['es2015']}))
        .pipe(gulp.dest('assets/js/es5'))
);


gulp.task('watch', () => {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch(['assets/css/**', 'index.html','assets/js/es5/**', '_layouts/*.html', '_includes/*'], ['jekyll-rebuild']);
    //gulp.watch(['assets/json/**'], ['jekyll-rebuild']);
    gulp.watch('_pugfiles/*.pug', ['pug']);
    gulp.watch('assets/js/es6/*.js', ['js'])
});


gulp.task('default', ['browser-sync', 'watch']);
