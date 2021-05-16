export class Todo {

    static fromJson({ _id, _tarea, _completado, _creado }) {

        const tempTodo = new Todo(_tarea);
        tempTodo._id = _id;
        tempTodo._completado = _completado;
        tempTodo._creado = _creado;
        return tempTodo;
    }

    constructor(tarea) {
        this._tarea = tarea;
        this._id = new Date().getTime();
        this._completado = false;
        this._creado = new Date();

    }
}