System.config({
    meta: {
        firebase: {
            format: 'global'
        }
    },
    map: {
        firebase: '/anywhere/js/libs/firebase-web.js',
        angularfire2: '/anywhere/js/libs/angularfire2'
    },
    packages: {
        baseURL: '/anywhere/js/',
        "/anywhere/js/": {
            format: 'register',
            defaultExtension: 'js'
        },
        angularfire2: {
            defaultExtension: 'js',
            main: 'angularfire2.js'
        },
    }
});
System.import('/anywhere/js/main').then(null, console.error.bind(console));
