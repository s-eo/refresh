import React from "react";

import type {Todo} from "../types/todo";
import TodoList from "../components/TodoList";

const tasks: Array<Todo> = [
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

export default function Home() {
    return (
        <div>
            <TodoList
                todos={tasks}
                toggleTodo={() => console.log('toggle')}
                deleteTodo={() => console.log('delete')}
            />
        </div>
    );
}