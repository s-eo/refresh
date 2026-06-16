import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../../App';

test('render saved tasks', async () => {
    const FIRST_TASK = 'delectus aut autem';
    const SECOND_TASK = 'quis ut nam facilis et officia qui';

    window.localStorage.setItem('tasks', JSON.stringify([
        {"userId":1,"id":1,"title":FIRST_TASK,"completed":false},
        {"userId":1,"id":2,"title":SECOND_TASK,"completed":false}
    ]));
    render(<App />);

    expect(screen.getByRole('main')).toHaveTextContent(FIRST_TASK);
    expect(screen.getByRole('main')).toHaveTextContent(SECOND_TASK);
});
