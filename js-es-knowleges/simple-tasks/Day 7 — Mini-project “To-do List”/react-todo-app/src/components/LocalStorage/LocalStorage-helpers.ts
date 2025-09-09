import {Todo} from "../../types/todo";

const preDefinedTasks: Array<Todo> = [
    {
        id: 1,
        title: 'Create project',
        completed: true,
    },
    {
        id: 2,
        title: 'Create basic components',
        completed: true,
    },
    {
        id: 3,
        title: 'Make fine vue',
        completed: false,
    }
];

export const getTodos = (): Todo[] => {
    try {
        return JSON.parse(window.localStorage.getItem('tasks') || 'null') || preDefinedTasks;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const storeTodos = (todos: Todo[]): void => {
    try {
        window.localStorage.setItem('tasks', JSON.stringify(todos));
    } catch (e) {
        console.error(e);
    }
}