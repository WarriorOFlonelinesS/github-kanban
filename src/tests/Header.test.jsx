import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../components/Header';
import { getAllIssuesRequest } from '../redux/issues/reducer';

const mockStore = configureStore([]);

describe('Header Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      issues: {

      },
    });
  });

  test('renders Header component', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );


    expect(screen.getByText('Enter repo URL')).toBeInTheDocument();
  });

  test('dispatches getAllIssuesRequest on search', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );


    userEvent.type(screen.getByPlaceholderText('Enter repo URL'), 'https://github.com/example/repo');

    fireEvent.click(screen.getByText('Load issues'));

    const actions = store.getActions();
    expect(actions).toEqual([getAllIssuesRequest({ searchValue: 'https://github.com/example/repo' })]);

  });

  test('shows error message on invalid input', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    fireEvent.click(screen.getByText('Load issues'));

    await waitFor(() => {
      expect(screen.getByText('Invalid input!')).toBeInTheDocument();
    });
  });
});
