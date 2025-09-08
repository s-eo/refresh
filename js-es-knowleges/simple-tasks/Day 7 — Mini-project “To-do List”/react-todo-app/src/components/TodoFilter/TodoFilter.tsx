import React, {useState} from 'react';
import Card from "../Card/Card";
import {Filter} from "../../types/filter";
import {Todo} from "../../types/todo";

import styles from './TodoFilter.module.css';

interface TodoFilterProps {
    tasks: Array<Todo>;
    setVisibleTasks: (tasks: Array<Todo>) => void;
}


const filters: Array<Filter> = ['all', 'active', 'completed'];

export default function TodoFilter({ tasks, setVisibleTasks }: TodoFilterProps) {
    const [filter, setFilter]  = useState('all');

    const onNewFilter = (filter: Filter) => (event: React.MouseEvent) => {
        setFilter(filter);

        let visibleTasks = [];
        switch (filter) {
            case 'active':
                visibleTasks = tasks.filter(task => !task.completed)
                break;
            case 'completed':
                visibleTasks = tasks.filter(task => task.completed)
                break;

            case 'all':
            default:
                visibleTasks = tasks.slice();
        }

        setVisibleTasks(visibleTasks);
    }

    return (
        <Card>
            {filters.map((filterType: Filter) => (
                <button
                    key={filterType}
                    onClick={onNewFilter(filterType)}
                    className={[styles.button, filter === filterType ? styles.active : ''].join(" ")}
                >{filterType}</button>
            ))}
        </Card>
    );
}