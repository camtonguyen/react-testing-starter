import { describe, expect, it } from 'vitest';
import ProductImageGallery from '../../src/components/ProductImageGallery';
import { render, screen } from '@testing-library/react';


describe('ProductImageGallery', () => {
  it('should render empty gallery if no images provided', () => {
    const images: string[] = [];
    const {container} = render(<ProductImageGallery imageUrls={images} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render gallery of images', () => {
    const imageUrls: string[] = ['image1', 'image2'];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const imgages = screen.getAllByRole('img');
    expect(imgages).toHaveLength(imageUrls.length);

    imgages.forEach((image, index) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', imageUrls[index]);
    });
  });
});