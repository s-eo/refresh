import {Todo} from "../../types/todo";
import {getNextId} from "./helper";

export const todoReducer = (prevState: Todo[] | undefined, action: any): Todo[] | undefined => {
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
                    ...prevState || [],
                    {
                        ...action.payload,
                        id: getNextId(prevState || [{ id: 1, title: '', completed: false }])
                    }
                ];

            case 'clearCompleted':
                return prevState && prevState.filter((todo) => !todo.completed);

            default:
                console.error('Unknown action in tasks reducer');
                return prevState;
        }
    }

    console.error('Action is not found in tasks reducer');
    return prevState;
}
