import { render, screen } from '@testing-library/react';
import ProductList from '../../src/components/ProductList';
import { Response } from 'miragejs';
import { server } from '../mocks/server';

describe('ProductList', () => {
  it('should render list of products', async () => {
    render(<ProductList />);
    const result = await screen.findAllByRole('listitem');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should render empty list when no products', async () => {
    server.get('/products', () => []);

    render(<ProductList />);
    const result = await screen.findByText(/no products/i);
    expect(result).toBeInTheDocument();
  });

  it('should render error when products are not available', async () => {
    server.get('/products', () => {
      return new Response(500, {}, { error: 'Products not available' });
    });

    render(<ProductList />);
    const result = await screen.findByText(/error/i);
    expect(result).toBeInTheDocument();
  });

it('should render loading indicator when fetching products', async () => {
  server.get('/products', (schema) => {
    return schema.all('product').models;
  }, { timing: 2000 });

  render(<ProductList />);
  
  const loading = await screen.findByText(/loading/i);
  expect(loading).toBeInTheDocument();
});
});