const gulp = require('gulp');
const rollup = require('gulp-rollup');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const replace = require('rollup-plugin-replace');
const eslint = require('gulp-eslint');
const entry = "./src/server/**/*.js";
const cleanEntry = "./src/server/config/index.js";

// 开发环境
function builddev(){
  return watch(entry, { ignoreInitial:false }, function(){
    gulp.src(entry)
      .pipe(babel({
        babelrc: false,
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }))
      .pipe(gulp.dest('dist'))
  })
}
// 上线环境
function buildprod(){
  return gulp.src(entry)
    .pipe(babel({
      babelrc: false,
      ignore: [cleanEntry],
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }))
    .pipe(gulp.dest('dist'))
}
// 清洗流
function buildconfig(){
  return gulp.src(entry)
    .pipe(rollup({
      plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify('production')
        })
      ],
      output: {
        format: 'cjs'
      },
      input: cleanEntry
    }))
    .pipe(gulp.dest('./dist'));
}
// 代码校验
function buildhint(){
  return gulp.src([entry])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
}

let build = gulp.series(builddev);
if(process.env.NODE_ENV == 'production'){
  console.log(11)
  build = gulp.series(buildprod, buildconfig);
}
if(process.env.NODE_ENV == 'hint'){
  build = gulp.series(buildhint);
}
gulp.task("default", build);
