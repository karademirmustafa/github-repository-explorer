import { render, fireEvent } from '@testing-library/react';
import Modals from '../components/Modal'; // Modal bileşeninizi projenizdeki gerçek yoluyla değiştirin

describe('Modals Component', () => {
  it('should open and close the modal', () => {
    const { getByText, queryByText } = render(<Modals />);

    // Modal kapalı olmalı
    expect(queryByText('Repository Details')).toBeNull();

    // Modal'ı açan düğmeyi bulun ve tıklayın
    const openButton = getByText('Open Modal Button Text'); // Modal'ı açan düğme metnini ekleyin
    fireEvent.click(openButton);

    // Modal açılmalı
    expect(getByText('Repository Details')).toBeInTheDocument();

    // Kapatma düğmesini bulun ve tıklayın
    const closeButton = getByText('×');
    fireEvent.click(closeButton);

    // Modal kapatılmalı
    expect(queryByText('Repository Details')).toBeNull();
  });

  it('should display modal content correctly', () => {
    const { getByText } = render(<Modals />);


    // Modal içeriğini kontrol edin
    expect(getByText('Repository:')).toBeInTheDocument();
    expect(getByText('Owner:')).toBeInTheDocument();
    expect(getByText('Star:')).toBeInTheDocument();
    expect(getByText('Watchers:')).toBeInTheDocument();
    expect(getByText('Primary Language:')).toBeInTheDocument();
    expect(getByText('Forks:')).toBeInTheDocument();
  });
});
