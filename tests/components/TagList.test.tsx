import { findAllByRole, render, screen, waitFor } from '@testing-library/react';
import TagList from '../../src/components/TagList';

describe('TagList', () => {

  it('should render list of tags', async () => {

    render(<TagList />);
    
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
    });

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
    
  });
});