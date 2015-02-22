var dest = "./dist";
var src = './src';

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 8080,
      livereload: {
        port: 35929
      }
    }
  },
  less: {
    src: src + "/styles/main.less",
    dest: dest + "/styles",
    settings: {
      paths: [
        '.',
        './node_modules/',
        './public/js/bower_components'
      ]
    }
  },
  browserify: {
    settings: {
      transform: ['6to5ify']
    },
    src: src + '/js/index.jsx',
    dest: dest + '/js',
    outputName: 'index.js',
  },
  html: {
    src: 'src/index.html',
    dest: dest
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  },
  ghPages:{
    src: dest + '/**/*',
  },
  uglify:{
    src: dest + '/js/index.js'
  }
};
