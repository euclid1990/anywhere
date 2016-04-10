declare var System: any;

System.config({
    meta: {
        firebase: {
            format: 'global'
        }
    },
    map: {
        firebase: '/js/libs/firebase-web.js',
        angularfire2: '/js/libs/angularfire2'
    },
    packages: {
        baseURL: '/js/',
        js: {
            format: 'register',
            defaultExtension: 'js'
        },
        angularfire2: {
            defaultExtension: 'js',
            main: 'angularfire2.js'
        },
    }
});

System.import('/js/main').then(null, console.error.bind(console));