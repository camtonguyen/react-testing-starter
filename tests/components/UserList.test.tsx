import { describe, expect, it } from 'vitest';
import UserList from '../../src/components/UserList';
import { User } from '../../src/entities';
import { render, screen } from '@testing-library/react';


describe('UserList', () => {
  it('should render empty list if no users provided', () => {
    const users: User[] = [];
    render(<UserList users={users} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it('should render list of users', () => {
    const users: User[] = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];

    render(<UserList users={users} />);
    
    users.forEach(user => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });

});