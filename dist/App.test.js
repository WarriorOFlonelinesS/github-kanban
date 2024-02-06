"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _App = _interopRequireDefault(require("./App"));
test('renders App with Header components', () => {
  (0, _react.render)( /*#__PURE__*/React.createElement(_App.default, null));

  // Проверяем, что компонент Border отрендерен
  // const borderElement = screen.getByTestId('border-component');
  // expect(borderElement).toBeNull();
});