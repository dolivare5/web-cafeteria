const {  src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css (done){
    // Compilar SASS
    // Paso 1: Identificar las hojas de estilo SASS a compilar
    // Paso 2: Compilar
    // Paso 3: Guardar él .css

    src('src/scss/app.scss')
        .pipe( sass())
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') );
    done();
}

function dev (){
    watch( 'src/scss/**/*.scss', css);
}


exports.css = css;
exports.dev = dev;
exports.default = parallel(css, dev);

// Series

// Paralel