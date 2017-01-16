//Include required modules
var gulp = require("gulp"),
    babelify = require('babelify'),
    browserify = require("browserify"),
    connect = require("gulp-connect"),
    source = require("vinyl-source-stream");
//Copy static files from html folder to build folder
gulp.task("copyStaticFiles", function(){
    return gulp.src("./src/html/*.*")
    .pipe(gulp.dest("./build"));
});
//Convert ES6 code in all js files in src/js folder and copy to 
//build folder as bundle.js
gulp.task("build", function(){
    return browserify({
        entries: ["./src/js/index.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build"));
});
gulp.task('watch:build', function() {
    return gulp.watch('./src/**/*', ['build']);
});
//Start a test server with doc root at build folder and 
//listening to 3000 port. Url = http://localhost:3000
gulp.task("startServer", function(){
    connect.server({
        root : "./build",
        port : 3000
    });
});
gulp.task('serve', ['startServer']);
gulp.task('watch', ['build', 'watch:build']);
gulp.task('default', ['serve']);
