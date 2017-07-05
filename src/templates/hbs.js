define([
    'handlebars',
    "./hbs_templates"
], function(Handlebars, templates) {

    Handlebars.registerHelper('if_eq', function(context, options) {
        if (context == options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });

    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for (var i = 0; i < n; i++) {
            accum += block.fn(this, {data: {idx: i, no: i+1}});
        }
        return accum;
    });

    return templates;
});
