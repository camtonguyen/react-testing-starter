import { Server, Response } from "miragejs";

export function handlers(server: Server) {
  server.get('/categories', (schema) => {
    return schema.all('category').models;
  });

  server.get('/products', (schema) => {
    return schema.all('product').models;
  });

  server.get('/products/:id', (schema, request) => {
    const { id } = request.params;
    const product = schema.find('product', id);
    if (!product) {
      return new Response(404, {}, { error: 'Product not found' });
    }
    return product.attrs;
  });
}