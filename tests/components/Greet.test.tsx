import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet';


describe('Greet', () => {
  it('should render Hello John correctly', () => {
    render(<Greet />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(/login/i);
  });
});
