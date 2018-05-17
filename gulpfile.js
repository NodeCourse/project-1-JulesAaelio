let gulp = require('gulp');
let sync = require('browser-sync').create();
let nodemon = require('gulp-nodemon');

gulp.task('serve',() => {
    sync.init({
        proxy: 'http://localhost:3500',
    });
    nodemon({
        // the script to run the app
        script: './src/index.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["*.js", "public/*/*.*", "public/*"],
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart',(f) => {
        sync.reload();
    });
    gulp.watch("views/*.pug").on('change', sync.reload);
});