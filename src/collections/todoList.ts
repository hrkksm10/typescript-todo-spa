import * as Backbone from 'backbone';
import Todo from 'models/todo';

class TodoList extends Backbone.Collection<Todo> {

    public model = Todo;

    public done() {
        return this.filter((todo) => todo.get('done'));
    }

    public remaining() {
        return this.without.apply(this, this.done());
    }

    public nextOrder() {
        if (!this.length) { return 1; }
        return this.last().get('order') + 1;
    }

    public comparator = (todo: Todo) => todo.get('order');
}
export default new TodoList();
