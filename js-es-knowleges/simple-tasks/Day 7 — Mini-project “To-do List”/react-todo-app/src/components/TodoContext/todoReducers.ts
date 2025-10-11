import {Todo} from "../../types/todo";
import {FetchState} from "../../types/fetch";
import {getNextId} from "./helper";

export const todoReducers = (prevState: Todo[] | undefined, action: any): Todo[] | undefined => {
    if (action?.type) {
        switch (action.type) {
            case 'deleted':
                return prevState && prevState.filter(todo => todo.id !== action.id)


            case 'toggled':
                return prevState && prevState.map(task => {
                    if (task.id === action?.id) {
                        return {
                            ...task,
                            completed: !task.completed,
                        }
                    }

                    return task;
                });

            case 'set':
                return action.payload
                    .map((todo: Todo, index: number) => ({
                        ...todo,
                        id: getNextId([{ id: index, title: '', completed: false }]),
                    }));

            case 'added':
                return [
                    {
                        ...action.payload,
                        id: getNextId(prevState || [{ id: 1, title: '', completed: false }])
                    },
                    ...prevState || [],
                ];

            case 'clearCompleted':
                return prevState && prevState.filter((todo) => !todo.completed);

            default:
                console.error('Unknown action in todos reducer');
                return prevState;
        }
    }

    console.error('Action is not found in todos reducer');
    return prevState;
}

export const fetchTodoReducer = (prevState: FetchState, action: any): FetchState => {
    if (action?.type) {
        switch (action.type) {
            case 'onLoad':
                return 'pending';

            case 'onError':
                return 'error';


            case 'onSuccess':
                return 'completed';

            default:
                console.error('Unknown action in fetch todos state reducer');
                return prevState;
        }
    }

    console.error('Action is not found in fetch todos state reducer');
    return prevState;
}
