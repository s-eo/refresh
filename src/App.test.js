import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const hElement = screen.getByText(/To-Do list/i);

  expect(hElement).toBeInTheDocument();
});

test('renders loader', () => {
  render(<App />);
  const loader = screen.getByRole('status');

  expect(loader).toBeInTheDocument();
})