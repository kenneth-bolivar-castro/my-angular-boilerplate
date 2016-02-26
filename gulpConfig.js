var config = {
    serverPort: {
        dev: 8000,
        dist: 3000
    },

    root: {
        dev: './dev',
        dist: './dist'
    },

    staticIndex: {
        dev: './dev/index.html',
        dist: './dist/index.html'
    },

    js: {
        app: {
            src: ['dev/app/app.main.js', 'dev/app/**/*.js'],
            outputName: 'app.js',
            dest: 'dist/js/'
        },

        vendor: {
            src: './bower.json',
            outputName: 'vendor.js',
            dest: './dist/js/'
        } 
    },

    sass: {
        src: './dev/scss/style.scss',
        outputStyle: 'compressed',
        dest: {
            dev: './dev/css',
            dist: './dist/css'
        }
    },

    htmlTemplate: {
        src: './dev/app/templates/*.html',
        folderRoot: 'app/templates',
        dest: './dev/app/',
    },

    watch: {
        js: 'dev/app/**/*.js',
        sass: './dev/scss/**/*.scss',
        templates: ['dev/index.html', 'dev/app/templates/*.html']
    },

    copy: {
        replace: {
            src: './dev/index.html',
            js: ['js/vendor.js', 'js/app.js'],
            dest: './dist/'
        },

        img: {
            src: 'dev/img/*',
            dest: 'dist/img/'
        },

        font: {
            src: 'dev/font/*',
            dest: 'dist/font/'
        },

        others: {
            src: ['dev/404.html', 'dev/favicon.ico'],
            dest: './dist'
        }
    },

    getUri: function(env){    
        return 'http://localhost:' + this.serverPort[env];
    }
};

module.exports = config;