# es6-babel-gulp-setup
In process to setup basic boilerplate for ES6 based app we needed some tools:

    Transpiler/Compiler : Needed to convert ES6 based code in ES5, As you know that several browsers are still not supporting ES6. There are several Transpilers like Traceur, Babel, TypeScript etc. We will use Babel for our example.
    Bundler tool : we will use it to create code bundle. We will use browserify in our example.
    Task runner and Build tool : we will use gulp as a task runner and build tool.
    Web server :  Needed a small web server, that will be used to server your web page. We will use gulp to create a small web server in our example.

These all are node modules so please make sure that you have node install with npm as its package manager.

Our structure will be like

    project_folder
    -- build
    -- src
        -- js
    -- gulpfile.js

Change dir to your working dir ex.
$ cd project_folder

Add package.js by running npm command and following its prompt options
$ npm init

Install gulp and save it in dev dependency or in dependency
$ npm install --save gulp

Install modules like babelify to convert es6 code in es5 that most browsers suppores. browserify gulp-connect vinyl-source-stream also need to create bundle.
$ npm install --save babelify browserify gulp-connect vinyl-source-stream

Use babel-polyfill to emulate a full ES2015 environment that will allow us to use new built-ins like Promise or WeakMap, static methods like Array.from or Object.assign.

Use following command to install polyfill
$ npm install --save babel-polyfill

Now import it at the top of you script

    import "babel-polyfill";

Now create gulpfile.js at the root of your application and add following code in to it

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


Create a .babelrc config in your project root and and run following command
$ npm install babel-preset-es2015 --save-dev

That add default env like

    {
      "presets": ["env"]
    }

The env preset, enables transforms for ES2015+

We should add specific plugins by following link.

Now add following code in build/index.html

        <!DOCTYLE html>

        <html>

            <head>

                <title>Babel Basic Test</title>

            </head>

            <body>

                <h2>Testing ES6 + Babel + gulp</h2>

                <b>Name :</b> <span id="user_name"></span>

                <b>Age :</b> <span id="user_age"></span>

                <script src="bundle.js"></script>

            </body>

        </html>


Now add following code in src/js/user.js

        export default class User {

            constructor (userName, userAge) {

                this.userName = userName;

                this.userAge = userAge;

            }

           getUserName() {

                return this.userName;

            }

           getUserAge() {

                return this.userAge;

            }

        }

Now add following code in scr/js/index.js

    import "babel-polyfill";

    import User from "./user";

    let UserObject = new User("Abhishek Mishra", "30");

    document.getElementById("user_name").innerHTML = UserObject.getUserName();

    document.getElementById("user_age").innerHTML = UserObject.getUserAge();


Now change the dir and move to the root dir and run gulp command to run server it will run on http://localhost:3000
$ gulp

And gulp watch to run build at the time of code change
$ gulp watch