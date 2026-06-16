import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../../App';

/*
* User types task title
  Clicks Add
  Task appears
* */
test('add task', async () => {
    window.localStorage.setItem('tasks', JSON.stringify([
        {"userId":1,"id":1,"title":"delectus aut autem","completed":false},
        {"userId":1,"id":2,"title":"quis ut nam facilis et officia qui","completed":false}
    ]));
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    fireEvent.change(input, {
        target: {value: 'test task'}
    });
    fireEvent.click(screen.getByText('+'));

    expect(screen.getByRole('main')).toHaveTextContent('test task')
});
