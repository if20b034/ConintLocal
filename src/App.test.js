import { render } from '@testing-library/react';
import App from './App';
import {React} from 'react';

test('1 is one', () => {
  render(<App />);
  expect(1).toBe(1);
});
