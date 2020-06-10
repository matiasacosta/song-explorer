import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app home page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Song Explorer/i);
  expect(linkElement).toBeInTheDocument();
});
