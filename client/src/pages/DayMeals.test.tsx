import React from 'react';
import { render, screen } from '@testing-library/react';
import DayMeals from './DayMeals';

test('renders the day meals page', () => {
  render(<DayMeals />);

  expect(screen.getByText(/today's meals/i)).toBeInTheDocument();
  expect(screen.getByText(/breakfast/i)).toBeInTheDocument();
});
