import { describe, expect, it } from 'vitest';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';
import { render, screen } from '@testing-library/react';


describe('UserAccount', () => {
  it('should render user name', () => {
    const user: User  = {id: 1, name: 'John'}
    render(<UserAccount user={user} />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('should render Edit button if user is admin', () => {
    const user: User  = {id: 1, name: 'John', isAdmin: true}
    render(<UserAccount user={user} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/edit/i);
  });

  it('should not render Edit button if user is not admin', () => {
    const user: User  = {id: 1, name: 'John', isAdmin: false}
    render(<UserAccount user={user} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});