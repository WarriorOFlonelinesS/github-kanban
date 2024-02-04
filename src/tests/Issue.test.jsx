import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Issue from './Issue';

describe('Issue Component', () => {
  const mockIssue = {
    id: 1,
    title: 'Test Issue',
    number: 123,
    state: 'open',
    created_at: '2023-01-01T12:00:00Z',
    user: { type: 'User', comments: 3 },
    comments: 3,
  };

  const mockProps = {
    issue: mockIssue,
    columnId: 1,
    isDragged: false,
    onDrop: jest.fn(),
    onDragEnd: jest.fn(),
    onDragStart: jest.fn(),
    onDragOver: jest.fn(),
    onDragLeave: jest.fn(),
  };

  test('renders Issue component', () => {
    render(<Issue {...mockProps} />);

    expect(screen.getByText('Test Issue')).toBeInTheDocument();
    expect(screen.getByText('#123 opened 1 day ago')).toBeInTheDocument();
    expect(screen.getByText('User | comments 3')).toBeInTheDocument();
  });

  test('handles drag events correctly', () => {
    render(<Issue {...mockProps} />);

    const issueDiv = screen.getByText('Test Issue').closest('div');

    fireEvent.dragStart(issueDiv);
    fireEvent.dragEnd(issueDiv);

    expect(mockProps.onDragStart).toHaveBeenCalled();
    expect(mockProps.onDragEnd).toHaveBeenCalled();
  });

});
