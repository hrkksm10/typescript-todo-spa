import * as Backbone from 'backbone';
import Todos from 'collections/todoList';

export default class Todo extends Backbone.Model {

    public defaults() {
        return {
            title: 'empty todo...',
            order: Todos.nextOrder(),
            done: false,
        };
    }

    public initialize() {
        if (!this.get('title')) {
            this.set({title: this.defaults().title});
        }
    }

    public toggle() {
        this.save({done: !this.get('done')});
    }

    public clear() {
        this.destroy();
    }

}
