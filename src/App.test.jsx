// App.test.jsx
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};
jest.mock("antd/es/input/Search", () =>
  jest.fn(() => <div className="Search" />)
);

test("renders App with Header components", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
