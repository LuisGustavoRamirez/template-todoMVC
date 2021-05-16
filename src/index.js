import './styles.css';
import { TodoList } from './classes/todo-lis.class';
import { Todo } from './classes/todo.class';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList._todos.forEach(crearTodoHtml);

console.log(todoList._todos);