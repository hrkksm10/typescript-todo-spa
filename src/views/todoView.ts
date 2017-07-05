import * as Backbone from 'backbone';
import Todo from 'models/todo';
import * as JST from 'templates/hbs';

export default class TodoView extends Backbone.View<Todo> {

    public template: (data: any) => string;

    public model: Todo;
    private input: JQuery;

    constructor(options?: any) {
        super(options);

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }

    public preinitialize() {
        this.tagName = 'li';

        this.events = {
            'click .toggle'   : 'toggleDone',
            'dblclick .view'  : 'edit',
            'click a.destroy' : 'clear',
            'keypress .edit'  : 'updateOnEnter',
            'blur .edit'      : 'close',
        } as any;

        this.template = JST.todoView.main;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    }

    public toggleDone() {
        this.model.toggle();
    }

    public edit() {
        this.$el.addClass('editing');
        this.input.focus();
    }

    public close() {
        const value = this.input.val();
        if (!value) {
            this.clear();
        } else {
            this.model.set({title: value});
            this.$el.removeClass('editing');
        }
    }

    public updateOnEnter(e: any) {
        if (e.keyCode === 13) { this.close(); }
    }

    public clear() {
        this.model.clear();
    }

}
