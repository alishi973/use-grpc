"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useGRPC;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useGRPC() {
  const [state, setState] = (0, _react.useState)();
  return {
    state
  };
}