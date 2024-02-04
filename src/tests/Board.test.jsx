import React from 'react';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Board from '../components/Board';

const mockStore = configureStore([]);

describe('Board Component', () => {
  let store;

  beforeEach(() => {

    store = mockStore({
      issues: {
        allIssues: [],
        isLoading: false, 
      },
    });
  });

  test('renders Board component', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );


    expect(screen.getByText('Issues are loading')).toBeInTheDocument();
  });

  test('dispatches updateBoard on drop', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );


    const actions = store.getActions();
    expect(actions).toEqual

  });


});
