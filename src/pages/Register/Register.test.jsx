import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Register from './Register';
import { store } from '../../reducers/store';

describe('Register', () => {
  it('renders the Register form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  // Only check for fields that exist in Register component
  // If confirm password is not present, do not check for it
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows name error message for short name', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'abc' } });
    expect(screen.getByText(/minimum 5 characters/i)).toBeInTheDocument();
  });

  it('shows email error message for invalid email', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText(/email must have following format/i)).toBeInTheDocument();
  });

  it('shows password error message for short password', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(screen.getByText(/password must have at least 6 characters short/i)).toBeInTheDocument();
  });

  // Add more tests for full coverage as needed
});
