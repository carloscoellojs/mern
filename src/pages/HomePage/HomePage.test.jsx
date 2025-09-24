import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the HomePage header and description', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  expect(screen.getByText(/Home Page|Welcome to the Blog Platform/i)).toBeInTheDocument();
  expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
  });

  it('renders the Register and Login buttons/links', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  // There are two Register links: one in the paragraph, one as a button
  const registerLinks = screen.getAllByRole('link', { name: /Register/i });
  expect(registerLinks.length).toBeGreaterThanOrEqual(2);
  expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  it('navigates to /register when Register link is clicked', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const registerLink = screen.getAllByRole('link', { name: /Register/i })[0];
    expect(registerLink.getAttribute('href')).toBe('/register');
  });

  it('navigates to /login when Login link is clicked', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const loginLink = screen.getByRole('link', { name: /Login/i });
    expect(loginLink.getAttribute('href')).toBe('/login');
  });
});
