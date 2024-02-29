import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; // Assuming you have Redux configured
import Board from '../components/Board';
describe('Test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
});
// Mock Redux store
const mockStore = createStore(() => ({
  issues: {
    allIssues: [],
    isLoading: false,
  },
}));

describe('Board Component', () => {
  it('renders Board component with columns', () => {
    render(
      <Provider store={mockStore}>
        <Board />
      </Provider>
    );

    // Add your assertions based on the rendered output
    // For example, you can check if the columns are rendered correctly
    expect(screen.getByText('ToDo')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('allows dragging and dropping tasks between columns', () => {
    render(
      <Provider store={mockStore}>
        <Board />
      </Provider>
    );

    // Assuming you have tasks in the 'ToDo' column
    const taskInToDoColumn = screen.getByText('Your Task'); // Replace with an actual task text
    const inProgressColumn = screen.getByText('In Progress');

    // Perform drag and drop
    fireEvent.dragStart(taskInToDoColumn);
    fireEvent.dragEnter(inProgressColumn);
    fireEvent.drop(inProgressColumn);

    // Add assertions to check if the task has moved to the 'In Progress' column
    expect(screen.getByText('Your Task')).toBeInTheDocument(); // Adjust based on your actual implementation
  });
});
