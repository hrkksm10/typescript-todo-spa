require.config({
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars',
    },
    // shim: {},
    // キャッシュ防止(開発用)
    urlArgs: `bust=${(new Date()).getTime()}`,
});

require(['app'], (app: any) => {
    app.default.render();
});
