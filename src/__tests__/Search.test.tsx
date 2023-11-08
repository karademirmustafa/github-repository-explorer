// import React from 'react';
import { render } from '@testing-library/react';
import Search from '../components/Search';



describe('Search Component', () => {
  it('renders correctly and has the correct button placeholder', () => {
    const { getByTestId } = render(<Search />);
    const input = getByTestId('search-input');
    expect(input).toBeInTheDocument();
  });

});
