"use strict";

let gulp = require( "gulp" );
let browserSync = require( "browser-sync" ).create();
//css
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let flexBoxFixer = require("postcss-flexboxfixer"); //use it before autoprefixer
let cssNext = require("postcss-cssnext");
let cssnano = require("cssnano");
let concatCss = require("gulp-concat-css");
let extReplace = require("gulp-ext-replace");


gulp.task( "start-server", () => {
    browserSync.init( {
        server: {
            baseDir: "./"
        }
    } );
} );

gulp.task("compile-postcss", () => {
    return gulp.src("./postcss/*.postcss")
        .pipe(
            postcss(
                [
                    cssNext()
                    // autoprefixer({
                    //     browsers : ["> 5%"]
                    // })
                ]
            )
        )
        .pipe(extReplace(".css"))
        .pipe(gulp.dest("./css"));
});

gulp.task("watch-postcss", () => {
    gulp.watch("./postcss/*.postcss", ["compile-postcss"]);
})

gulp.task("bundle-css", function () {
    var postcssProcessors = [
        // cssNext(),
        autoprefixer({
            browsers : ["iOS >= 7", "Chrome >= 48", "ChromeAndroid >= 48"]
        })
    ];

    return gulp.src(
        [
            "./css/**/*.css",
            "./css/*.css",
            "!./css/caratv.css",
            "!./css/carath.css",
        ]
    )
    .pipe(postcss(postcssProcessors))
    .pipe(concatCss("./bundle.css"))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest("./css"));
});



