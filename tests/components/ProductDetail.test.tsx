import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";

import { Response } from "miragejs";
import { server } from "../mocks/server";

describe('ProductDetail', () => {
  const renderComponent = (id: number) => {
    render(<ProductDetail productId={id} />);
  };

  it('should render product detail', async () => {
    const product = server.create('product') as unknown as { id: string; name: string; price: number };
    renderComponent(parseInt(product.id));
    expect(await screen.findByText(new RegExp(product.name))).toBeInTheDocument();
    expect(await screen.findByText(new RegExp(product.price.toString()))).toBeInTheDocument();
  });


  it('should render error when product not found', async () => {
    server.get('/products/:id', () => {
      return new Response(404, {}, { error: 'Product not found' });
    });

    renderComponent(100);
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it('should render error for invalid productId', async () => {
    renderComponent(0);
    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });
});
