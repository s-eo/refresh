import {Todo} from "../../types/todo";

const STORAGE_KEY = 'tasks';

export const getStoredTodos = (): Todo[] | null => {
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (e) {
        console.error('Error occurred while reading saved tasks', e);
        return null;
    }
}

export const storeTodos = (todos: Todo[] | undefined): void => {
    try {
        todos && window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
        console.error(e);
    }
}