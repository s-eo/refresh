import React, {useCallback, useMemo, useState} from 'react';
import Card from "../Card/Card";
import {Filter} from "../../types/filter";
import {filters} from "../../App";

import styles from './TodoFilter.module.css';
import {Todo} from "../../types/todo";

interface TodoFilterProps {
    filter: Filter;
    setFilter: (filter: Filter) => void;
}

export const filterFunction = (tasks: Array<Todo>, filter: Filter): Array<Todo> => {

    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);

        case 'completed':
            return tasks.filter(task => task.completed);

        case 'all':
        default:
            return tasks.slice();
    }
}

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
    const onNewFilter = (filter: Filter) => (event: React.MouseEvent) => {
        setFilter(filter);
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