import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Header } from './Header';
import { useAppDispatch } from '../redux/store';
import { getAllIssuesRequest } from '../redux/issues/reducer';

jest.mock('../redux/store');

describe('Header Component', () => {
  it('should set searchValue on input change', () => {
    const wrapper = mount(<Header />);
    const input = wrapper.find('input');

    act(() => {
      input.simulate('change', { target: { value: 'https://github.com/repo' } });
    });

    expect(wrapper.find('Search').prop('value')).toEqual('https://github.com/repo');
  });

  it('should dispatch getAllIssuesRequest on valid search and clear error', () => {
    const dispatchMock = jest.fn();
    useAppDispatch.mockReturnValue(dispatchMock);

    const wrapper = mount(<Header />);
    const input = wrapper.find('input');
    const form = wrapper.find('form');

    act(() => {
      input.simulate('change', { target: { value: 'https://github.com/repo' } });
      form.simulate('submit');
    });

    expect(dispatchMock).toHaveBeenCalledWith(getAllIssuesRequest({ searchValue: 'https://github.com/repo' }));
    expect(wrapper.find('Alert').exists()).toBe(false);
  });

  it('should show error message on empty search', () => {
    const wrapper = mount(<Header />);
    const form = wrapper.find('form');

    act(() => {
      form.simulate('submit');
    });

    expect(wrapper.find('Alert').text()).toEqual('Invalid input!');
  });
});
