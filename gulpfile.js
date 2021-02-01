const gulp       = require( 'gulp' ),
      browserify = require( 'browserify' ),
      buffer     = require( 'vinyl-buffer' ),
      concat     = require( 'gulp-concat' ),
      sass       = require( 'gulp-sass' ),
      source     = require( 'vinyl-source-stream' ),
      uglify     = require( 'gulp-uglify' );

// JS build task.
gulp.task( 'js', () => {
  return browserify( { entries: [ 'assets/source/js/scripts.js' ] } )
    .transform( 'babelify', { presets: [ '@babel/preset-env' ] } )
    .bundle()
    .pipe( source( 'scripts.min.js' ) )
    .pipe( buffer() )
    .pipe( uglify() )
    .pipe( gulp.dest( 'assets/build/js' ) );
} );

// CSS build task.
gulp.task( 'css', () => {
  return gulp.src( 'assets/source/scss/styles.scss' )
    .pipe( sass( { outputStyle: 'compressed' } ) )
    .pipe( gulp.dest( 'assets/build/css' ) );
} );

// Default task.
gulp.task( 'default', gulp.series( 'js', 'css' ) );
