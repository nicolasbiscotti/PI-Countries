import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders h1 henry countries', () => {
  render(<App />);
  const heanryCountiesH1 = screen.getByText(/henry countries/i);
  expect(heanryCountiesH1).toBeInTheDocument();
});
