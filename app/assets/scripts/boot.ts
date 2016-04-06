declare var System: any;

System.config({
    packages: {
        baseURL: '/js/',
        js: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('/js/main').then(null, console.error.bind(console));