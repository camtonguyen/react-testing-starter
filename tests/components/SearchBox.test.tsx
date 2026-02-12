
import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox', () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    }
  }
  it('should render search box', () => {
    const {input} = renderComponent();
    expect(input).toBeInTheDocument();
  });


  it('should call onChange when user presses enter', async () => {
    const {input, user, onChange} = renderComponent();
    const searchTerm = 'SearchTerm';
    await user.type(input, searchTerm + '{enter}');
    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it('should not call onChange if search term is empty', async () => {
    const {input, user, onChange} = renderComponent();
    await user.type(input, '{enter}');
    expect(onChange).not.toHaveBeenCalled();
  });
});