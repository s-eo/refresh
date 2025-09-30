import React from 'react';
import {LOADER_TIME} from "../TodoContext/predefinedTodos";

const time = Math.round(LOADER_TIME / 1000);

export default function Loading() {
    return (
        <article>
            <h2>🌀 Loading...</h2>
            <p>Loading task examples.</p>
            <p>Please wait {time} seconds minimum and watch this loader.</p>
        </article>
    );
}
