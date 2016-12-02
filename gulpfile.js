var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var prefix        = require('gulp-autoprefixer');
var cp            = require('child_process');
var pug           = require('pug');
var gulpPug       = require('gulp-pug');
var sass          = require('gulp-sass');
var babel         = require('gulp-babel');
var print         = require('gulp-print');
var cache         = require('gulp-cached');
var webpack       = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
// import cache from 'gulp-cached';

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
           .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], () => browserSync.reload());

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

    .pipe(print())
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(cache('sassing'))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 9',], { cascade: true }))
    //.pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'))
);

gulp.task('pug', () =>
  gulp.src('_pugfiles/*.pug')
    .pipe(cache('puging'))
    .pipe(print())
    .pipe(gulpPug({
      pug: pug,
      pretty: true
    }))
    .pipe(gulp.dest('_includes'))
);

/*gulp.task('js', () =>
  gulp.src('assets/js/es6/*.js')
    .pipe(cache('jsing'))
    .pipe(print())
    .pipe(babel({presets:['es2015']}))
    .pipe(gulp.dest('assets/js/es5'))
);*/

gulp.task('bundle', () =>
  gulp.src('assets/es6/entry.js')
    .pipe(cache('bundling'))
    .pipe(print())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('assets/js/bundle/'))
);

gulp.task('watch', () => {
  gulp.watch('assets/css/**', ['sass']);
  gulp.watch(
    [
      'assets/css/*.css',
      '*.html',
      // 'assets/js/es5/**',
      'assets/js/bundle/*.js',
      // 'assets/js/json/**',
      '_layouts/*.html',
      '_includes/*.html'
    ],
    ['jekyll-rebuild']);
  gulp.watch('_pugfiles/*.pug', ['pug']);
  // gulp.watch('assets/js/es6/*.js', ['js']);
  gulp.watch('assets/js/es6/toBundle/*.js', ['bundle']);
});

gulp.task('default', ['browser-sync', 'watch']);
