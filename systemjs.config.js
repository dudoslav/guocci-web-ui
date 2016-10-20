(function (global) {
  System.config({
    defaultJSExtensions: true,
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'ng2-translate':              'npm:ng2-translate',
      'materialize-css':            'npm:materialize-css',
      'angular2-materialize':       'npm:angular2-materialize',
      'clipboard':                  'npm:clipboard/dist/clipboard.js',
      'angular2-clipboard':         'npm:angular2-clipboard'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'ng2-translate': {
        main: './ng2-translate.js',
        defaultExtension: 'js'
      },
      'materialize-css': {
        format: 'global',
        main: 'dist/js/materialize.js'
      },
      'angular2-materialize': {
        main: './dist/index.js',
        defaultExtension: 'js'
      },
      'angular2-clipboard' : {
        main: './index.js'
      },
      'clipboard' : {
        defaultExtension: 'js'
      }
    }
  });
})(this);
