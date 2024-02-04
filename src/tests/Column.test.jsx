import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Column from '../components/Column';

describe('Column Component', () => {
  const mockIssue = {
    id: 1,
    title: 'Test Issue',
    data: [],
  };

  const mockColumns = {
    id: 1,
    title: 'Test Column',
    data: [mockIssue],
  };

  const mockProps = {
    columns: mockColumns,
    currentIssue: null,
    onDropColumn: jest.fn(),
    onDragOver: jest.fn(),
    onDragStart: jest.fn(),
    onDragEnd: jest.fn(),
    onDropTask: jest.fn(),
    onDragLeave: jest.fn(),
  };

  test('renders Column component', () => {
    render(<Column {...mockProps} />);

    expect(screen.getByText('Test Column (1)')).toBeInTheDocument();
  });

  test('handles drag events correctly', () => {
    render(<Column {...mockProps} />);

    const card = screen.getByText('Test Column (1)').closest('.ant-card');

    fireEvent.dragOver(card);
    fireEvent.dragLeave(card);
    fireEvent.drop(card);

    expect(mockProps.onDragOver).toHaveBeenCalled();
    expect(mockProps.onDragLeave).toHaveBeenCalled();
    expect(mockProps.onDropColumn).toHaveBeenCalled();

  });

  test('renders empty column', () => {
    const mockEmptyColumns = {
      id: 2,
      title: 'Empty Column',
      data: [],
    };

    render(<Column {...mockProps} columns={mockEmptyColumns} />);

    expect(screen.getByText('No Items')).toBeInTheDocument()
  });
});
