const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const cssnano = require('cssnano')
const del = require('del')
const runSequence = require('run-sequence')
const wait = require('gulp-wait')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

gulp.task('sass', () => {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(wait(1500))
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
})

gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass'])
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload)
  gulp.watch('app/app.js', browserSync.reload)
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('minifyjs', () => {
  return gulp
    .src('app/app.js')
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('minifycss', () => {
  const plugins = [autoprefixer({ browsers: ['last 1 version'] }), cssnano()]
  return gulp
    .src('app/css/app.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('movehtml', () => {
  return gulp.src('app/index.html').pipe(gulp.dest('dist'))
})

gulp.task('clean:dist', () => {
  return del.sync('dist')
})

gulp.task('build', callback => {
  runSequence(
    'clean:dist',
    ['sass', 'minifycss', 'minifyjs', 'movehtml'],
    callback
  )
})

gulp.task('default', callback => {
  runSequence(['sass', 'browserSync', 'watch'], callback)
})
