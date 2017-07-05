import * as Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';
import Todo from 'models/todo';
import Todos from 'collections/todoList';
import TodoView from 'views/todoView';
import * as JST from 'templates/hbs';

class App extends Backbone.View<any> {

    private input: JQuery;
    private footer: JQuery;
    private main: JQuery;
    private allCheckbox: HTMLInputElement;
    private template: (params?: any) => string;
    private statsTemplate: (params: any) => string;

    constructor() {
        super();
        this.template = JST.layout;
        this.statsTemplate = JST.app.status;

        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
        this.listenTo(Todos, 'all', this.update);
    }

    public preinitialize() {
        this.el = 'body';
        this.events = {
            'keypress #new-todo':  'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete',
        } as any;
    }

    public addOne(todo: Todo) {
        const view = new TodoView({ model: todo });
        this.$('#todo-list').append(view.render().el);
    }

    public addAll() {
        Todos.each(this.addOne, this);
    }

    public createOnEnter(e: any) {
        if (e.keyCode !== 13) {return; }
        if (!this.input.val()) { return; }

        Todos.add({title: this.input.val()});
        this.input.val('');
    }

    public clearCompleted() {
        _.each(Todos.done(), (todo) => todo.clear());
        return false;
    }

    public toggleAllComplete() {
        const done = this.allCheckbox.checked;
        Todos.each((todo) => todo.set({ done }));
    }

    public render() {
        this.$el.html(this.template());
        this.input = this.$('#new-todo');
        this.footer = this.$('footer');
        this.main = $('#main');
        this.allCheckbox = this.$('#toggle-all').get(0) as HTMLInputElement;
        return this;
    }

    private update() {
        const done = Todos.done().length;
        const remaining = Todos.remaining().length;

        if (Todos.length) {
            this.main.show();
            this.footer.show();
            this.footer.html(this.statsTemplate({done, remaining}));
        } else {
            this.main.hide();
            this.footer.hide();
        }

        this.allCheckbox.checked = !remaining;
        return this;
    }

}
export default new App();
