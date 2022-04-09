const {  src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css (done){
    // Compilar SASS
    // Paso 1: Identificar las hojas de estilo SASS a compilar
    // Paso 2: Compilar
    // Paso 3: Guardar él .css

    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass())
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') );
    done();
}

function imagenes(done){
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') );
    done();
}

function versionWebp( ){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe( dest('build/img') )
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') );
}

function dev (){
    watch( 'src/scss/**/*.scss', css);
    watch( 'src/img/**/*', imagenes);
}


exports.css = css;
exports.imagenes = imagenes;
exports.dev = dev;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev);

// Series

// Paralel