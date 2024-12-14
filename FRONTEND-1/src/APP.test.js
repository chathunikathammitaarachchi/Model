import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the Counter text', () => {
  render(<App />); // Render the component

  // Check if the "Counter" text is displayed
  expect(screen.getByText(/counter/i)).toBeInTheDocument();
});

test('increments the counter when the button is clicked', () => {
  render(<App />); // Render the component

  // Get the button by text
  const button = screen.getByText(/increment/i);
  const countText = screen.getByText(/current count/i);

  // Verify initial count is 0
  expect(countText).toHaveTextContent('Current count: 0');

  // Simulate button click
  fireEvent.click(button);

  // Verify the count has incremented to 1
  expect(countText).toHaveTextContent('Current count: 1');
});
