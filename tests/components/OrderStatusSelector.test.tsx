import { render, screen } from '@testing-library/react';
import OrderStatusSelector from '../../src/components/OrderStatusSelector';
import userEvent from '@testing-library/user-event';
import { Theme } from '@radix-ui/themes';

describe('OrderStatusSelector', () => {

  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );
    return {
      trigger: screen.getByRole('combobox'),
      user: userEvent.setup(),
      getOptions: () => screen.findAllByRole('option'),
      getOption: (label: string) => screen.findByRole('option', { name: label }),
      onChange,
    };
  }
  
  it('should render New as a default value', () => {

    const { trigger } = renderComponent();
    expect(trigger).toHaveTextContent(/new/i);
  });

    it('should render correct text when order status is changed', async () => {

    const { trigger, user, getOptions } = renderComponent();
    await user.click(trigger);
    const options = await getOptions();
    expect(options).toHaveLength(3);
    const labels = options.map(option => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });

  it.each([
    { value: 'processed', label: 'Processed' },
    { value: 'fulfilled', label: 'Fulfilled' },
  ])('should call onChange when order status is changed', async ({ value, label }) => {
    const { trigger, user, onChange, getOption } = renderComponent();
    await user.click(trigger);

    const option = await getOption(label);
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith(value);
  });
});