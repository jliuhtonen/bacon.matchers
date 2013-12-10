// Generated by CoffeeScript 1.6.2
(function() {
  var Bacon, init;

  init = function(Bacon) {
    var addMatchers, addPositiveMatchers;

    addMatchers = function(apply1, apply2) {
      var context;

      context = addPositiveMatchers(apply1, apply2);
      context["not"] = function() {
        var applyNot1, applyNot2;

        applyNot1 = function(f) {
          return apply1(function(a) {
            return !f(a);
          });
        };
        applyNot2 = function(f) {
          return apply2(function(a, b) {
            return !f(a, b);
          });
        };
        return addPositiveMatchers(applyNot1, applyNot2);
      };
      return context;
    };
    addPositiveMatchers = function(apply1, apply2) {
      var context;

      context = {};
      context["lessThan"] = apply2(function(a, b) {
        return a < b;
      });
      context["greaterThan"] = apply2(function(a, b) {
        return a > b;
      });
      context["equalTo"] = apply2(function(a, b) {
        return a === b;
      });
      context["truthy"] = apply1(function(a) {
        return !!a;
      });
      return context;
    };
    Bacon.Observable.prototype.is = function() {
      var apply1, apply2, observable;

      apply1 = function(f) {
        return function() {
          return observable.map(f);
        };
      };
      apply2 = function(f) {
        return function(other) {
          if (other instanceof Bacon.Observable) {
            return observable.combine(other, f);
          } else {
            return observable.map(function(val) {
              return f(val, other);
            });
          }
        };
      };
      observable = this;
      return addMatchers(apply1, apply2);
    };
    return Bacon.Observable.prototype.where = function() {
      var apply1, apply2, observable;

      apply1 = function(f) {
        return function() {
          return observable.filter(f);
        };
      };
      apply2 = function(f) {
        return function(other) {
          var isMatch;

          if (other instanceof Bacon.Observable) {
            isMatch = observable.combine(other, f);
            return observable.filter(isMatch);
          } else {
            return observable.filter(function(val) {
              return f(val, other);
            });
          }
        };
      };
      observable = this;
      return addMatchers(apply1, apply2);
    };
  };

  if (typeof module !== "undefined" && module !== null) {
    Bacon = require("baconjs");
    module.exports = init(Bacon);
  } else {
    if (typeof require === "function") {
      define("bacon.matchers", ["bacon"], init);
    } else {
      init(this.Bacon);
    }
  }

}).call(this);