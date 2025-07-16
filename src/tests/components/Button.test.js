import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/common/Button/Button';

describe('Button Component', () => {
  test('renders button with correct name', () => {
    render(<Button name="Submit" />);
    
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies additional className correctly', () => {
    render(<Button name="Test" className="test-class" />);
    
    const buttonElement = screen.getByText('Test');
    expect(buttonElement).toHaveClass('test-class');
    // Should also have the default classes
    expect(buttonElement).toHaveClass('bg-[#28a745]');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button name="Click Me" onClick={handleClick} />);
    
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies disabled state correctly', () => {
    render(<Button name="Disabled Button" disabled />);
    
    const buttonElement = screen.getByText('Disabled Button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled:bg-gray-500');
  });

  test('passes additional props correctly', () => {
    render(<Button name="Test" data-testid="test-button" />);
    
    const buttonElement = screen.getByTestId('test-button');
    expect(buttonElement).toBeInTheDocument();
  });
});
