//Requer os pacotes
var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpConcat = require('gulp-concat');
var gulpImagemin = require('gulp-imagemin');

//Tarefa para estilos
gulp.task('style', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'src/css/**/*',
    ])
        .pipe(gulpSass({
            outputStyle: 'compressed'
        })
            .on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({
            cascade: false
        }))
        .pipe(gulpConcat('main.css'))
        .pipe(gulp.dest('build/css'))
});

//Tarefa para scripts
gulp.task('script', function () {
    return gulp.src([
        // 'node_modules/jquery/dist/jquery.min.js',
        // 'node_modules/@popperjs/core/dist/cjs/popper.js',
        // 'node_modules/bootstrap/dist/js/bootstrap.min.js',
        // 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'src/js/*'
    ])
        .pipe(gulpConcat('main.js'))
        .pipe(gulp.dest('build/js'))
})

//Tarefa que compacta as imagens
gulp.task('image', function () {
    return gulp.src([
        'src/images/**',
    ])
        .pipe(gulpImagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
        }))
        .pipe(gulp.dest('build/images'))
});

//Tarefa que observa as alterações
gulp.task('watch', function () {
    //Observa as alterações nos estilos
    gulp.watch('src/css/**/*', gulp.task('style'));
    //Observa as alterações nos scripts
    gulp.watch('src/js/**/*', gulp.task('script'));
    //Observa as imagens
    gulp.watch('src/images/**/*', gulp.task('image'));
})

//Tarefa padrão, executa o build primeiro e depois observa as alterações
gulp.task('default', gulp.parallel(
    'style',
    'script',
    'image',
    'watch'
))