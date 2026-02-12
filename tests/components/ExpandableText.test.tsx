import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';
  
  it('should render full text if less than 255 characters', () => {
    const text = 'This is a short text';
    render(<ExpandableText text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should truncate text if more than 255 characters', () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
  });

  it('should expand text when button is clicked', async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/more/i);
    const user = userEvent.setup();
    await user.click(button);
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

});