import React from 'react';
import { render, screen } from '@testing-library/react';
import {AppCruncher} from './App';

test('renders learn react link', () => {
  render(<AppCruncher />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
