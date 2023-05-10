const gulpserie = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens(){
    return gulpserie.src('./source/imagens/*')
        .pipe(imagemin())
        .pipe(gulpserie.dest('./build/imagens'));
}

function comprimeJavaScript(){
    return gulpserie.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulpserie.dest('./build/scripts'))
}

function compilaSass() {
    return gulpserie.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulpserie.dest('./build/styles'));
}

exports.default = function(){
    gulpserie.watch('./source/styles/*.scss', { ignoreInitial: false }, gulpserie.series(compilaSass));
    gulpserie.watch('./source/scripts/*.js', { ignoreInitial: false }, gulpserie.series(comprimeJavaScript));
    gulpserie.watch('./source/imagens/*', { ignoreInitial: false }, gulpserie.series(comprimeImagens));   
};