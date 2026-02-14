import { describe, expect, it } from 'vitest';

describe('main', () => {
  it('should', async () => {
    const response = await fetch('/categories');
    const data = await response.json();
    console.log(data);
  });
});
