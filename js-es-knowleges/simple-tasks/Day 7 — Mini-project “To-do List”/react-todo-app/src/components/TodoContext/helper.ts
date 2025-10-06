import type {Todo} from "../../types/todo";

export const getNextId = (tasks: Todo[]): number => {
    let maxId = 0;
    tasks.forEach(task => {
        if (task.id > maxId) {
            maxId = task.id;
        }
    })

    return ++maxId;
}

export const promisifiedTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
