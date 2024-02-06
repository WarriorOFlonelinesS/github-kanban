import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";

jest.mock("antd", () => {
  return {
    ...jest.requireActual("antd"),
    Alert: ({ message, type }) => (
      <div className="mocked-alert" data-message={message} data-type={type} />
    ),
  };
});

jest.mock("antd/es/input/Search", () => {
  return ({ placeholder, onChange, onSearch }) => (
    <div className="mocked-search">
      <input
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e)}
        onSearch={(value) => onSearch && onSearch(value)}
      />
    </div>
  );
});

describe("Header", () => {

  test("triggers onChange when input is entered", () => {
    const onChangeMock = jest.fn();

    render(
      <Provider store={store}>
        <Header onChange={onChangeMock} />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Enter repo URL");

    // Simulate typing in the input
    userEvent.type(searchInput, "some");
    expect(onChangeMock)
  });
});
