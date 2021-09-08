import { useEffect } from 'react';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventHub = /*#__PURE__*/function () {
  function EventHub() {
    _classCallCheck(this, EventHub);

    this.listeners = {};
  }

  _createClass(EventHub, [{
    key: "addListener",
    value: function addListener(type, listener) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }

      this.listeners[type].push(listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(type, listener) {
      if (!this.listeners[type]) return;
      this.listeners[type] = this.listeners[type].filter(function (x) {
        return x != listener;
      });
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type, payload) {
      if (!this.listeners[type]) return;

      for (var i = 0; i < this.listeners[type].length; i++) {
        this.listeners[type][i]();
      }
    }
  }, {
    key: "useEvent",
    value: function useEvent(type, listener) {
      var _this = this;

      useEffect(function () {
        _this.addListener(type, listener);

        return function () {
          _this.removeListener(type, listener);
        };
      });
    }
  }]);

  return EventHub;
}();

var eventHub = new EventHub();
var useEvent = eventHub.useEvent.bind(eventHub);
var dispatchEvent = eventHub.dispatchEvent.bind(eventHub);

export { eventHub as default, dispatchEvent, useEvent };
//# sourceMappingURL=index.js.map
