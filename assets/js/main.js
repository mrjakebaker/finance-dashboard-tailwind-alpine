(() => {
  var __defineProperty = Object.defineProperty;
  var __hasOwnProperty = Object.prototype.hasOwnProperty;
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __markAsModule = (target) => {
    return __defineProperty(target, "__esModule", {value: true});
  };
  var __exportStar = (target, module) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key in module)
        if (!__hasOwnProperty.call(target, key) && key !== "default")
          __defineProperty(target, key, {get: () => module[key], enumerable: true});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defineProperty({}, "default", {value: module, enumerable: true}), module);
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (result) => {
        return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
      };
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/alpinejs/dist/alpine.js
  var require_alpine = __commonJS((exports, module) => {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.Alpine = factory());
    })(exports, function() {
      "use strict";
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function domReady() {
        return new Promise((resolve) => {
          if (document.readyState == "loading") {
            document.addEventListener("DOMContentLoaded", resolve);
          } else {
            resolve();
          }
        });
      }
      function arrayUnique(array) {
        return Array.from(new Set(array));
      }
      function isTesting() {
        return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
      }
      function warnIfMalformedTemplate(el, directive) {
        if (el.tagName.toLowerCase() !== "template") {
          console.warn(`Alpine: [${directive}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${directive}`);
        } else if (el.content.childElementCount !== 1) {
          console.warn(`Alpine: <template> tag with [${directive}] encountered with multiple element roots. Make sure <template> only has a single child element.`);
        }
      }
      function kebabCase(subject) {
        return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
      }
      function camelCase(subject) {
        return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
      }
      function walk(el, callback) {
        if (callback(el) === false)
          return;
        let node = el.firstElementChild;
        while (node) {
          walk(node, callback);
          node = node.nextElementSibling;
        }
      }
      function debounce(func, wait) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function later2() {
            timeout = null;
            func.apply(context, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
      function saferEval(expression, dataContext, additionalHelperVariables = {}) {
        if (typeof expression === "function") {
          return expression.call(dataContext);
        }
        return new Function(["$data", ...Object.keys(additionalHelperVariables)], `var __alpine_result; with($data) { __alpine_result = ${expression} }; return __alpine_result`)(dataContext, ...Object.values(additionalHelperVariables));
      }
      function saferEvalNoReturn(expression, dataContext, additionalHelperVariables = {}) {
        if (typeof expression === "function") {
          return Promise.resolve(expression.call(dataContext, additionalHelperVariables["$event"]));
        }
        let AsyncFunction = Function;
        AsyncFunction = Object.getPrototypeOf(function() {
          return __async(this, null, function* () {
          });
        }).constructor;
        if (Object.keys(dataContext).includes(expression)) {
          let methodReference = new Function(["dataContext", ...Object.keys(additionalHelperVariables)], `with(dataContext) { return ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables));
          if (typeof methodReference === "function") {
            return Promise.resolve(methodReference.call(dataContext, additionalHelperVariables["$event"]));
          } else {
            return Promise.resolve();
          }
        }
        return Promise.resolve(new AsyncFunction(["dataContext", ...Object.keys(additionalHelperVariables)], `with(dataContext) { ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables)));
      }
      const xAttrRE = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;
      function isXAttr(attr) {
        const name = replaceAtAndColonWithStandardSyntax(attr.name);
        return xAttrRE.test(name);
      }
      function getXAttrs(el, component, type) {
        let directives = Array.from(el.attributes).filter(isXAttr).map(parseHtmlAttribute);
        let spreadDirective = directives.filter((directive) => directive.type === "spread")[0];
        if (spreadDirective) {
          let spreadObject = saferEval(spreadDirective.expression, component.$data);
          directives = directives.concat(Object.entries(spreadObject).map(([name, value]) => parseHtmlAttribute({
            name,
            value
          })));
        }
        if (type)
          return directives.filter((i) => i.type === type);
        return sortDirectives(directives);
      }
      function sortDirectives(directives) {
        let directiveOrder = ["bind", "model", "show", "catch-all"];
        return directives.sort((a, b) => {
          let typeA = directiveOrder.indexOf(a.type) === -1 ? "catch-all" : a.type;
          let typeB = directiveOrder.indexOf(b.type) === -1 ? "catch-all" : b.type;
          return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
        });
      }
      function parseHtmlAttribute({
        name,
        value
      }) {
        const normalizedName = replaceAtAndColonWithStandardSyntax(name);
        const typeMatch = normalizedName.match(xAttrRE);
        const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
        const modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
        return {
          type: typeMatch ? typeMatch[1] : null,
          value: valueMatch ? valueMatch[1] : null,
          modifiers: modifiers.map((i) => i.replace(".", "")),
          expression: value
        };
      }
      function isBooleanAttr(attrName) {
        const booleanAttributes = ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"];
        return booleanAttributes.includes(attrName);
      }
      function replaceAtAndColonWithStandardSyntax(name) {
        if (name.startsWith("@")) {
          return name.replace("@", "x-on:");
        } else if (name.startsWith(":")) {
          return name.replace(":", "x-bind:");
        }
        return name;
      }
      function convertClassStringToArray(classList, filterFn = Boolean) {
        return classList.split(" ").filter(filterFn);
      }
      const TRANSITION_TYPE_IN = "in";
      const TRANSITION_TYPE_OUT = "out";
      function transitionIn(el, show, component, forceSkip = false) {
        if (forceSkip)
          return show();
        if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
          return;
        }
        const attrs = getXAttrs(el, component, "transition");
        const showAttr = getXAttrs(el, component, "show")[0];
        if (showAttr && showAttr.modifiers.includes("transition")) {
          let modifiers = showAttr.modifiers;
          if (modifiers.includes("out") && !modifiers.includes("in"))
            return show();
          const settingBothSidesOfTransition = modifiers.includes("in") && modifiers.includes("out");
          modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index < modifiers.indexOf("out")) : modifiers;
          transitionHelperIn(el, modifiers, show);
        } else if (attrs.some((attr) => ["enter", "enter-start", "enter-end"].includes(attr.value))) {
          transitionClassesIn(el, component, attrs, show);
        } else {
          show();
        }
      }
      function transitionOut(el, hide, component, forceSkip = false) {
        if (forceSkip)
          return hide();
        if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
          return;
        }
        const attrs = getXAttrs(el, component, "transition");
        const showAttr = getXAttrs(el, component, "show")[0];
        if (showAttr && showAttr.modifiers.includes("transition")) {
          let modifiers = showAttr.modifiers;
          if (modifiers.includes("in") && !modifiers.includes("out"))
            return hide();
          const settingBothSidesOfTransition = modifiers.includes("in") && modifiers.includes("out");
          modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index > modifiers.indexOf("out")) : modifiers;
          transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hide);
        } else if (attrs.some((attr) => ["leave", "leave-start", "leave-end"].includes(attr.value))) {
          transitionClassesOut(el, component, attrs, hide);
        } else {
          hide();
        }
      }
      function transitionHelperIn(el, modifiers, showCallback) {
        const styleValues = {
          duration: modifierValue(modifiers, "duration", 150),
          origin: modifierValue(modifiers, "origin", "center"),
          first: {
            opacity: 0,
            scale: modifierValue(modifiers, "scale", 95)
          },
          second: {
            opacity: 1,
            scale: 100
          }
        };
        transitionHelper(el, modifiers, showCallback, () => {
        }, styleValues, TRANSITION_TYPE_IN);
      }
      function transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hideCallback) {
        const duration = settingBothSidesOfTransition ? modifierValue(modifiers, "duration", 150) : modifierValue(modifiers, "duration", 150) / 2;
        const styleValues = {
          duration,
          origin: modifierValue(modifiers, "origin", "center"),
          first: {
            opacity: 1,
            scale: 100
          },
          second: {
            opacity: 0,
            scale: modifierValue(modifiers, "scale", 95)
          }
        };
        transitionHelper(el, modifiers, () => {
        }, hideCallback, styleValues, TRANSITION_TYPE_OUT);
      }
      function modifierValue(modifiers, key, fallback) {
        if (modifiers.indexOf(key) === -1)
          return fallback;
        const rawValue = modifiers[modifiers.indexOf(key) + 1];
        if (!rawValue)
          return fallback;
        if (key === "scale") {
          if (!isNumeric(rawValue))
            return fallback;
        }
        if (key === "duration") {
          let match = rawValue.match(/([0-9]+)ms/);
          if (match)
            return match[1];
        }
        if (key === "origin") {
          if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
            return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
          }
        }
        return rawValue;
      }
      function transitionHelper(el, modifiers, hook1, hook2, styleValues, type) {
        if (el.__x_transition) {
          cancelAnimationFrame(el.__x_transition.nextFrame);
          el.__x_transition.callback && el.__x_transition.callback();
        }
        const opacityCache = el.style.opacity;
        const transformCache = el.style.transform;
        const transformOriginCache = el.style.transformOrigin;
        const noModifiers = !modifiers.includes("opacity") && !modifiers.includes("scale");
        const transitionOpacity = noModifiers || modifiers.includes("opacity");
        const transitionScale = noModifiers || modifiers.includes("scale");
        const stages = {
          start() {
            if (transitionOpacity)
              el.style.opacity = styleValues.first.opacity;
            if (transitionScale)
              el.style.transform = `scale(${styleValues.first.scale / 100})`;
          },
          during() {
            if (transitionScale)
              el.style.transformOrigin = styleValues.origin;
            el.style.transitionProperty = [transitionOpacity ? `opacity` : ``, transitionScale ? `transform` : ``].join(" ").trim();
            el.style.transitionDuration = `${styleValues.duration / 1e3}s`;
            el.style.transitionTimingFunction = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
          },
          show() {
            hook1();
          },
          end() {
            if (transitionOpacity)
              el.style.opacity = styleValues.second.opacity;
            if (transitionScale)
              el.style.transform = `scale(${styleValues.second.scale / 100})`;
          },
          hide() {
            hook2();
          },
          cleanup() {
            if (transitionOpacity)
              el.style.opacity = opacityCache;
            if (transitionScale)
              el.style.transform = transformCache;
            if (transitionScale)
              el.style.transformOrigin = transformOriginCache;
            el.style.transitionProperty = null;
            el.style.transitionDuration = null;
            el.style.transitionTimingFunction = null;
          }
        };
        transition(el, stages, type);
      }
      function transitionClassesIn(el, component, directives, showCallback) {
        let ensureStringExpression = (expression) => {
          return typeof expression === "function" ? component.evaluateReturnExpression(el, expression) : expression;
        };
        const enter = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter") || {
          expression: ""
        }).expression));
        const enterStart = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter-start") || {
          expression: ""
        }).expression));
        const enterEnd = convertClassStringToArray(ensureStringExpression((directives.find((i) => i.value === "enter-end") || {
          expression: ""
        }).expression));
        transitionClasses(el, enter, enterStart, enterEnd, showCallback, () => {
        }, TRANSITION_TYPE_IN);
      }
      function transitionClassesOut(el, component, directives, hideCallback) {
        const leave = convertClassStringToArray((directives.find((i) => i.value === "leave") || {
          expression: ""
        }).expression);
        const leaveStart = convertClassStringToArray((directives.find((i) => i.value === "leave-start") || {
          expression: ""
        }).expression);
        const leaveEnd = convertClassStringToArray((directives.find((i) => i.value === "leave-end") || {
          expression: ""
        }).expression);
        transitionClasses(el, leave, leaveStart, leaveEnd, () => {
        }, hideCallback, TRANSITION_TYPE_OUT);
      }
      function transitionClasses(el, classesDuring, classesStart, classesEnd, hook1, hook2, type) {
        if (el.__x_transition) {
          cancelAnimationFrame(el.__x_transition.nextFrame);
          el.__x_transition.callback && el.__x_transition.callback();
        }
        const originalClasses = el.__x_original_classes || [];
        const stages = {
          start() {
            el.classList.add(...classesStart);
          },
          during() {
            el.classList.add(...classesDuring);
          },
          show() {
            hook1();
          },
          end() {
            el.classList.remove(...classesStart.filter((i) => !originalClasses.includes(i)));
            el.classList.add(...classesEnd);
          },
          hide() {
            hook2();
          },
          cleanup() {
            el.classList.remove(...classesDuring.filter((i) => !originalClasses.includes(i)));
            el.classList.remove(...classesEnd.filter((i) => !originalClasses.includes(i)));
          }
        };
        transition(el, stages, type);
      }
      function transition(el, stages, type) {
        el.__x_transition = {
          type,
          callback: once(() => {
            stages.hide();
            if (el.isConnected) {
              stages.cleanup();
            }
            delete el.__x_transition;
          }),
          nextFrame: null
        };
        stages.start();
        stages.during();
        el.__x_transition.nextFrame = requestAnimationFrame(() => {
          let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
          if (duration === 0) {
            duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
          }
          stages.show();
          el.__x_transition.nextFrame = requestAnimationFrame(() => {
            stages.end();
            setTimeout(el.__x_transition.callback, duration);
          });
        });
      }
      function isNumeric(subject) {
        return !isNaN(subject);
      }
      function once(callback) {
        let called = false;
        return function() {
          if (!called) {
            called = true;
            callback.apply(this, arguments);
          }
        };
      }
      function handleForDirective(component, templateEl, expression, initialUpdate, extraVars) {
        warnIfMalformedTemplate(templateEl, "x-for");
        let iteratorNames = typeof expression === "function" ? parseForExpression(component.evaluateReturnExpression(templateEl, expression)) : parseForExpression(expression);
        let items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, templateEl, iteratorNames, extraVars);
        let currentEl = templateEl;
        items.forEach((item, index) => {
          let iterationScopeVariables = getIterationScopeVariables(iteratorNames, item, index, items, extraVars());
          let currentKey = generateKeyForIteration(component, templateEl, index, iterationScopeVariables);
          let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(currentEl.nextElementSibling, currentKey);
          if (!nextEl) {
            nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl);
            transitionIn(nextEl, () => {
            }, component, initialUpdate);
            nextEl.__x_for = iterationScopeVariables;
            component.initializeElements(nextEl, () => nextEl.__x_for);
          } else {
            delete nextEl.__x_for_key;
            nextEl.__x_for = iterationScopeVariables;
            component.updateElements(nextEl, () => nextEl.__x_for);
          }
          currentEl = nextEl;
          currentEl.__x_for_key = currentKey;
        });
        removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
      }
      function parseForExpression(expression) {
        let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
        let stripParensRE = /^\(|\)$/g;
        let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
        let inMatch = expression.match(forAliasRE);
        if (!inMatch)
          return;
        let res = {};
        res.items = inMatch[2].trim();
        let item = inMatch[1].trim().replace(stripParensRE, "");
        let iteratorMatch = item.match(forIteratorRE);
        if (iteratorMatch) {
          res.item = item.replace(forIteratorRE, "").trim();
          res.index = iteratorMatch[1].trim();
          if (iteratorMatch[2]) {
            res.collection = iteratorMatch[2].trim();
          }
        } else {
          res.item = item;
        }
        return res;
      }
      function getIterationScopeVariables(iteratorNames, item, index, items, extraVars) {
        let scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
        scopeVariables[iteratorNames.item] = item;
        if (iteratorNames.index)
          scopeVariables[iteratorNames.index] = index;
        if (iteratorNames.collection)
          scopeVariables[iteratorNames.collection] = items;
        return scopeVariables;
      }
      function generateKeyForIteration(component, el, index, iterationScopeVariables) {
        let bindKeyAttribute = getXAttrs(el, component, "bind").filter((attr) => attr.value === "key")[0];
        if (!bindKeyAttribute)
          return index;
        return component.evaluateReturnExpression(el, bindKeyAttribute.expression, () => iterationScopeVariables);
      }
      function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, el, iteratorNames, extraVars) {
        let ifAttribute = getXAttrs(el, component, "if")[0];
        if (ifAttribute && !component.evaluateReturnExpression(el, ifAttribute.expression)) {
          return [];
        }
        if (isNumeric(iteratorNames.items)) {
          return Array.from(Array(parseInt(iteratorNames.items, 10)).keys(), (i) => i + 1);
        }
        return component.evaluateReturnExpression(el, iteratorNames.items, extraVars);
      }
      function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
        let clone = document.importNode(templateEl.content, true);
        currentEl.parentElement.insertBefore(clone, currentEl.nextElementSibling);
        return currentEl.nextElementSibling;
      }
      function lookAheadForMatchingKeyedElementAndMoveItIfFound(nextEl, currentKey) {
        if (!nextEl)
          return;
        if (nextEl.__x_for_key === currentKey)
          return nextEl;
        let tmpNextEl = nextEl;
        while (tmpNextEl) {
          if (tmpNextEl.__x_for_key === currentKey) {
            return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
          }
          tmpNextEl = tmpNextEl.nextElementSibling && tmpNextEl.nextElementSibling.__x_for_key !== void 0 ? tmpNextEl.nextElementSibling : false;
        }
      }
      function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
        var nextElementFromOldLoop = currentEl.nextElementSibling && currentEl.nextElementSibling.__x_for_key !== void 0 ? currentEl.nextElementSibling : false;
        while (nextElementFromOldLoop) {
          let nextElementFromOldLoopImmutable = nextElementFromOldLoop;
          let nextSibling = nextElementFromOldLoop.nextElementSibling;
          transitionOut(nextElementFromOldLoop, () => {
            nextElementFromOldLoopImmutable.remove();
          }, component);
          nextElementFromOldLoop = nextSibling && nextSibling.__x_for_key !== void 0 ? nextSibling : false;
        }
      }
      function handleAttributeBindingDirective(component, el, attrName, expression, extraVars, attrType, modifiers) {
        var value = component.evaluateReturnExpression(el, expression, extraVars);
        if (attrName === "value") {
          if (Alpine.ignoreFocusedForValueBinding && document.activeElement.isSameNode(el))
            return;
          if (value === void 0 && expression.match(/\./)) {
            value = "";
          }
          if (el.type === "radio") {
            if (el.attributes.value === void 0 && attrType === "bind") {
              el.value = value;
            } else if (attrType !== "bind") {
              el.checked = el.value == value;
            }
          } else if (el.type === "checkbox") {
            if (typeof value === "string" && attrType === "bind") {
              el.value = value;
            } else if (attrType !== "bind") {
              if (Array.isArray(value)) {
                el.checked = value.some((val) => val == el.value);
              } else {
                el.checked = !!value;
              }
            }
          } else if (el.tagName === "SELECT") {
            updateSelect(el, value);
          } else {
            if (el.value === value)
              return;
            el.value = value;
          }
        } else if (attrName === "class") {
          if (Array.isArray(value)) {
            const originalClasses = el.__x_original_classes || [];
            el.setAttribute("class", arrayUnique(originalClasses.concat(value)).join(" "));
          } else if (typeof value === "object") {
            const keysSortedByBooleanValue = Object.keys(value).sort((a, b) => value[a] - value[b]);
            keysSortedByBooleanValue.forEach((classNames) => {
              if (value[classNames]) {
                convertClassStringToArray(classNames).forEach((className) => el.classList.add(className));
              } else {
                convertClassStringToArray(classNames).forEach((className) => el.classList.remove(className));
              }
            });
          } else {
            const originalClasses = el.__x_original_classes || [];
            const newClasses = convertClassStringToArray(value);
            el.setAttribute("class", arrayUnique(originalClasses.concat(newClasses)).join(" "));
          }
        } else {
          attrName = modifiers.includes("camel") ? camelCase(attrName) : attrName;
          if ([null, void 0, false].includes(value)) {
            el.removeAttribute(attrName);
          } else {
            isBooleanAttr(attrName) ? setIfChanged(el, attrName, attrName) : setIfChanged(el, attrName, value);
          }
        }
      }
      function setIfChanged(el, attrName, value) {
        if (el.getAttribute(attrName) != value) {
          el.setAttribute(attrName, value);
        }
      }
      function updateSelect(el, value) {
        const arrayWrappedValue = [].concat(value).map((value2) => {
          return value2 + "";
        });
        Array.from(el.options).forEach((option) => {
          option.selected = arrayWrappedValue.includes(option.value || option.text);
        });
      }
      function handleTextDirective(el, output, expression) {
        if (output === void 0 && expression.match(/\./)) {
          output = "";
        }
        el.textContent = output;
      }
      function handleHtmlDirective(component, el, expression, extraVars) {
        el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
      }
      function handleShowDirective(component, el, value, modifiers, initialUpdate = false) {
        const hide = () => {
          el.style.display = "none";
        };
        const show = () => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        };
        if (initialUpdate === true) {
          if (value) {
            show();
          } else {
            hide();
          }
          return;
        }
        const handle = (resolve) => {
          if (value) {
            if (el.style.display === "none" || el.__x_transition) {
              transitionIn(el, () => {
                show();
              }, component);
            }
            resolve(() => {
            });
          } else {
            if (el.style.display !== "none") {
              transitionOut(el, () => {
                resolve(() => {
                  hide();
                });
              }, component);
            } else {
              resolve(() => {
              });
            }
          }
        };
        if (modifiers.includes("immediate")) {
          handle((finish) => finish());
          return;
        }
        if (component.showDirectiveLastElement && !component.showDirectiveLastElement.contains(el)) {
          component.executeAndClearRemainingShowDirectiveStack();
        }
        component.showDirectiveStack.push(handle);
        component.showDirectiveLastElement = el;
      }
      function handleIfDirective(component, el, expressionResult, initialUpdate, extraVars) {
        warnIfMalformedTemplate(el, "x-if");
        const elementHasAlreadyBeenAdded = el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;
        if (expressionResult && (!elementHasAlreadyBeenAdded || el.__x_transition)) {
          const clone = document.importNode(el.content, true);
          el.parentElement.insertBefore(clone, el.nextElementSibling);
          transitionIn(el.nextElementSibling, () => {
          }, component, initialUpdate);
          component.initializeElements(el.nextElementSibling, extraVars);
          el.nextElementSibling.__x_inserted_me = true;
        } else if (!expressionResult && elementHasAlreadyBeenAdded) {
          transitionOut(el.nextElementSibling, () => {
            el.nextElementSibling.remove();
          }, component, initialUpdate);
        }
      }
      function registerListener(component, el, event, modifiers, expression, extraVars = {}) {
        const options = {
          passive: modifiers.includes("passive")
        };
        if (modifiers.includes("camel")) {
          event = camelCase(event);
        }
        if (modifiers.includes("away")) {
          let handler = (e) => {
            if (el.contains(e.target))
              return;
            if (el.offsetWidth < 1 && el.offsetHeight < 1)
              return;
            runListenerHandler(component, expression, e, extraVars);
            if (modifiers.includes("once")) {
              document.removeEventListener(event, handler, options);
            }
          };
          document.addEventListener(event, handler, options);
        } else {
          let listenerTarget = modifiers.includes("window") ? window : modifiers.includes("document") ? document : el;
          let handler = (e) => {
            if (listenerTarget === window || listenerTarget === document) {
              if (!document.body.contains(el)) {
                listenerTarget.removeEventListener(event, handler, options);
                return;
              }
            }
            if (isKeyEvent(event)) {
              if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
                return;
              }
            }
            if (modifiers.includes("prevent"))
              e.preventDefault();
            if (modifiers.includes("stop"))
              e.stopPropagation();
            if (!modifiers.includes("self") || e.target === el) {
              const returnValue = runListenerHandler(component, expression, e, extraVars);
              returnValue.then((value) => {
                if (value === false) {
                  e.preventDefault();
                } else {
                  if (modifiers.includes("once")) {
                    listenerTarget.removeEventListener(event, handler, options);
                  }
                }
              });
            }
          };
          if (modifiers.includes("debounce")) {
            let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
            let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
            handler = debounce(handler, wait);
          }
          listenerTarget.addEventListener(event, handler, options);
        }
      }
      function runListenerHandler(component, expression, e, extraVars) {
        return component.evaluateCommandExpression(e.target, expression, () => {
          return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            $event: e
          });
        });
      }
      function isKeyEvent(event) {
        return ["keydown", "keyup"].includes(event);
      }
      function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
        let keyModifiers = modifiers.filter((i) => {
          return !["window", "document", "prevent", "stop"].includes(i);
        });
        if (keyModifiers.includes("debounce")) {
          let debounceIndex = keyModifiers.indexOf("debounce");
          keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
        }
        if (keyModifiers.length === 0)
          return false;
        if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key))
          return false;
        const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
        const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
        keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
        if (selectedSystemKeyModifiers.length > 0) {
          const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
            if (modifier === "cmd" || modifier === "super")
              modifier = "meta";
            return e[`${modifier}Key`];
          });
          if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
            if (keyModifiers[0] === keyToModifier(e.key))
              return false;
          }
        }
        return true;
      }
      function keyToModifier(key) {
        switch (key) {
          case "/":
            return "slash";
          case " ":
          case "Spacebar":
            return "space";
          default:
            return key && kebabCase(key);
        }
      }
      function registerModelListener(component, el, modifiers, expression, extraVars) {
        var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
        const listenerExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
        registerListener(component, el, event, modifiers, listenerExpression, () => {
          return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            rightSideOfExpression: generateModelAssignmentFunction(el, modifiers, expression)
          });
        });
      }
      function generateModelAssignmentFunction(el, modifiers, expression) {
        if (el.type === "radio") {
          if (!el.hasAttribute("name"))
            el.setAttribute("name", expression);
        }
        return (event, currentValue) => {
          if (event instanceof CustomEvent && event.detail) {
            return event.detail;
          } else if (el.type === "checkbox") {
            if (Array.isArray(currentValue)) {
              const newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
              return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((i) => i !== newValue);
            } else {
              return event.target.checked;
            }
          } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
            return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option) => {
              const rawValue = option.value || option.text;
              return safeParseNumber(rawValue);
            }) : Array.from(event.target.selectedOptions).map((option) => {
              return option.value || option.text;
            });
          } else {
            const rawValue = event.target.value;
            return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
          }
        };
      }
      function safeParseNumber(rawValue) {
        const number = rawValue ? parseFloat(rawValue) : null;
        return isNumeric(number) ? number : rawValue;
      }
      const {isArray} = Array;
      const {getPrototypeOf, create: ObjectCreate, defineProperty: ObjectDefineProperty, defineProperties: ObjectDefineProperties, isExtensible, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, preventExtensions, hasOwnProperty} = Object;
      const {push: ArrayPush, concat: ArrayConcat, map: ArrayMap} = Array.prototype;
      function isUndefined(obj) {
        return obj === void 0;
      }
      function isFunction(obj) {
        return typeof obj === "function";
      }
      function isObject(obj) {
        return typeof obj === "object";
      }
      const proxyToValueMap = new WeakMap();
      function registerProxy(proxy, value) {
        proxyToValueMap.set(proxy, value);
      }
      const unwrap = (replicaOrAny) => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
      function wrapValue(membrane, value) {
        return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
      }
      function unwrapDescriptor(descriptor) {
        if (hasOwnProperty.call(descriptor, "value")) {
          descriptor.value = unwrap(descriptor.value);
        }
        return descriptor;
      }
      function lockShadowTarget(membrane, shadowTarget, originalTarget) {
        const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        targetKeys.forEach((key) => {
          let descriptor = getOwnPropertyDescriptor(originalTarget, key);
          if (!descriptor.configurable) {
            descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
          }
          ObjectDefineProperty(shadowTarget, key, descriptor);
        });
        preventExtensions(shadowTarget);
      }
      class ReactiveProxyHandler {
        constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
        }
        get(shadowTarget, key) {
          const {originalTarget, membrane} = this;
          const value = originalTarget[key];
          const {valueObserved} = membrane;
          valueObserved(originalTarget, key);
          return membrane.getProxy(value);
        }
        set(shadowTarget, key, value) {
          const {originalTarget, membrane: {valueMutated}} = this;
          const oldValue = originalTarget[key];
          if (oldValue !== value) {
            originalTarget[key] = value;
            valueMutated(originalTarget, key);
          } else if (key === "length" && isArray(originalTarget)) {
            valueMutated(originalTarget, key);
          }
          return true;
        }
        deleteProperty(shadowTarget, key) {
          const {originalTarget, membrane: {valueMutated}} = this;
          delete originalTarget[key];
          valueMutated(originalTarget, key);
          return true;
        }
        apply(shadowTarget, thisArg, argArray) {
        }
        construct(target, argArray, newTarget) {
        }
        has(shadowTarget, key) {
          const {originalTarget, membrane: {valueObserved}} = this;
          valueObserved(originalTarget, key);
          return key in originalTarget;
        }
        ownKeys(shadowTarget) {
          const {originalTarget} = this;
          return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        }
        isExtensible(shadowTarget) {
          const shadowIsExtensible = isExtensible(shadowTarget);
          if (!shadowIsExtensible) {
            return shadowIsExtensible;
          }
          const {originalTarget, membrane} = this;
          const targetIsExtensible = isExtensible(originalTarget);
          if (!targetIsExtensible) {
            lockShadowTarget(membrane, shadowTarget, originalTarget);
          }
          return targetIsExtensible;
        }
        setPrototypeOf(shadowTarget, prototype) {
        }
        getPrototypeOf(shadowTarget) {
          const {originalTarget} = this;
          return getPrototypeOf(originalTarget);
        }
        getOwnPropertyDescriptor(shadowTarget, key) {
          const {originalTarget, membrane} = this;
          const {valueObserved} = this.membrane;
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
            return desc;
          }
          const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
          if (!isUndefined(shadowDescriptor)) {
            return shadowDescriptor;
          }
          desc = wrapDescriptor(membrane, desc, wrapValue);
          if (!desc.configurable) {
            ObjectDefineProperty(shadowTarget, key, desc);
          }
          return desc;
        }
        preventExtensions(shadowTarget) {
          const {originalTarget, membrane} = this;
          lockShadowTarget(membrane, shadowTarget, originalTarget);
          preventExtensions(originalTarget);
          return true;
        }
        defineProperty(shadowTarget, key, descriptor) {
          const {originalTarget, membrane} = this;
          const {valueMutated} = membrane;
          const {configurable} = descriptor;
          if (hasOwnProperty.call(descriptor, "writable") && !hasOwnProperty.call(descriptor, "value")) {
            const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
            descriptor.value = originalDescriptor.value;
          }
          ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));
          if (configurable === false) {
            ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
          }
          valueMutated(originalTarget, key);
          return true;
        }
      }
      function wrapReadOnlyValue(membrane, value) {
        return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
      }
      class ReadOnlyHandler {
        constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
        }
        get(shadowTarget, key) {
          const {membrane, originalTarget} = this;
          const value = originalTarget[key];
          const {valueObserved} = membrane;
          valueObserved(originalTarget, key);
          return membrane.getReadOnlyProxy(value);
        }
        set(shadowTarget, key, value) {
          return false;
        }
        deleteProperty(shadowTarget, key) {
          return false;
        }
        apply(shadowTarget, thisArg, argArray) {
        }
        construct(target, argArray, newTarget) {
        }
        has(shadowTarget, key) {
          const {originalTarget, membrane: {valueObserved}} = this;
          valueObserved(originalTarget, key);
          return key in originalTarget;
        }
        ownKeys(shadowTarget) {
          const {originalTarget} = this;
          return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
        }
        setPrototypeOf(shadowTarget, prototype) {
        }
        getOwnPropertyDescriptor(shadowTarget, key) {
          const {originalTarget, membrane} = this;
          const {valueObserved} = membrane;
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
            return desc;
          }
          const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
          if (!isUndefined(shadowDescriptor)) {
            return shadowDescriptor;
          }
          desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
          if (hasOwnProperty.call(desc, "set")) {
            desc.set = void 0;
          }
          if (!desc.configurable) {
            ObjectDefineProperty(shadowTarget, key, desc);
          }
          return desc;
        }
        preventExtensions(shadowTarget) {
          return false;
        }
        defineProperty(shadowTarget, key, descriptor) {
          return false;
        }
      }
      function createShadowTarget(value) {
        let shadowTarget = void 0;
        if (isArray(value)) {
          shadowTarget = [];
        } else if (isObject(value)) {
          shadowTarget = {};
        }
        return shadowTarget;
      }
      const ObjectDotPrototype = Object.prototype;
      function defaultValueIsObservable(value) {
        if (value === null) {
          return false;
        }
        if (typeof value !== "object") {
          return false;
        }
        if (isArray(value)) {
          return true;
        }
        const proto = getPrototypeOf(value);
        return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
      }
      const defaultValueObserved = (obj, key) => {
      };
      const defaultValueMutated = (obj, key) => {
      };
      const defaultValueDistortion = (value) => value;
      function wrapDescriptor(membrane, descriptor, getValue) {
        const {set, get} = descriptor;
        if (hasOwnProperty.call(descriptor, "value")) {
          descriptor.value = getValue(membrane, descriptor.value);
        } else {
          if (!isUndefined(get)) {
            descriptor.get = function() {
              return getValue(membrane, get.call(unwrap(this)));
            };
          }
          if (!isUndefined(set)) {
            descriptor.set = function(value) {
              set.call(unwrap(this), membrane.unwrapProxy(value));
            };
          }
        }
        return descriptor;
      }
      class ReactiveMembrane {
        constructor(options) {
          this.valueDistortion = defaultValueDistortion;
          this.valueMutated = defaultValueMutated;
          this.valueObserved = defaultValueObserved;
          this.valueIsObservable = defaultValueIsObservable;
          this.objectGraph = new WeakMap();
          if (!isUndefined(options)) {
            const {valueDistortion, valueMutated, valueObserved, valueIsObservable} = options;
            this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
            this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
            this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
            this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
          }
        }
        getProxy(value) {
          const unwrappedValue = unwrap(value);
          const distorted = this.valueDistortion(unwrappedValue);
          if (this.valueIsObservable(distorted)) {
            const o = this.getReactiveState(unwrappedValue, distorted);
            return o.readOnly === value ? value : o.reactive;
          }
          return distorted;
        }
        getReadOnlyProxy(value) {
          value = unwrap(value);
          const distorted = this.valueDistortion(value);
          if (this.valueIsObservable(distorted)) {
            return this.getReactiveState(value, distorted).readOnly;
          }
          return distorted;
        }
        unwrapProxy(p) {
          return unwrap(p);
        }
        getReactiveState(value, distortedValue) {
          const {objectGraph} = this;
          let reactiveState = objectGraph.get(distortedValue);
          if (reactiveState) {
            return reactiveState;
          }
          const membrane = this;
          reactiveState = {
            get reactive() {
              const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue);
              const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
              registerProxy(proxy, value);
              ObjectDefineProperty(this, "reactive", {value: proxy});
              return proxy;
            },
            get readOnly() {
              const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue);
              const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
              registerProxy(proxy, value);
              ObjectDefineProperty(this, "readOnly", {value: proxy});
              return proxy;
            }
          };
          objectGraph.set(distortedValue, reactiveState);
          return reactiveState;
        }
      }
      function wrap(data, mutationCallback) {
        let membrane = new ReactiveMembrane({
          valueMutated(target, key) {
            mutationCallback(target, key);
          }
        });
        return {
          data: membrane.getProxy(data),
          membrane
        };
      }
      function unwrap$1(membrane, observable) {
        let unwrappedData = membrane.unwrapProxy(observable);
        let copy = {};
        Object.keys(unwrappedData).forEach((key) => {
          if (["$el", "$refs", "$nextTick", "$watch"].includes(key))
            return;
          copy[key] = unwrappedData[key];
        });
        return copy;
      }
      class Component {
        constructor(el, componentForClone = null) {
          this.$el = el;
          const dataAttr = this.$el.getAttribute("x-data");
          const dataExpression = dataAttr === "" ? "{}" : dataAttr;
          const initExpression = this.$el.getAttribute("x-init");
          let dataExtras = {
            $el: this.$el
          };
          let canonicalComponentElementReference = componentForClone ? componentForClone.$el : this.$el;
          Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
            Object.defineProperty(dataExtras, `$${name}`, {
              get: function get() {
                return callback(canonicalComponentElementReference);
              }
            });
          });
          this.unobservedData = componentForClone ? componentForClone.getUnobservedData() : saferEval(dataExpression, dataExtras);
          let {
            membrane,
            data
          } = this.wrapDataInObservable(this.unobservedData);
          this.$data = data;
          this.membrane = membrane;
          this.unobservedData.$el = this.$el;
          this.unobservedData.$refs = this.getRefsProxy();
          this.nextTickStack = [];
          this.unobservedData.$nextTick = (callback) => {
            this.nextTickStack.push(callback);
          };
          this.watchers = {};
          this.unobservedData.$watch = (property, callback) => {
            if (!this.watchers[property])
              this.watchers[property] = [];
            this.watchers[property].push(callback);
          };
          Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
            Object.defineProperty(this.unobservedData, `$${name}`, {
              get: function get() {
                return callback(canonicalComponentElementReference);
              }
            });
          });
          this.showDirectiveStack = [];
          this.showDirectiveLastElement;
          componentForClone || Alpine.onBeforeComponentInitializeds.forEach((callback) => callback(this));
          var initReturnedCallback;
          if (initExpression && !componentForClone) {
            this.pauseReactivity = true;
            initReturnedCallback = this.evaluateReturnExpression(this.$el, initExpression);
            this.pauseReactivity = false;
          }
          this.initializeElements(this.$el);
          this.listenForNewElementsToInitialize();
          if (typeof initReturnedCallback === "function") {
            initReturnedCallback.call(this.$data);
          }
          componentForClone || setTimeout(() => {
            Alpine.onComponentInitializeds.forEach((callback) => callback(this));
          }, 0);
        }
        getUnobservedData() {
          return unwrap$1(this.membrane, this.$data);
        }
        wrapDataInObservable(data) {
          var self2 = this;
          let updateDom = debounce(function() {
            self2.updateElements(self2.$el);
          }, 0);
          return wrap(data, (target, key) => {
            if (self2.watchers[key]) {
              self2.watchers[key].forEach((callback) => callback(target[key]));
            } else if (Array.isArray(target)) {
              Object.keys(self2.watchers).forEach((fullDotNotationKey) => {
                let dotNotationParts = fullDotNotationKey.split(".");
                if (key === "length")
                  return;
                dotNotationParts.reduce((comparisonData, part) => {
                  if (Object.is(target, comparisonData[part])) {
                    self2.watchers[fullDotNotationKey].forEach((callback) => callback(target));
                  }
                  return comparisonData[part];
                }, self2.getUnobservedData());
              });
            } else {
              Object.keys(self2.watchers).filter((i) => i.includes(".")).forEach((fullDotNotationKey) => {
                let dotNotationParts = fullDotNotationKey.split(".");
                if (key !== dotNotationParts[dotNotationParts.length - 1])
                  return;
                dotNotationParts.reduce((comparisonData, part) => {
                  if (Object.is(target, comparisonData)) {
                    self2.watchers[fullDotNotationKey].forEach((callback) => callback(target[key]));
                  }
                  return comparisonData[part];
                }, self2.getUnobservedData());
              });
            }
            if (self2.pauseReactivity)
              return;
            updateDom();
          });
        }
        walkAndSkipNestedComponents(el, callback, initializeComponentCallback = () => {
        }) {
          walk(el, (el2) => {
            if (el2.hasAttribute("x-data")) {
              if (!el2.isSameNode(this.$el)) {
                if (!el2.__x)
                  initializeComponentCallback(el2);
                return false;
              }
            }
            return callback(el2);
          });
        }
        initializeElements(rootEl, extraVars = () => {
        }) {
          this.walkAndSkipNestedComponents(rootEl, (el) => {
            if (el.__x_for_key !== void 0)
              return false;
            if (el.__x_inserted_me !== void 0)
              return false;
            this.initializeElement(el, extraVars);
          }, (el) => {
            el.__x = new Component(el);
          });
          this.executeAndClearRemainingShowDirectiveStack();
          this.executeAndClearNextTickStack(rootEl);
        }
        initializeElement(el, extraVars) {
          if (el.hasAttribute("class") && getXAttrs(el, this).length > 0) {
            el.__x_original_classes = convertClassStringToArray(el.getAttribute("class"));
          }
          this.registerListeners(el, extraVars);
          this.resolveBoundAttributes(el, true, extraVars);
        }
        updateElements(rootEl, extraVars = () => {
        }) {
          this.walkAndSkipNestedComponents(rootEl, (el) => {
            if (el.__x_for_key !== void 0 && !el.isSameNode(this.$el))
              return false;
            this.updateElement(el, extraVars);
          }, (el) => {
            el.__x = new Component(el);
          });
          this.executeAndClearRemainingShowDirectiveStack();
          this.executeAndClearNextTickStack(rootEl);
        }
        executeAndClearNextTickStack(el) {
          if (el === this.$el && this.nextTickStack.length > 0) {
            requestAnimationFrame(() => {
              while (this.nextTickStack.length > 0) {
                this.nextTickStack.shift()();
              }
            });
          }
        }
        executeAndClearRemainingShowDirectiveStack() {
          this.showDirectiveStack.reverse().map((thing) => {
            return new Promise((resolve) => {
              thing((finish) => {
                resolve(finish);
              });
            });
          }).reduce((nestedPromise, promise) => {
            return nestedPromise.then(() => {
              return promise.then((finish) => finish());
            });
          }, Promise.resolve(() => {
          }));
          this.showDirectiveStack = [];
          this.showDirectiveLastElement = void 0;
        }
        updateElement(el, extraVars) {
          this.resolveBoundAttributes(el, false, extraVars);
        }
        registerListeners(el, extraVars) {
          getXAttrs(el, this).forEach(({
            type,
            value,
            modifiers,
            expression
          }) => {
            switch (type) {
              case "on":
                registerListener(this, el, value, modifiers, expression, extraVars);
                break;
              case "model":
                registerModelListener(this, el, modifiers, expression, extraVars);
                break;
            }
          });
        }
        resolveBoundAttributes(el, initialUpdate = false, extraVars) {
          let attrs = getXAttrs(el, this);
          attrs.forEach(({
            type,
            value,
            modifiers,
            expression
          }) => {
            switch (type) {
              case "model":
                handleAttributeBindingDirective(this, el, "value", expression, extraVars, type, modifiers);
                break;
              case "bind":
                if (el.tagName.toLowerCase() === "template" && value === "key")
                  return;
                handleAttributeBindingDirective(this, el, value, expression, extraVars, type, modifiers);
                break;
              case "text":
                var output = this.evaluateReturnExpression(el, expression, extraVars);
                handleTextDirective(el, output, expression);
                break;
              case "html":
                handleHtmlDirective(this, el, expression, extraVars);
                break;
              case "show":
                var output = this.evaluateReturnExpression(el, expression, extraVars);
                handleShowDirective(this, el, output, modifiers, initialUpdate);
                break;
              case "if":
                if (attrs.some((i) => i.type === "for"))
                  return;
                var output = this.evaluateReturnExpression(el, expression, extraVars);
                handleIfDirective(this, el, output, initialUpdate, extraVars);
                break;
              case "for":
                handleForDirective(this, el, expression, initialUpdate, extraVars);
                break;
              case "cloak":
                el.removeAttribute("x-cloak");
                break;
            }
          });
        }
        evaluateReturnExpression(el, expression, extraVars = () => {
        }) {
          return saferEval(expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            $dispatch: this.getDispatchFunction(el)
          }));
        }
        evaluateCommandExpression(el, expression, extraVars = () => {
        }) {
          return saferEvalNoReturn(expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
            $dispatch: this.getDispatchFunction(el)
          }));
        }
        getDispatchFunction(el) {
          return (event, detail = {}) => {
            el.dispatchEvent(new CustomEvent(event, {
              detail,
              bubbles: true
            }));
          };
        }
        listenForNewElementsToInitialize() {
          const targetNode = this.$el;
          const observerOptions = {
            childList: true,
            attributes: true,
            subtree: true
          };
          const observer = new MutationObserver((mutations) => {
            for (let i = 0; i < mutations.length; i++) {
              const closestParentComponent = mutations[i].target.closest("[x-data]");
              if (!(closestParentComponent && closestParentComponent.isSameNode(this.$el)))
                continue;
              if (mutations[i].type === "attributes" && mutations[i].attributeName === "x-data") {
                const rawData = saferEval(mutations[i].target.getAttribute("x-data") || "{}", {
                  $el: this.$el
                });
                Object.keys(rawData).forEach((key) => {
                  if (this.$data[key] !== rawData[key]) {
                    this.$data[key] = rawData[key];
                  }
                });
              }
              if (mutations[i].addedNodes.length > 0) {
                mutations[i].addedNodes.forEach((node) => {
                  if (node.nodeType !== 1 || node.__x_inserted_me)
                    return;
                  if (node.matches("[x-data]") && !node.__x) {
                    node.__x = new Component(node);
                    return;
                  }
                  this.initializeElements(node);
                });
              }
            }
          });
          observer.observe(targetNode, observerOptions);
        }
        getRefsProxy() {
          var self2 = this;
          var refObj = {};
          return new Proxy(refObj, {
            get(object, property) {
              if (property === "$isAlpineProxy")
                return true;
              var ref;
              self2.walkAndSkipNestedComponents(self2.$el, (el) => {
                if (el.hasAttribute("x-ref") && el.getAttribute("x-ref") === property) {
                  ref = el;
                }
              });
              return ref;
            }
          });
        }
      }
      const Alpine = {
        version: "2.7.0",
        pauseMutationObserver: false,
        magicProperties: {},
        onComponentInitializeds: [],
        onBeforeComponentInitializeds: [],
        ignoreFocusedForValueBinding: false,
        start: function start() {
          return __async(this, null, function* () {
            if (!isTesting()) {
              yield domReady();
            }
            this.discoverComponents((el) => {
              this.initializeComponent(el);
            });
            document.addEventListener("turbolinks:load", () => {
              this.discoverUninitializedComponents((el) => {
                this.initializeComponent(el);
              });
            });
            this.listenForNewUninitializedComponentsAtRunTime((el) => {
              this.initializeComponent(el);
            });
          });
        },
        discoverComponents: function discoverComponents(callback) {
          const rootEls = document.querySelectorAll("[x-data]");
          rootEls.forEach((rootEl) => {
            callback(rootEl);
          });
        },
        discoverUninitializedComponents: function discoverUninitializedComponents(callback, el = null) {
          const rootEls = (el || document).querySelectorAll("[x-data]");
          Array.from(rootEls).filter((el2) => el2.__x === void 0).forEach((rootEl) => {
            callback(rootEl);
          });
        },
        listenForNewUninitializedComponentsAtRunTime: function listenForNewUninitializedComponentsAtRunTime(callback) {
          const targetNode = document.querySelector("body");
          const observerOptions = {
            childList: true,
            attributes: true,
            subtree: true
          };
          const observer = new MutationObserver((mutations) => {
            if (this.pauseMutationObserver)
              return;
            for (let i = 0; i < mutations.length; i++) {
              if (mutations[i].addedNodes.length > 0) {
                mutations[i].addedNodes.forEach((node) => {
                  if (node.nodeType !== 1)
                    return;
                  if (node.parentElement && node.parentElement.closest("[x-data]"))
                    return;
                  this.discoverUninitializedComponents((el) => {
                    this.initializeComponent(el);
                  }, node.parentElement);
                });
              }
            }
          });
          observer.observe(targetNode, observerOptions);
        },
        initializeComponent: function initializeComponent(el) {
          if (!el.__x) {
            try {
              el.__x = new Component(el);
            } catch (error) {
              setTimeout(() => {
                throw error;
              }, 0);
            }
          }
        },
        clone: function clone(component, newEl) {
          if (!newEl.__x) {
            newEl.__x = new Component(newEl, component);
          }
        },
        addMagicProperty: function addMagicProperty(name, callback) {
          this.magicProperties[name] = callback;
        },
        onComponentInitialized: function onComponentInitialized(callback) {
          this.onComponentInitializeds.push(callback);
        },
        onBeforeComponentInitialized: function onBeforeComponentInitialized(callback) {
          this.onBeforeComponentInitializeds.push(callback);
        }
      };
      if (!isTesting()) {
        window.Alpine = Alpine;
        if (window.deferLoadingAlpine) {
          window.deferLoadingAlpine(function() {
            window.Alpine.start();
          });
        } else {
          window.Alpine.start();
        }
      }
      return Alpine;
    });
  });

  // src/ts/main.ts
  const alpinejs = __toModule(require_alpine());
  function toggleNavbar(collapseID) {
    var _a, _b;
    (_a = document.getElementById(collapseID)) == null ? void 0 : _a.classList.toggle("hidden");
    (_b = document.getElementById(collapseID)) == null ? void 0 : _b.classList.toggle("block");
  }
  window.toggleNavbar = toggleNavbar;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2FscGluZWpzL2Rpc3QvYWxwaW5lLmpzIiwgIi4uLy4uL3NyYy90cy9tYWluLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkFscGluZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gICAgICBpZiAoZW51bWVyYWJsZU9ubHkpIHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgfSk7XG4gICAgICBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleXM7XG4gIH1cblxuICBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG5cbiAgICAgIGlmIChpICUgMikge1xuICAgICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpLCB0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIC8vIFRoYW5rcyBAc3RpbXVsdXM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdGltdWx1c2pzL3N0aW11bHVzL2Jsb2IvbWFzdGVyL3BhY2thZ2VzLyU0MHN0aW11bHVzL2NvcmUvc3JjL2FwcGxpY2F0aW9uLnRzXG4gIGZ1bmN0aW9uIGRvbVJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwibG9hZGluZ1wiKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlc29sdmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGFycmF5VW5pcXVlKGFycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhcnJheSkpO1xuICB9XG4gIGZ1bmN0aW9uIGlzVGVzdGluZygpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIk5vZGUuanNcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcImpzZG9tXCIpO1xuICB9XG4gIGZ1bmN0aW9uIHdhcm5JZk1hbGZvcm1lZFRlbXBsYXRlKGVsLCBkaXJlY3RpdmUpIHtcbiAgICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAndGVtcGxhdGUnKSB7XG4gICAgICBjb25zb2xlLndhcm4oYEFscGluZTogWyR7ZGlyZWN0aXZlfV0gZGlyZWN0aXZlIHNob3VsZCBvbmx5IGJlIGFkZGVkIHRvIDx0ZW1wbGF0ZT4gdGFncy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHBpbmVqcy9hbHBpbmUjJHtkaXJlY3RpdmV9YCk7XG4gICAgfSBlbHNlIGlmIChlbC5jb250ZW50LmNoaWxkRWxlbWVudENvdW50ICE9PSAxKSB7XG4gICAgICBjb25zb2xlLndhcm4oYEFscGluZTogPHRlbXBsYXRlPiB0YWcgd2l0aCBbJHtkaXJlY3RpdmV9XSBlbmNvdW50ZXJlZCB3aXRoIG11bHRpcGxlIGVsZW1lbnQgcm9vdHMuIE1ha2Ugc3VyZSA8dGVtcGxhdGU+IG9ubHkgaGFzIGEgc2luZ2xlIGNoaWxkIGVsZW1lbnQuYCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGtlYmFiQ2FzZShzdWJqZWN0KSB7XG4gICAgcmV0dXJuIHN1YmplY3QucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykucmVwbGFjZSgvW19cXHNdLywgJy0nKS50b0xvd2VyQ2FzZSgpO1xuICB9XG4gIGZ1bmN0aW9uIGNhbWVsQ2FzZShzdWJqZWN0KSB7XG4gICAgcmV0dXJuIHN1YmplY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tKFxcdykvZywgKG1hdGNoLCBjaGFyKSA9PiBjaGFyLnRvVXBwZXJDYXNlKCkpO1xuICB9XG4gIGZ1bmN0aW9uIHdhbGsoZWwsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGNhbGxiYWNrKGVsKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICBsZXQgbm9kZSA9IGVsLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIHdhbGsobm9kZSwgY2FsbGJhY2spO1xuICAgICAgbm9kZSA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gICAgdmFyIHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiBsYXRlcigpIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9O1xuXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBzYWZlckV2YWwoZXhwcmVzc2lvbiwgZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGV4cHJlc3Npb24uY2FsbChkYXRhQ29udGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihbJyRkYXRhJywgLi4uT2JqZWN0LmtleXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyldLCBgdmFyIF9fYWxwaW5lX3Jlc3VsdDsgd2l0aCgkZGF0YSkgeyBfX2FscGluZV9yZXN1bHQgPSAke2V4cHJlc3Npb259IH07IHJldHVybiBfX2FscGluZV9yZXN1bHRgKShkYXRhQ29udGV4dCwgLi4uT2JqZWN0LnZhbHVlcyhhZGRpdGlvbmFsSGVscGVyVmFyaWFibGVzKSk7XG4gIH1cbiAgZnVuY3Rpb24gc2FmZXJFdmFsTm9SZXR1cm4oZXhwcmVzc2lvbiwgZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShleHByZXNzaW9uLmNhbGwoZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXNbJyRldmVudCddKSk7XG4gICAgfVxuXG4gICAgbGV0IEFzeW5jRnVuY3Rpb24gPSBGdW5jdGlvbjtcbiAgICAvKiBNT0RFUk4tT05MWTpTVEFSVCAqL1xuXG4gICAgQXN5bmNGdW5jdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyBmdW5jdGlvbiAoKSB7fSkuY29uc3RydWN0b3I7XG4gICAgLyogTU9ERVJOLU9OTFk6RU5EICovXG4gICAgLy8gRm9yIHRoZSBjYXNlcyB3aGVuIHVzZXJzIHBhc3Mgb25seSBhIGZ1bmN0aW9uIHJlZmVyZW5jZSB0byB0aGUgY2FsbGVyOiBgeC1vbjpjbGljaz1cImZvb1wiYFxuICAgIC8vIFdoZXJlIFwiZm9vXCIgaXMgYSBmdW5jdGlvbi4gQWxzbywgd2UnbGwgcGFzcyB0aGUgZnVuY3Rpb24gdGhlIGV2ZW50IGluc3RhbmNlIHdoZW4gd2UgY2FsbCBpdC5cblxuICAgIGlmIChPYmplY3Qua2V5cyhkYXRhQ29udGV4dCkuaW5jbHVkZXMoZXhwcmVzc2lvbikpIHtcbiAgICAgIGxldCBtZXRob2RSZWZlcmVuY2UgPSBuZXcgRnVuY3Rpb24oWydkYXRhQ29udGV4dCcsIC4uLk9iamVjdC5rZXlzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpXSwgYHdpdGgoZGF0YUNvbnRleHQpIHsgcmV0dXJuICR7ZXhwcmVzc2lvbn0gfWApKGRhdGFDb250ZXh0LCAuLi5PYmplY3QudmFsdWVzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpKTtcblxuICAgICAgaWYgKHR5cGVvZiBtZXRob2RSZWZlcmVuY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRob2RSZWZlcmVuY2UuY2FsbChkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlc1snJGV2ZW50J10pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBBc3luY0Z1bmN0aW9uKFsnZGF0YUNvbnRleHQnLCAuLi5PYmplY3Qua2V5cyhhZGRpdGlvbmFsSGVscGVyVmFyaWFibGVzKV0sIGB3aXRoKGRhdGFDb250ZXh0KSB7ICR7ZXhwcmVzc2lvbn0gfWApKGRhdGFDb250ZXh0LCAuLi5PYmplY3QudmFsdWVzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpKSk7XG4gIH1cbiAgY29uc3QgeEF0dHJSRSA9IC9eeC0ob258YmluZHxkYXRhfHRleHR8aHRtbHxtb2RlbHxpZnxmb3J8c2hvd3xjbG9ha3x0cmFuc2l0aW9ufHJlZnxzcHJlYWQpXFxiLztcbiAgZnVuY3Rpb24gaXNYQXR0cihhdHRyKSB7XG4gICAgY29uc3QgbmFtZSA9IHJlcGxhY2VBdEFuZENvbG9uV2l0aFN0YW5kYXJkU3ludGF4KGF0dHIubmFtZSk7XG4gICAgcmV0dXJuIHhBdHRyUkUudGVzdChuYW1lKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgdHlwZSkge1xuICAgIGxldCBkaXJlY3RpdmVzID0gQXJyYXkuZnJvbShlbC5hdHRyaWJ1dGVzKS5maWx0ZXIoaXNYQXR0cikubWFwKHBhcnNlSHRtbEF0dHJpYnV0ZSk7IC8vIEdldCBhbiBvYmplY3Qgb2YgZGlyZWN0aXZlcyBmcm9tIHgtc3ByZWFkLlxuXG4gICAgbGV0IHNwcmVhZERpcmVjdGl2ZSA9IGRpcmVjdGl2ZXMuZmlsdGVyKGRpcmVjdGl2ZSA9PiBkaXJlY3RpdmUudHlwZSA9PT0gJ3NwcmVhZCcpWzBdO1xuXG4gICAgaWYgKHNwcmVhZERpcmVjdGl2ZSkge1xuICAgICAgbGV0IHNwcmVhZE9iamVjdCA9IHNhZmVyRXZhbChzcHJlYWREaXJlY3RpdmUuZXhwcmVzc2lvbiwgY29tcG9uZW50LiRkYXRhKTsgLy8gQWRkIHgtc3ByZWFkIGRpcmVjdGl2ZXMgdG8gdGhlIHBpbGUgb2YgZXhpc3RpbmcgZGlyZWN0aXZlcy5cblxuICAgICAgZGlyZWN0aXZlcyA9IGRpcmVjdGl2ZXMuY29uY2F0KE9iamVjdC5lbnRyaWVzKHNwcmVhZE9iamVjdCkubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBwYXJzZUh0bWxBdHRyaWJ1dGUoe1xuICAgICAgICBuYW1lLFxuICAgICAgICB2YWx1ZVxuICAgICAgfSkpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSkgcmV0dXJuIGRpcmVjdGl2ZXMuZmlsdGVyKGkgPT4gaS50eXBlID09PSB0eXBlKTtcbiAgICByZXR1cm4gc29ydERpcmVjdGl2ZXMoZGlyZWN0aXZlcyk7XG4gIH1cblxuICBmdW5jdGlvbiBzb3J0RGlyZWN0aXZlcyhkaXJlY3RpdmVzKSB7XG4gICAgbGV0IGRpcmVjdGl2ZU9yZGVyID0gWydiaW5kJywgJ21vZGVsJywgJ3Nob3cnLCAnY2F0Y2gtYWxsJ107XG4gICAgcmV0dXJuIGRpcmVjdGl2ZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgbGV0IHR5cGVBID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihhLnR5cGUpID09PSAtMSA/ICdjYXRjaC1hbGwnIDogYS50eXBlO1xuICAgICAgbGV0IHR5cGVCID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihiLnR5cGUpID09PSAtMSA/ICdjYXRjaC1hbGwnIDogYi50eXBlO1xuICAgICAgcmV0dXJuIGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YodHlwZUEpIC0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZih0eXBlQik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUh0bWxBdHRyaWJ1dGUoe1xuICAgIG5hbWUsXG4gICAgdmFsdWVcbiAgfSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gcmVwbGFjZUF0QW5kQ29sb25XaXRoU3RhbmRhcmRTeW50YXgobmFtZSk7XG4gICAgY29uc3QgdHlwZU1hdGNoID0gbm9ybWFsaXplZE5hbWUubWF0Y2goeEF0dHJSRSk7XG4gICAgY29uc3QgdmFsdWVNYXRjaCA9IG5vcm1hbGl6ZWROYW1lLm1hdGNoKC86KFthLXpBLVowLTlcXC06XSspLyk7XG4gICAgY29uc3QgbW9kaWZpZXJzID0gbm9ybWFsaXplZE5hbWUubWF0Y2goL1xcLlteLlxcXV0rKD89W15cXF1dKiQpL2cpIHx8IFtdO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0eXBlTWF0Y2ggPyB0eXBlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgdmFsdWU6IHZhbHVlTWF0Y2ggPyB2YWx1ZU1hdGNoWzFdIDogbnVsbCxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLm1hcChpID0+IGkucmVwbGFjZSgnLicsICcnKSksXG4gICAgICBleHByZXNzaW9uOiB2YWx1ZVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaXNCb29sZWFuQXR0cihhdHRyTmFtZSkge1xuICAgIC8vIEFzIHBlciBIVE1MIHNwZWMgdGFibGUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5kaWNlcy5odG1sI2F0dHJpYnV0ZXMtMzpib29sZWFuLWF0dHJpYnV0ZVxuICAgIC8vIEFycmF5IHJvdWdobHkgb3JkZXJlZCBieSBlc3RpbWF0ZWQgdXNhZ2VcbiAgICBjb25zdCBib29sZWFuQXR0cmlidXRlcyA9IFsnZGlzYWJsZWQnLCAnY2hlY2tlZCcsICdyZXF1aXJlZCcsICdyZWFkb25seScsICdoaWRkZW4nLCAnb3BlbicsICdzZWxlY3RlZCcsICdhdXRvZm9jdXMnLCAnaXRlbXNjb3BlJywgJ211bHRpcGxlJywgJ25vdmFsaWRhdGUnLCAnYWxsb3dmdWxsc2NyZWVuJywgJ2FsbG93cGF5bWVudHJlcXVlc3QnLCAnZm9ybW5vdmFsaWRhdGUnLCAnYXV0b3BsYXknLCAnY29udHJvbHMnLCAnbG9vcCcsICdtdXRlZCcsICdwbGF5c2lubGluZScsICdkZWZhdWx0JywgJ2lzbWFwJywgJ3JldmVyc2VkJywgJ2FzeW5jJywgJ2RlZmVyJywgJ25vbW9kdWxlJ107XG4gICAgcmV0dXJuIGJvb2xlYW5BdHRyaWJ1dGVzLmluY2x1ZGVzKGF0dHJOYW1lKTtcbiAgfVxuICBmdW5jdGlvbiByZXBsYWNlQXRBbmRDb2xvbldpdGhTdGFuZGFyZFN5bnRheChuYW1lKSB7XG4gICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKCdAJywgJ3gtb246Jyk7XG4gICAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgcmV0dXJuIG5hbWUucmVwbGFjZSgnOicsICd4LWJpbmQ6Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgZnVuY3Rpb24gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShjbGFzc0xpc3QsIGZpbHRlckZuID0gQm9vbGVhbikge1xuICAgIHJldHVybiBjbGFzc0xpc3Quc3BsaXQoJyAnKS5maWx0ZXIoZmlsdGVyRm4pO1xuICB9XG4gIGNvbnN0IFRSQU5TSVRJT05fVFlQRV9JTiA9ICdpbic7XG4gIGNvbnN0IFRSQU5TSVRJT05fVFlQRV9PVVQgPSAnb3V0JztcbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkluKGVsLCBzaG93LCBjb21wb25lbnQsIGZvcmNlU2tpcCA9IGZhbHNlKSB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB0cmFuc2l0aW9uIG9uIHRoZSBpbml0aWFsIHBhZ2UgbG9hZC5cbiAgICBpZiAoZm9yY2VTa2lwKSByZXR1cm4gc2hvdygpO1xuXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uICYmIGVsLl9feF90cmFuc2l0aW9uLnR5cGUgPT09IFRSQU5TSVRJT05fVFlQRV9JTikge1xuICAgICAgLy8gdGhlcmUgaXMgYWxyZWFkeSBhIHNpbWlsYXIgdHJhbnNpdGlvbiBnb2luZyBvbiwgdGhpcyB3YXMgcHJvYmFibHkgdHJpZ2dlcmVkIGJ5XG4gICAgICAvLyBhIGNoYW5nZSBpbiBhIGRpZmZlcmVudCBwcm9wZXJ0eSwgbGV0J3MganVzdCBsZWF2ZSB0aGUgcHJldmlvdXMgb25lIGRvaW5nIGl0cyBqb2JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhdHRycyA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAndHJhbnNpdGlvbicpO1xuICAgIGNvbnN0IHNob3dBdHRyID0gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsICdzaG93JylbMF07IC8vIElmIHRoaXMgaXMgdHJpZ2dlcmVkIGJ5IGEgeC1zaG93LnRyYW5zaXRpb24uXG5cbiAgICBpZiAoc2hvd0F0dHIgJiYgc2hvd0F0dHIubW9kaWZpZXJzLmluY2x1ZGVzKCd0cmFuc2l0aW9uJykpIHtcbiAgICAgIGxldCBtb2RpZmllcnMgPSBzaG93QXR0ci5tb2RpZmllcnM7IC8vIElmIHgtc2hvdy50cmFuc2l0aW9uLm91dCwgd2UnbGwgc2tpcCB0aGUgXCJpblwiIHRyYW5zaXRpb24uXG5cbiAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ291dCcpICYmICFtb2RpZmllcnMuaW5jbHVkZXMoJ2luJykpIHJldHVybiBzaG93KCk7XG4gICAgICBjb25zdCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uID0gbW9kaWZpZXJzLmluY2x1ZGVzKCdpbicpICYmIG1vZGlmaWVycy5pbmNsdWRlcygnb3V0Jyk7IC8vIElmIHgtc2hvdy50cmFuc2l0aW9uLmluLi4ub3V0Li4uIG9ubHkgdXNlIFwiaW5cIiByZWxhdGVkIG1vZGlmaWVycyBmb3IgdGhpcyB0cmFuc2l0aW9uLlxuXG4gICAgICBtb2RpZmllcnMgPSBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uID8gbW9kaWZpZXJzLmZpbHRlcigoaSwgaW5kZXgpID0+IGluZGV4IDwgbW9kaWZpZXJzLmluZGV4T2YoJ291dCcpKSA6IG1vZGlmaWVycztcbiAgICAgIHRyYW5zaXRpb25IZWxwZXJJbihlbCwgbW9kaWZpZXJzLCBzaG93KTsgLy8gT3RoZXJ3aXNlLCB3ZSBjYW4gYXNzdW1lIHgtdHJhbnNpdGlvbjplbnRlci5cbiAgICB9IGVsc2UgaWYgKGF0dHJzLnNvbWUoYXR0ciA9PiBbJ2VudGVyJywgJ2VudGVyLXN0YXJ0JywgJ2VudGVyLWVuZCddLmluY2x1ZGVzKGF0dHIudmFsdWUpKSkge1xuICAgICAgdHJhbnNpdGlvbkNsYXNzZXNJbihlbCwgY29tcG9uZW50LCBhdHRycywgc2hvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIG5laXRoZXIsIGp1c3Qgc2hvdyB0aGF0IGRhbW4gdGhpbmcuXG4gICAgICBzaG93KCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25PdXQoZWwsIGhpZGUsIGNvbXBvbmVudCwgZm9yY2VTa2lwID0gZmFsc2UpIHtcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHRyYW5zaXRpb24gb24gdGhlIGluaXRpYWwgcGFnZSBsb2FkLlxuICAgIGlmIChmb3JjZVNraXApIHJldHVybiBoaWRlKCk7XG5cbiAgICBpZiAoZWwuX194X3RyYW5zaXRpb24gJiYgZWwuX194X3RyYW5zaXRpb24udHlwZSA9PT0gVFJBTlNJVElPTl9UWVBFX09VVCkge1xuICAgICAgLy8gdGhlcmUgaXMgYWxyZWFkeSBhIHNpbWlsYXIgdHJhbnNpdGlvbiBnb2luZyBvbiwgdGhpcyB3YXMgcHJvYmFibHkgdHJpZ2dlcmVkIGJ5XG4gICAgICAvLyBhIGNoYW5nZSBpbiBhIGRpZmZlcmVudCBwcm9wZXJ0eSwgbGV0J3MganVzdCBsZWF2ZSB0aGUgcHJldmlvdXMgb25lIGRvaW5nIGl0cyBqb2JcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhdHRycyA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAndHJhbnNpdGlvbicpO1xuICAgIGNvbnN0IHNob3dBdHRyID0gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsICdzaG93JylbMF07XG5cbiAgICBpZiAoc2hvd0F0dHIgJiYgc2hvd0F0dHIubW9kaWZpZXJzLmluY2x1ZGVzKCd0cmFuc2l0aW9uJykpIHtcbiAgICAgIGxldCBtb2RpZmllcnMgPSBzaG93QXR0ci5tb2RpZmllcnM7XG4gICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdpbicpICYmICFtb2RpZmllcnMuaW5jbHVkZXMoJ291dCcpKSByZXR1cm4gaGlkZSgpO1xuICAgICAgY29uc3Qgc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA9IG1vZGlmaWVycy5pbmNsdWRlcygnaW4nKSAmJiBtb2RpZmllcnMuaW5jbHVkZXMoJ291dCcpO1xuICAgICAgbW9kaWZpZXJzID0gc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA/IG1vZGlmaWVycy5maWx0ZXIoKGksIGluZGV4KSA9PiBpbmRleCA+IG1vZGlmaWVycy5pbmRleE9mKCdvdXQnKSkgOiBtb2RpZmllcnM7XG4gICAgICB0cmFuc2l0aW9uSGVscGVyT3V0KGVsLCBtb2RpZmllcnMsIHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24sIGhpZGUpO1xuICAgIH0gZWxzZSBpZiAoYXR0cnMuc29tZShhdHRyID0+IFsnbGVhdmUnLCAnbGVhdmUtc3RhcnQnLCAnbGVhdmUtZW5kJ10uaW5jbHVkZXMoYXR0ci52YWx1ZSkpKSB7XG4gICAgICB0cmFuc2l0aW9uQ2xhc3Nlc091dChlbCwgY29tcG9uZW50LCBhdHRycywgaGlkZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlckluKGVsLCBtb2RpZmllcnMsIHNob3dDYWxsYmFjaykge1xuICAgIC8vIERlZmF1bHQgdmFsdWVzIGluc3BpcmVkIGJ5OiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9tb3Rpb24vc3BlZWQuaHRtbCNkdXJhdGlvblxuICAgIGNvbnN0IHN0eWxlVmFsdWVzID0ge1xuICAgICAgZHVyYXRpb246IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnZHVyYXRpb24nLCAxNTApLFxuICAgICAgb3JpZ2luOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ29yaWdpbicsICdjZW50ZXInKSxcbiAgICAgIGZpcnN0OiB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHNjYWxlOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ3NjYWxlJywgOTUpXG4gICAgICB9LFxuICAgICAgc2Vjb25kOiB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHNjYWxlOiAxMDBcbiAgICAgIH1cbiAgICB9O1xuICAgIHRyYW5zaXRpb25IZWxwZXIoZWwsIG1vZGlmaWVycywgc2hvd0NhbGxiYWNrLCAoKSA9PiB7fSwgc3R5bGVWYWx1ZXMsIFRSQU5TSVRJT05fVFlQRV9JTik7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlck91dChlbCwgbW9kaWZpZXJzLCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uLCBoaWRlQ2FsbGJhY2spIHtcbiAgICAvLyBNYWtlIHRoZSBcIm91dFwiIHRyYW5zaXRpb24gLjV4IHNsb3dlciB0aGFuIHRoZSBcImluXCIuIChWaXN1YWxseSBiZXR0ZXIpXG4gICAgLy8gSE9XRVZFUiwgaWYgdGhleSBleHBsaWNpdGx5IHNldCBhIGR1cmF0aW9uIGZvciB0aGUgXCJvdXRcIiB0cmFuc2l0aW9uLFxuICAgIC8vIHVzZSB0aGF0LlxuICAgIGNvbnN0IGR1cmF0aW9uID0gc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA/IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnZHVyYXRpb24nLCAxNTApIDogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdkdXJhdGlvbicsIDE1MCkgLyAyO1xuICAgIGNvbnN0IHN0eWxlVmFsdWVzID0ge1xuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgb3JpZ2luOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ29yaWdpbicsICdjZW50ZXInKSxcbiAgICAgIGZpcnN0OiB7XG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHNjYWxlOiAxMDBcbiAgICAgIH0sXG4gICAgICBzZWNvbmQ6IHtcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgc2NhbGU6IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnc2NhbGUnLCA5NSlcbiAgICAgIH1cbiAgICB9O1xuICAgIHRyYW5zaXRpb25IZWxwZXIoZWwsIG1vZGlmaWVycywgKCkgPT4ge30sIGhpZGVDYWxsYmFjaywgc3R5bGVWYWx1ZXMsIFRSQU5TSVRJT05fVFlQRV9PVVQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIGtleSwgZmFsbGJhY2spIHtcbiAgICAvLyBJZiB0aGUgbW9kaWZpZXIgaXNuJ3QgcHJlc2VudCwgdXNlIHRoZSBkZWZhdWx0LlxuICAgIGlmIChtb2RpZmllcnMuaW5kZXhPZihrZXkpID09PSAtMSkgcmV0dXJuIGZhbGxiYWNrOyAvLyBJZiBpdCBJUyBwcmVzZW50LCBncmFiIHRoZSB2YWx1ZSBhZnRlciBpdDogeC1zaG93LnRyYW5zaXRpb24uZHVyYXRpb24uNTAwbXNcblxuICAgIGNvbnN0IHJhd1ZhbHVlID0gbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKGtleSkgKyAxXTtcbiAgICBpZiAoIXJhd1ZhbHVlKSByZXR1cm4gZmFsbGJhY2s7XG5cbiAgICBpZiAoa2V5ID09PSAnc2NhbGUnKSB7XG4gICAgICAvLyBDaGVjayBpZiB0aGUgdmVyeSBuZXh0IHZhbHVlIGlzIE5PVCBhIG51bWJlciBhbmQgcmV0dXJuIHRoZSBmYWxsYmFjay5cbiAgICAgIC8vIElmIHgtc2hvdy50cmFuc2l0aW9uLnNjYWxlLCB3ZSdsbCB1c2UgdGhlIGRlZmF1bHQgc2NhbGUgdmFsdWUuXG4gICAgICAvLyBUaGF0IGlzIGhvdyBhIHVzZXIgb3B0cyBvdXQgb2YgdGhlIG9wYWNpdHkgdHJhbnNpdGlvbi5cbiAgICAgIGlmICghaXNOdW1lcmljKHJhd1ZhbHVlKSkgcmV0dXJuIGZhbGxiYWNrO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdkdXJhdGlvbicpIHtcbiAgICAgIC8vIFN1cHBvcnQgeC1zaG93LnRyYW5zaXRpb24uZHVyYXRpb24uNTAwbXMgJiYgZHVyYXRpb24uNTAwXG4gICAgICBsZXQgbWF0Y2ggPSByYXdWYWx1ZS5tYXRjaCgvKFswLTldKyltcy8pO1xuICAgICAgaWYgKG1hdGNoKSByZXR1cm4gbWF0Y2hbMV07XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ29yaWdpbicpIHtcbiAgICAgIC8vIFN1cHBvcnQgY2hhaW5pbmcgb3JpZ2luIGRpcmVjdGlvbnM6IHgtc2hvdy50cmFuc2l0aW9uLnRvcC5yaWdodFxuICAgICAgaWYgKFsndG9wJywgJ3JpZ2h0JywgJ2xlZnQnLCAnY2VudGVyJywgJ2JvdHRvbSddLmluY2x1ZGVzKG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMl0pKSB7XG4gICAgICAgIHJldHVybiBbcmF3VmFsdWUsIG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMl1dLmpvaW4oJyAnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmF3VmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uSGVscGVyKGVsLCBtb2RpZmllcnMsIGhvb2sxLCBob29rMiwgc3R5bGVWYWx1ZXMsIHR5cGUpIHtcbiAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgdHJhbnNpdGlvbiBpZiBleGlzdHMgdG8gYXZvaWQgY2FjaGluZyB0aGUgd3Jvbmcgc3R5bGVzXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShlbC5fX3hfdHJhbnNpdGlvbi5uZXh0RnJhbWUpO1xuICAgICAgZWwuX194X3RyYW5zaXRpb24uY2FsbGJhY2sgJiYgZWwuX194X3RyYW5zaXRpb24uY2FsbGJhY2soKTtcbiAgICB9IC8vIElmIHRoZSB1c2VyIHNldCB0aGVzZSBzdHlsZSB2YWx1ZXMsIHdlJ2xsIHB1dCB0aGVtIGJhY2sgd2hlbiB3ZSdyZSBkb25lIHdpdGggdGhlbS5cblxuXG4gICAgY29uc3Qgb3BhY2l0eUNhY2hlID0gZWwuc3R5bGUub3BhY2l0eTtcbiAgICBjb25zdCB0cmFuc2Zvcm1DYWNoZSA9IGVsLnN0eWxlLnRyYW5zZm9ybTtcbiAgICBjb25zdCB0cmFuc2Zvcm1PcmlnaW5DYWNoZSA9IGVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbjsgLy8gSWYgbm8gbW9kaWZpZXJzIGFyZSBwcmVzZW50OiB4LXNob3cudHJhbnNpdGlvbiwgd2UnbGwgZGVmYXVsdCB0byBib3RoIG9wYWNpdHkgYW5kIHNjYWxlLlxuXG4gICAgY29uc3Qgbm9Nb2RpZmllcnMgPSAhbW9kaWZpZXJzLmluY2x1ZGVzKCdvcGFjaXR5JykgJiYgIW1vZGlmaWVycy5pbmNsdWRlcygnc2NhbGUnKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uT3BhY2l0eSA9IG5vTW9kaWZpZXJzIHx8IG1vZGlmaWVycy5pbmNsdWRlcygnb3BhY2l0eScpO1xuICAgIGNvbnN0IHRyYW5zaXRpb25TY2FsZSA9IG5vTW9kaWZpZXJzIHx8IG1vZGlmaWVycy5pbmNsdWRlcygnc2NhbGUnKTsgLy8gVGhlc2UgYXJlIHRoZSBleHBsaWNpdCBzdGFnZXMgb2YgYSB0cmFuc2l0aW9uIChzYW1lIHN0YWdlcyBmb3IgaW4gYW5kIGZvciBvdXQpLlxuICAgIC8vIFRoaXMgd2F5IHlvdSBjYW4gZ2V0IGEgYmlyZHMgZXllIHZpZXcgb2YgdGhlIGhvb2tzLCBhbmQgdGhlIGRpZmZlcmVuY2VzXG4gICAgLy8gYmV0d2VlbiB0aGVtLlxuXG4gICAgY29uc3Qgc3RhZ2VzID0ge1xuICAgICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uT3BhY2l0eSkgZWwuc3R5bGUub3BhY2l0eSA9IHN0eWxlVmFsdWVzLmZpcnN0Lm9wYWNpdHk7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uU2NhbGUpIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3N0eWxlVmFsdWVzLmZpcnN0LnNjYWxlIC8gMTAwfSlgO1xuICAgICAgfSxcblxuICAgICAgZHVyaW5nKCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBzdHlsZVZhbHVlcy5vcmlnaW47XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IFt0cmFuc2l0aW9uT3BhY2l0eSA/IGBvcGFjaXR5YCA6IGBgLCB0cmFuc2l0aW9uU2NhbGUgPyBgdHJhbnNmb3JtYCA6IGBgXS5qb2luKCcgJykudHJpbSgpO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtzdHlsZVZhbHVlcy5kdXJhdGlvbiAvIDEwMDB9c2A7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IGBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSlgO1xuICAgICAgfSxcblxuICAgICAgc2hvdygpIHtcbiAgICAgICAgaG9vazEoKTtcbiAgICAgIH0sXG5cbiAgICAgIGVuZCgpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25PcGFjaXR5KSBlbC5zdHlsZS5vcGFjaXR5ID0gc3R5bGVWYWx1ZXMuc2Vjb25kLm9wYWNpdHk7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uU2NhbGUpIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3N0eWxlVmFsdWVzLnNlY29uZC5zY2FsZSAvIDEwMH0pYDtcbiAgICAgIH0sXG5cbiAgICAgIGhpZGUoKSB7XG4gICAgICAgIGhvb2syKCk7XG4gICAgICB9LFxuXG4gICAgICBjbGVhbnVwKCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbk9wYWNpdHkpIGVsLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5Q2FjaGU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uU2NhbGUpIGVsLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybUNhY2hlO1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSB0cmFuc2Zvcm1PcmlnaW5DYWNoZTtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvblByb3BlcnR5ID0gbnVsbDtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gbnVsbDtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH07XG4gICAgdHJhbnNpdGlvbihlbCwgc3RhZ2VzLCB0eXBlKTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uQ2xhc3Nlc0luKGVsLCBjb21wb25lbnQsIGRpcmVjdGl2ZXMsIHNob3dDYWxsYmFjaykge1xuICAgIGxldCBlbnN1cmVTdHJpbmdFeHByZXNzaW9uID0gZXhwcmVzc2lvbiA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIGV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicgPyBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uKSA6IGV4cHJlc3Npb247XG4gICAgfTtcblxuICAgIGNvbnN0IGVudGVyID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnZW50ZXInKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24pKTtcbiAgICBjb25zdCBlbnRlclN0YXJ0ID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnZW50ZXItc3RhcnQnKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24pKTtcbiAgICBjb25zdCBlbnRlckVuZCA9IGNvbnZlcnRDbGFzc1N0cmluZ1RvQXJyYXkoZW5zdXJlU3RyaW5nRXhwcmVzc2lvbigoZGlyZWN0aXZlcy5maW5kKGkgPT4gaS52YWx1ZSA9PT0gJ2VudGVyLWVuZCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbikpO1xuICAgIHRyYW5zaXRpb25DbGFzc2VzKGVsLCBlbnRlciwgZW50ZXJTdGFydCwgZW50ZXJFbmQsIHNob3dDYWxsYmFjaywgKCkgPT4ge30sIFRSQU5TSVRJT05fVFlQRV9JTik7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkNsYXNzZXNPdXQoZWwsIGNvbXBvbmVudCwgZGlyZWN0aXZlcywgaGlkZUNhbGxiYWNrKSB7XG4gICAgY29uc3QgbGVhdmUgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnbGVhdmUnKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24pO1xuICAgIGNvbnN0IGxlYXZlU3RhcnQgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnbGVhdmUtc3RhcnQnKSB8fCB7XG4gICAgICBleHByZXNzaW9uOiAnJ1xuICAgIH0pLmV4cHJlc3Npb24pO1xuICAgIGNvbnN0IGxlYXZlRW5kID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheSgoZGlyZWN0aXZlcy5maW5kKGkgPT4gaS52YWx1ZSA9PT0gJ2xlYXZlLWVuZCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbik7XG4gICAgdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGxlYXZlLCBsZWF2ZVN0YXJ0LCBsZWF2ZUVuZCwgKCkgPT4ge30sIGhpZGVDYWxsYmFjaywgVFJBTlNJVElPTl9UWVBFX09VVCk7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGNsYXNzZXNEdXJpbmcsIGNsYXNzZXNTdGFydCwgY2xhc3Nlc0VuZCwgaG9vazEsIGhvb2syLCB0eXBlKSB7XG4gICAgLy8gY2xlYXIgdGhlIHByZXZpb3VzIHRyYW5zaXRpb24gaWYgZXhpc3RzIHRvIGF2b2lkIGNhY2hpbmcgdGhlIHdyb25nIGNsYXNzZXNcbiAgICBpZiAoZWwuX194X3RyYW5zaXRpb24pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGVsLl9feF90cmFuc2l0aW9uLm5leHRGcmFtZSk7XG4gICAgICBlbC5fX3hfdHJhbnNpdGlvbi5jYWxsYmFjayAmJiBlbC5fX3hfdHJhbnNpdGlvbi5jYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGNvbnN0IG9yaWdpbmFsQ2xhc3NlcyA9IGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzIHx8IFtdO1xuICAgIGNvbnN0IHN0YWdlcyA9IHtcbiAgICAgIHN0YXJ0KCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXNTdGFydCk7XG4gICAgICB9LFxuXG4gICAgICBkdXJpbmcoKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc0R1cmluZyk7XG4gICAgICB9LFxuXG4gICAgICBzaG93KCkge1xuICAgICAgICBob29rMSgpO1xuICAgICAgfSxcblxuICAgICAgZW5kKCkge1xuICAgICAgICAvLyBEb24ndCByZW1vdmUgY2xhc3NlcyB0aGF0IHdlcmUgaW4gdGhlIG9yaWdpbmFsIGNsYXNzIGF0dHJpYnV0ZS5cbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzU3RhcnQuZmlsdGVyKGkgPT4gIW9yaWdpbmFsQ2xhc3Nlcy5pbmNsdWRlcyhpKSkpO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXNFbmQpO1xuICAgICAgfSxcblxuICAgICAgaGlkZSgpIHtcbiAgICAgICAgaG9vazIoKTtcbiAgICAgIH0sXG5cbiAgICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc0R1cmluZy5maWx0ZXIoaSA9PiAhb3JpZ2luYWxDbGFzc2VzLmluY2x1ZGVzKGkpKSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc0VuZC5maWx0ZXIoaSA9PiAhb3JpZ2luYWxDbGFzc2VzLmluY2x1ZGVzKGkpKSk7XG4gICAgICB9XG5cbiAgICB9O1xuICAgIHRyYW5zaXRpb24oZWwsIHN0YWdlcywgdHlwZSk7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbihlbCwgc3RhZ2VzLCB0eXBlKSB7XG4gICAgZWwuX194X3RyYW5zaXRpb24gPSB7XG4gICAgICAvLyBTZXQgdHJhbnNpdGlvbiB0eXBlIHNvIHdlIGNhbiBhdm9pZCBjbGVhcmluZyB0cmFuc2l0aW9uIGlmIHRoZSBkaXJlY3Rpb24gaXMgdGhlIHNhbWVcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAvLyBjcmVhdGUgYSBjYWxsYmFjayBmb3IgdGhlIGxhc3Qgc3RhZ2VzIG9mIHRoZSB0cmFuc2l0aW9uIHNvIHdlIGNhbiBjYWxsIGl0XG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBwb2ludCBhbmQgZWFybHkgdGVybWluYXRlIGl0LiBPbmNlIHdpbGwgZW5zdXJlIHRoYXQgZnVuY3Rpb25cbiAgICAgIC8vIGlzIG9ubHkgY2FsbGVkIG9uZSB0aW1lLlxuICAgICAgY2FsbGJhY2s6IG9uY2UoKCkgPT4ge1xuICAgICAgICBzdGFnZXMuaGlkZSgpOyAvLyBBZGRpbmcgYW4gXCJpc0Nvbm5lY3RlZFwiIGNoZWNrLCBpbiBjYXNlIHRoZSBjYWxsYmFja1xuICAgICAgICAvLyByZW1vdmVkIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTS5cblxuICAgICAgICBpZiAoZWwuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICBzdGFnZXMuY2xlYW51cCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGVsLl9feF90cmFuc2l0aW9uO1xuICAgICAgfSksXG4gICAgICAvLyBUaGlzIHN0b3JlIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZSBzbyB3ZSBjYW4gY2FuY2VsIGl0XG4gICAgICBuZXh0RnJhbWU6IG51bGxcbiAgICB9O1xuICAgIHN0YWdlcy5zdGFydCgpO1xuICAgIHN0YWdlcy5kdXJpbmcoKTtcbiAgICBlbC5fX3hfdHJhbnNpdGlvbi5uZXh0RnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gTm90ZTogU2FmYXJpJ3MgdHJhbnNpdGlvbkR1cmF0aW9uIHByb3BlcnR5IHdpbGwgbGlzdCBvdXQgY29tbWEgc2VwYXJhdGVkIHRyYW5zaXRpb24gZHVyYXRpb25zXG4gICAgICAvLyBmb3IgZXZlcnkgc2luZ2xlIHRyYW5zaXRpb24gcHJvcGVydHkuIExldCdzIGdyYWIgdGhlIGZpcnN0IG9uZSBhbmQgY2FsbCBpdCBhIGRheS5cbiAgICAgIGxldCBkdXJhdGlvbiA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRHVyYXRpb24ucmVwbGFjZSgvLC4qLywgJycpLnJlcGxhY2UoJ3MnLCAnJykpICogMTAwMDtcblxuICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSB7XG4gICAgICAgIGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLmFuaW1hdGlvbkR1cmF0aW9uLnJlcGxhY2UoJ3MnLCAnJykpICogMTAwMDtcbiAgICAgIH1cblxuICAgICAgc3RhZ2VzLnNob3coKTtcbiAgICAgIGVsLl9feF90cmFuc2l0aW9uLm5leHRGcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHN0YWdlcy5lbmQoKTtcbiAgICAgICAgc2V0VGltZW91dChlbC5fX3hfdHJhbnNpdGlvbi5jYWxsYmFjaywgZHVyYXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1lcmljKHN1YmplY3QpIHtcbiAgICByZXR1cm4gIWlzTmFOKHN1YmplY3QpO1xuICB9IC8vIFRoYW5rcyBAdnVlanNcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS9ibG9iLzRkZTQ2NDlkOTYzNzI2MmE5YjAwNzcyMGI1OWY4MGFjNzJhNTYyMGMvc3JjL3NoYXJlZC91dGlsLmpzXG5cbiAgZnVuY3Rpb24gb25jZShjYWxsYmFjaykge1xuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRm9yRGlyZWN0aXZlKGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgZXhwcmVzc2lvbiwgaW5pdGlhbFVwZGF0ZSwgZXh0cmFWYXJzKSB7XG4gICAgd2FybklmTWFsZm9ybWVkVGVtcGxhdGUodGVtcGxhdGVFbCwgJ3gtZm9yJyk7XG4gICAgbGV0IGl0ZXJhdG9yTmFtZXMgPSB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnNlRm9yRXhwcmVzc2lvbihjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKHRlbXBsYXRlRWwsIGV4cHJlc3Npb24pKSA6IHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICBsZXQgaXRlbXMgPSBldmFsdWF0ZUl0ZW1zQW5kUmV0dXJuRW1wdHlJZlhJZklzUHJlc2VudEFuZEZhbHNlT25FbGVtZW50KGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgaXRlcmF0b3JOYW1lcywgZXh0cmFWYXJzKTsgLy8gQXMgd2Ugd2FsayB0aGUgYXJyYXksIHdlJ2xsIGFsc28gd2FsayB0aGUgRE9NICh1cGRhdGluZy9jcmVhdGluZyBhcyB3ZSBnbykuXG5cbiAgICBsZXQgY3VycmVudEVsID0gdGVtcGxhdGVFbDtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzID0gZ2V0SXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMoaXRlcmF0b3JOYW1lcywgaXRlbSwgaW5kZXgsIGl0ZW1zLCBleHRyYVZhcnMoKSk7XG4gICAgICBsZXQgY3VycmVudEtleSA9IGdlbmVyYXRlS2V5Rm9ySXRlcmF0aW9uKGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgaW5kZXgsIGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKTtcbiAgICAgIGxldCBuZXh0RWwgPSBsb29rQWhlYWRGb3JNYXRjaGluZ0tleWVkRWxlbWVudEFuZE1vdmVJdElmRm91bmQoY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZywgY3VycmVudEtleSk7IC8vIElmIHdlIGhhdmVuJ3QgZm91bmQgYSBtYXRjaGluZyBrZXksIGluc2VydCB0aGUgZWxlbWVudCBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cblxuICAgICAgaWYgKCFuZXh0RWwpIHtcbiAgICAgICAgbmV4dEVsID0gYWRkRWxlbWVudEluTG9vcEFmdGVyQ3VycmVudEVsKHRlbXBsYXRlRWwsIGN1cnJlbnRFbCk7IC8vIEFuZCB0cmFuc2l0aW9uIGl0IGluIGlmIGl0J3Mgbm90IHRoZSBmaXJzdCBwYWdlIGxvYWQuXG5cbiAgICAgICAgdHJhbnNpdGlvbkluKG5leHRFbCwgKCkgPT4ge30sIGNvbXBvbmVudCwgaW5pdGlhbFVwZGF0ZSk7XG4gICAgICAgIG5leHRFbC5fX3hfZm9yID0gaXRlcmF0aW9uU2NvcGVWYXJpYWJsZXM7XG4gICAgICAgIGNvbXBvbmVudC5pbml0aWFsaXplRWxlbWVudHMobmV4dEVsLCAoKSA9PiBuZXh0RWwuX194X2Zvcik7IC8vIE90aGVyd2lzZSB1cGRhdGUgdGhlIGVsZW1lbnQgd2UgZm91bmQuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUZW1wb3JhcmlseSByZW1vdmUgdGhlIGtleSBpbmRpY2F0b3IgdG8gYWxsb3cgdGhlIG5vcm1hbCBcInVwZGF0ZUVsZW1lbnRzXCIgdG8gd29yay5cbiAgICAgICAgZGVsZXRlIG5leHRFbC5fX3hfZm9yX2tleTtcbiAgICAgICAgbmV4dEVsLl9feF9mb3IgPSBpdGVyYXRpb25TY29wZVZhcmlhYmxlcztcbiAgICAgICAgY29tcG9uZW50LnVwZGF0ZUVsZW1lbnRzKG5leHRFbCwgKCkgPT4gbmV4dEVsLl9feF9mb3IpO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50RWwgPSBuZXh0RWw7XG4gICAgICBjdXJyZW50RWwuX194X2Zvcl9rZXkgPSBjdXJyZW50S2V5O1xuICAgIH0pO1xuICAgIHJlbW92ZUFueUxlZnRPdmVyRWxlbWVudHNGcm9tUHJldmlvdXNVcGRhdGUoY3VycmVudEVsLCBjb21wb25lbnQpO1xuICB9IC8vIFRoaXMgd2FzIHRha2VuIGZyb20gVnVlSlMgMi4qIGNvcmUuIFRoYW5rcyBWdWUhXG5cbiAgZnVuY3Rpb24gcGFyc2VGb3JFeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcbiAgICBsZXQgZm9ySXRlcmF0b3JSRSA9IC8sKFteLFxcfVxcXV0qKSg/OiwoW14sXFx9XFxdXSopKT8kLztcbiAgICBsZXQgc3RyaXBQYXJlbnNSRSA9IC9eXFwofFxcKSQvZztcbiAgICBsZXQgZm9yQWxpYXNSRSA9IC8oW1xcc1xcU10qPylcXHMrKD86aW58b2YpXFxzKyhbXFxzXFxTXSopLztcbiAgICBsZXQgaW5NYXRjaCA9IGV4cHJlc3Npb24ubWF0Y2goZm9yQWxpYXNSRSk7XG4gICAgaWYgKCFpbk1hdGNoKSByZXR1cm47XG4gICAgbGV0IHJlcyA9IHt9O1xuICAgIHJlcy5pdGVtcyA9IGluTWF0Y2hbMl0udHJpbSgpO1xuICAgIGxldCBpdGVtID0gaW5NYXRjaFsxXS50cmltKCkucmVwbGFjZShzdHJpcFBhcmVuc1JFLCAnJyk7XG4gICAgbGV0IGl0ZXJhdG9yTWF0Y2ggPSBpdGVtLm1hdGNoKGZvckl0ZXJhdG9yUkUpO1xuXG4gICAgaWYgKGl0ZXJhdG9yTWF0Y2gpIHtcbiAgICAgIHJlcy5pdGVtID0gaXRlbS5yZXBsYWNlKGZvckl0ZXJhdG9yUkUsICcnKS50cmltKCk7XG4gICAgICByZXMuaW5kZXggPSBpdGVyYXRvck1hdGNoWzFdLnRyaW0oKTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWF0Y2hbMl0pIHtcbiAgICAgICAgcmVzLmNvbGxlY3Rpb24gPSBpdGVyYXRvck1hdGNoWzJdLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLml0ZW0gPSBpdGVtO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtLCBpbmRleCwgaXRlbXMsIGV4dHJhVmFycykge1xuICAgIC8vIFdlIG11c3QgY3JlYXRlIGEgbmV3IG9iamVjdCwgc28gZWFjaCBpdGVyYXRpb24gaGFzIGEgbmV3IHNjb3BlXG4gICAgbGV0IHNjb3BlVmFyaWFibGVzID0gZXh0cmFWYXJzID8gX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycykgOiB7fTtcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLml0ZW1dID0gaXRlbTtcbiAgICBpZiAoaXRlcmF0b3JOYW1lcy5pbmRleCkgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pbmRleF0gPSBpbmRleDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lcy5jb2xsZWN0aW9uKSBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb25dID0gaXRlbXM7XG4gICAgcmV0dXJuIHNjb3BlVmFyaWFibGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlGb3JJdGVyYXRpb24oY29tcG9uZW50LCBlbCwgaW5kZXgsIGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKSB7XG4gICAgbGV0IGJpbmRLZXlBdHRyaWJ1dGUgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ2JpbmQnKS5maWx0ZXIoYXR0ciA9PiBhdHRyLnZhbHVlID09PSAna2V5JylbMF07IC8vIElmIHRoZSBkZXYgaGFzbid0IHNwZWNpZmllZCBhIGtleSwganVzdCByZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBpdGVyYXRpb24uXG5cbiAgICBpZiAoIWJpbmRLZXlBdHRyaWJ1dGUpIHJldHVybiBpbmRleDtcbiAgICByZXR1cm4gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgYmluZEtleUF0dHJpYnV0ZS5leHByZXNzaW9uLCAoKSA9PiBpdGVyYXRpb25TY29wZVZhcmlhYmxlcyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmFsdWF0ZUl0ZW1zQW5kUmV0dXJuRW1wdHlJZlhJZklzUHJlc2VudEFuZEZhbHNlT25FbGVtZW50KGNvbXBvbmVudCwgZWwsIGl0ZXJhdG9yTmFtZXMsIGV4dHJhVmFycykge1xuICAgIGxldCBpZkF0dHJpYnV0ZSA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnaWYnKVswXTtcblxuICAgIGlmIChpZkF0dHJpYnV0ZSAmJiAhY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgaWZBdHRyaWJ1dGUuZXhwcmVzc2lvbikpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IC8vIFRoaXMgYWRkcyBzdXBwb3J0IGZvciB0aGUgYGkgaW4gbmAgc3ludGF4LlxuXG5cbiAgICBpZiAoaXNOdW1lcmljKGl0ZXJhdG9yTmFtZXMuaXRlbXMpKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShBcnJheShwYXJzZUludChpdGVyYXRvck5hbWVzLml0ZW1zLCAxMCkpLmtleXMoKSwgaSA9PiBpICsgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudC5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24oZWwsIGl0ZXJhdG9yTmFtZXMuaXRlbXMsIGV4dHJhVmFycyk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRFbGVtZW50SW5Mb29wQWZ0ZXJDdXJyZW50RWwodGVtcGxhdGVFbCwgY3VycmVudEVsKSB7XG4gICAgbGV0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUVsLmNvbnRlbnQsIHRydWUpO1xuICAgIGN1cnJlbnRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjbG9uZSwgY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgcmV0dXJuIGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBsb29rQWhlYWRGb3JNYXRjaGluZ0tleWVkRWxlbWVudEFuZE1vdmVJdElmRm91bmQobmV4dEVsLCBjdXJyZW50S2V5KSB7XG4gICAgaWYgKCFuZXh0RWwpIHJldHVybjsgLy8gSWYgdGhlIHRoZSBrZXkncyBETyBtYXRjaCwgbm8gbmVlZCB0byBsb29rIGFoZWFkLlxuXG4gICAgaWYgKG5leHRFbC5fX3hfZm9yX2tleSA9PT0gY3VycmVudEtleSkgcmV0dXJuIG5leHRFbDsgLy8gSWYgdGhleSBkb24ndCwgd2UnbGwgbG9vayBhaGVhZCBmb3IgYSBtYXRjaC5cbiAgICAvLyBJZiB3ZSBmaW5kIGl0LCB3ZSdsbCBtb3ZlIGl0IHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGluIHRoZSBsb29wLlxuXG4gICAgbGV0IHRtcE5leHRFbCA9IG5leHRFbDtcblxuICAgIHdoaWxlICh0bXBOZXh0RWwpIHtcbiAgICAgIGlmICh0bXBOZXh0RWwuX194X2Zvcl9rZXkgPT09IGN1cnJlbnRLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRtcE5leHRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh0bXBOZXh0RWwsIG5leHRFbCk7XG4gICAgICB9XG5cbiAgICAgIHRtcE5leHRFbCA9IHRtcE5leHRFbC5uZXh0RWxlbWVudFNpYmxpbmcgJiYgdG1wTmV4dEVsLm5leHRFbGVtZW50U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gdG1wTmV4dEVsLm5leHRFbGVtZW50U2libGluZyA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUFueUxlZnRPdmVyRWxlbWVudHNGcm9tUHJldmlvdXNVcGRhdGUoY3VycmVudEVsLCBjb21wb25lbnQpIHtcbiAgICB2YXIgbmV4dEVsZW1lbnRGcm9tT2xkTG9vcCA9IGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcgJiYgY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZyA6IGZhbHNlO1xuXG4gICAgd2hpbGUgKG5leHRFbGVtZW50RnJvbU9sZExvb3ApIHtcbiAgICAgIGxldCBuZXh0RWxlbWVudEZyb21PbGRMb29wSW1tdXRhYmxlID0gbmV4dEVsZW1lbnRGcm9tT2xkTG9vcDtcbiAgICAgIGxldCBuZXh0U2libGluZyA9IG5leHRFbGVtZW50RnJvbU9sZExvb3AubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgdHJhbnNpdGlvbk91dChuZXh0RWxlbWVudEZyb21PbGRMb29wLCAoKSA9PiB7XG4gICAgICAgIG5leHRFbGVtZW50RnJvbU9sZExvb3BJbW11dGFibGUucmVtb3ZlKCk7XG4gICAgICB9LCBjb21wb25lbnQpO1xuICAgICAgbmV4dEVsZW1lbnRGcm9tT2xkTG9vcCA9IG5leHRTaWJsaW5nICYmIG5leHRTaWJsaW5nLl9feF9mb3Jfa2V5ICE9PSB1bmRlZmluZWQgPyBuZXh0U2libGluZyA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUF0dHJpYnV0ZUJpbmRpbmdEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgYXR0ck5hbWUsIGV4cHJlc3Npb24sIGV4dHJhVmFycywgYXR0clR5cGUsIG1vZGlmaWVycykge1xuICAgIHZhciB2YWx1ZSA9IGNvbXBvbmVudC5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24oZWwsIGV4cHJlc3Npb24sIGV4dHJhVmFycyk7XG5cbiAgICBpZiAoYXR0ck5hbWUgPT09ICd2YWx1ZScpIHtcbiAgICAgIGlmIChBbHBpbmUuaWdub3JlRm9jdXNlZEZvclZhbHVlQmluZGluZyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlzU2FtZU5vZGUoZWwpKSByZXR1cm47IC8vIElmIG5lc3RlZCBtb2RlbCBrZXkgaXMgdW5kZWZpbmVkLCBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgdG8gZW1wdHkgc3RyaW5nLlxuXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBleHByZXNzaW9uLm1hdGNoKC9cXC4vKSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAvLyBTZXQgcmFkaW8gdmFsdWUgZnJvbSB4LWJpbmQ6dmFsdWUsIGlmIG5vIFwidmFsdWVcIiBhdHRyaWJ1dGUgZXhpc3RzLlxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGluaXRpYWwgc3RhdGUgdmFsdWVzLCByYWRpbyB3aWxsIGhhdmUgYSBjb3JyZWN0XG4gICAgICAgIC8vIFwiY2hlY2tlZFwiIHZhbHVlIHNpbmNlIHgtYmluZDp2YWx1ZSBpcyBwcm9jZXNzZWQgYmVmb3JlIHgtbW9kZWwuXG4gICAgICAgIGlmIChlbC5hdHRyaWJ1dGVzLnZhbHVlID09PSB1bmRlZmluZWQgJiYgYXR0clR5cGUgPT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0clR5cGUgIT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLmNoZWNrZWQgPSBlbC52YWx1ZSA9PSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBleHBsaWNpdGx5IGJpbmRpbmcgYSBzdHJpbmcgdG8gdGhlIDp2YWx1ZSwgc2V0IHRoZSBzdHJpbmcsXG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4sIGxlYXZlIGl0IGFsb25lLCBpdCB3aWxsIGJlIHNldCB0byBcIm9uXCJcbiAgICAgICAgLy8gYXV0b21hdGljYWxseS5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgYXR0clR5cGUgPT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0clR5cGUgIT09ICdiaW5kJykge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gSSdtIHB1cnBvc2VseSBub3QgdXNpbmcgQXJyYXkuaW5jbHVkZXMgaGVyZSBiZWNhdXNlIGl0J3NcbiAgICAgICAgICAgIC8vIHN0cmljdCwgYW5kIGJlY2F1c2Ugb2YgTnVtZXJpYy9TdHJpbmcgbWlzLWNhc3RpbmcsIElcbiAgICAgICAgICAgIC8vIHdhbnQgdGhlIFwiaW5jbHVkZXNcIiB0byBiZSBcImZ1enp5XCIuXG4gICAgICAgICAgICBlbC5jaGVja2VkID0gdmFsdWUuc29tZSh2YWwgPT4gdmFsID09IGVsLnZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdjbGFzcycpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbENsYXNzZXMgPSBlbC5fX3hfb3JpZ2luYWxfY2xhc3NlcyB8fCBbXTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGFycmF5VW5pcXVlKG9yaWdpbmFsQ2xhc3Nlcy5jb25jYXQodmFsdWUpKS5qb2luKCcgJykpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIFNvcnRpbmcgdGhlIGtleXMgLyBjbGFzcyBuYW1lcyBieSB0aGVpciBib29sZWFuIHZhbHVlIHdpbGwgZW5zdXJlIHRoYXRcbiAgICAgICAgLy8gYW55dGhpbmcgdGhhdCBldmFsdWF0ZXMgdG8gYGZhbHNlYCBhbmQgbmVlZHMgdG8gcmVtb3ZlIGNsYXNzZXMgaXMgcnVuIGZpcnN0LlxuICAgICAgICBjb25zdCBrZXlzU29ydGVkQnlCb29sZWFuVmFsdWUgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgoYSwgYikgPT4gdmFsdWVbYV0gLSB2YWx1ZVtiXSk7XG4gICAgICAgIGtleXNTb3J0ZWRCeUJvb2xlYW5WYWx1ZS5mb3JFYWNoKGNsYXNzTmFtZXMgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZVtjbGFzc05hbWVzXSkge1xuICAgICAgICAgICAgY29udmVydENsYXNzU3RyaW5nVG9BcnJheShjbGFzc05hbWVzKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGNsYXNzTmFtZXMpLmZvckVhY2goY2xhc3NOYW1lID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsQ2xhc3NlcyA9IGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzIHx8IFtdO1xuICAgICAgICBjb25zdCBuZXdDbGFzc2VzID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheSh2YWx1ZSk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBhcnJheVVuaXF1ZShvcmlnaW5hbENsYXNzZXMuY29uY2F0KG5ld0NsYXNzZXMpKS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyTmFtZSA9IG1vZGlmaWVycy5pbmNsdWRlcygnY2FtZWwnKSA/IGNhbWVsQ2FzZShhdHRyTmFtZSkgOiBhdHRyTmFtZTsgLy8gSWYgYW4gYXR0cmlidXRlJ3MgYm91bmQgdmFsdWUgaXMgbnVsbCwgdW5kZWZpbmVkIG9yIGZhbHNlLCByZW1vdmUgdGhlIGF0dHJpYnV0ZVxuXG4gICAgICBpZiAoW251bGwsIHVuZGVmaW5lZCwgZmFsc2VdLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNCb29sZWFuQXR0cihhdHRyTmFtZSkgPyBzZXRJZkNoYW5nZWQoZWwsIGF0dHJOYW1lLCBhdHRyTmFtZSkgOiBzZXRJZkNoYW5nZWQoZWwsIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSAhPSB2YWx1ZSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0KGVsLCB2YWx1ZSkge1xuICAgIGNvbnN0IGFycmF5V3JhcHBlZFZhbHVlID0gW10uY29uY2F0KHZhbHVlKS5tYXAodmFsdWUgPT4ge1xuICAgICAgcmV0dXJuIHZhbHVlICsgJyc7XG4gICAgfSk7XG4gICAgQXJyYXkuZnJvbShlbC5vcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSBhcnJheVdyYXBwZWRWYWx1ZS5pbmNsdWRlcyhvcHRpb24udmFsdWUgfHwgb3B0aW9uLnRleHQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVGV4dERpcmVjdGl2ZShlbCwgb3V0cHV0LCBleHByZXNzaW9uKSB7XG4gICAgLy8gSWYgbmVzdGVkIG1vZGVsIGtleSBpcyB1bmRlZmluZWQsIHNldCB0aGUgZGVmYXVsdCB2YWx1ZSB0byBlbXB0eSBzdHJpbmcuXG4gICAgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkICYmIGV4cHJlc3Npb24ubWF0Y2goL1xcLi8pKSB7XG4gICAgICBvdXRwdXQgPSAnJztcbiAgICB9XG5cbiAgICBlbC50ZXh0Q29udGVudCA9IG91dHB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUh0bWxEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNob3dEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgdmFsdWUsIG1vZGlmaWVycywgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGlkZSA9ICgpID0+IHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcblxuICAgIGNvbnN0IHNob3cgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwuc3R5bGUubGVuZ3RoID09PSAxICYmIGVsLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaW5pdGlhbFVwZGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZSA9IHJlc29sdmUgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHwgZWwuX194X3RyYW5zaXRpb24pIHtcbiAgICAgICAgICB0cmFuc2l0aW9uSW4oZWwsICgpID0+IHtcbiAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICB9LCBjb21wb25lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZSgoKSA9PiB7fSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbk91dChlbCwgKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIGNvbXBvbmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgoKSA9PiB7fSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9OyAvLyBUaGUgd29ya2luZyBvZiB4LXNob3cgaXMgYSBiaXQgY29tcGxleCBiZWNhdXNlIHdlIG5lZWQgdG9cbiAgICAvLyB3YWl0IGZvciBhbnkgY2hpbGQgdHJhbnNpdGlvbnMgdG8gZmluaXNoIGJlZm9yZSBoaWRpbmdcbiAgICAvLyBzb21lIGVsZW1lbnQuIEFsc28sIHRoaXMgaGFzIHRvIGJlIGRvbmUgcmVjdXJzaXZlbHkuXG4gICAgLy8gSWYgeC1zaG93LmltbWVkaWF0ZSwgZm9yZWdvZSB0aGUgd2FpdGluZy5cblxuXG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnaW1tZWRpYXRlJykpIHtcbiAgICAgIGhhbmRsZShmaW5pc2ggPT4gZmluaXNoKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8geC1zaG93IGlzIGVuY291bnRlcmVkIGR1cmluZyBhIERPTSB0cmVlIHdhbGsuIElmIGFuIGVsZW1lbnRcbiAgICAvLyB3ZSBlbmNvdW50ZXIgaXMgTk9UIGEgY2hpbGQgb2YgYW5vdGhlciB4LXNob3cgZWxlbWVudCB3ZVxuICAgIC8vIGNhbiBleGVjdXRlIHRoZSBwcmV2aW91cyB4LXNob3cgc3RhY2sgKGlmIG9uZSBleGlzdHMpLlxuXG5cbiAgICBpZiAoY29tcG9uZW50LnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudCAmJiAhY29tcG9uZW50LnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudC5jb250YWlucyhlbCkpIHtcbiAgICAgIGNvbXBvbmVudC5leGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnQuc2hvd0RpcmVjdGl2ZVN0YWNrLnB1c2goaGFuZGxlKTtcbiAgICBjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50ID0gZWw7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVJZkRpcmVjdGl2ZShjb21wb25lbnQsIGVsLCBleHByZXNzaW9uUmVzdWx0LCBpbml0aWFsVXBkYXRlLCBleHRyYVZhcnMpIHtcbiAgICB3YXJuSWZNYWxmb3JtZWRUZW1wbGF0ZShlbCwgJ3gtaWYnKTtcbiAgICBjb25zdCBlbGVtZW50SGFzQWxyZWFkeUJlZW5BZGRlZCA9IGVsLm5leHRFbGVtZW50U2libGluZyAmJiBlbC5uZXh0RWxlbWVudFNpYmxpbmcuX194X2luc2VydGVkX21lID09PSB0cnVlO1xuXG4gICAgaWYgKGV4cHJlc3Npb25SZXN1bHQgJiYgKCFlbGVtZW50SGFzQWxyZWFkeUJlZW5BZGRlZCB8fCBlbC5fX3hfdHJhbnNpdGlvbikpIHtcbiAgICAgIGNvbnN0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShlbC5jb250ZW50LCB0cnVlKTtcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCBlbC5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgICAgdHJhbnNpdGlvbkluKGVsLm5leHRFbGVtZW50U2libGluZywgKCkgPT4ge30sIGNvbXBvbmVudCwgaW5pdGlhbFVwZGF0ZSk7XG4gICAgICBjb21wb25lbnQuaW5pdGlhbGl6ZUVsZW1lbnRzKGVsLm5leHRFbGVtZW50U2libGluZywgZXh0cmFWYXJzKTtcbiAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWV4cHJlc3Npb25SZXN1bHQgJiYgZWxlbWVudEhhc0FscmVhZHlCZWVuQWRkZWQpIHtcbiAgICAgIHRyYW5zaXRpb25PdXQoZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7XG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgIH0sIGNvbXBvbmVudCwgaW5pdGlhbFVwZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJMaXN0ZW5lcihjb21wb25lbnQsIGVsLCBldmVudCwgbW9kaWZpZXJzLCBleHByZXNzaW9uLCBleHRyYVZhcnMgPSB7fSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBwYXNzaXZlOiBtb2RpZmllcnMuaW5jbHVkZXMoJ3Bhc3NpdmUnKVxuICAgIH07XG5cbiAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdjYW1lbCcpKSB7XG4gICAgICBldmVudCA9IGNhbWVsQ2FzZShldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnYXdheScpKSB7XG4gICAgICBsZXQgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgY2xpY2sgY2FtZSBmcm9tIHRoZSBlbGVtZW50IG9yIHdpdGhpbiBpdC5cbiAgICAgICAgaWYgKGVsLmNvbnRhaW5zKGUudGFyZ2V0KSkgcmV0dXJuOyAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGVsZW1lbnQgaXNuJ3QgY3VycmVudGx5IHZpc2libGUuXG5cbiAgICAgICAgaWYgKGVsLm9mZnNldFdpZHRoIDwgMSAmJiBlbC5vZmZzZXRIZWlnaHQgPCAxKSByZXR1cm47IC8vIE5vdyB0aGF0IHdlIGFyZSBzdXJlIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIEFORCB0aGUgY2xpY2tcbiAgICAgICAgLy8gaXMgZnJvbSBvdXRzaWRlIGl0LCBsZXQncyBydW4gdGhlIGV4cHJlc3Npb24uXG5cbiAgICAgICAgcnVuTGlzdGVuZXJIYW5kbGVyKGNvbXBvbmVudCwgZXhwcmVzc2lvbiwgZSwgZXh0cmFWYXJzKTtcblxuICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvbmNlJykpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfTsgLy8gTGlzdGVuIGZvciB0aGlzIGV2ZW50IGF0IHRoZSByb290IGxldmVsLlxuXG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbGlzdGVuZXJUYXJnZXQgPSBtb2RpZmllcnMuaW5jbHVkZXMoJ3dpbmRvdycpID8gd2luZG93IDogbW9kaWZpZXJzLmluY2x1ZGVzKCdkb2N1bWVudCcpID8gZG9jdW1lbnQgOiBlbDtcblxuICAgICAgbGV0IGhhbmRsZXIgPSBlID0+IHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoaXMgZ2xvYmFsIGV2ZW50IGhhbmRsZXIgaWYgdGhlIGVsZW1lbnQgdGhhdCBkZWNsYXJlZCBpdFxuICAgICAgICAvLyBoYXMgYmVlbiByZW1vdmVkLiBJdCdzIG5vdyBzdGFsZS5cbiAgICAgICAgaWYgKGxpc3RlbmVyVGFyZ2V0ID09PSB3aW5kb3cgfHwgbGlzdGVuZXJUYXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSkge1xuICAgICAgICAgICAgbGlzdGVuZXJUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzS2V5RXZlbnQoZXZlbnQpKSB7XG4gICAgICAgICAgaWYgKGlzTGlzdGVuaW5nRm9yQVNwZWNpZmljS2V5VGhhdEhhc250QmVlblByZXNzZWQoZSwgbW9kaWZpZXJzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ3ByZXZlbnQnKSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdzdG9wJykpIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIElmIHRoZSAuc2VsZiBtb2RpZmllciBpc24ndCBwcmVzZW50LCBvciBpZiBpdCBpcyBwcmVzZW50IGFuZFxuICAgICAgICAvLyB0aGUgdGFyZ2V0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgZWxlbWVudCB3ZSBhcmUgcmVnaXN0ZXJpbmcgdGhlXG4gICAgICAgIC8vIGV2ZW50IG9uLCBydW4gdGhlIGhhbmRsZXJcblxuICAgICAgICBpZiAoIW1vZGlmaWVycy5pbmNsdWRlcygnc2VsZicpIHx8IGUudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gcnVuTGlzdGVuZXJIYW5kbGVyKGNvbXBvbmVudCwgZXhwcmVzc2lvbiwgZSwgZXh0cmFWYXJzKTtcbiAgICAgICAgICByZXR1cm5WYWx1ZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnb25jZScpKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnZGVib3VuY2UnKSkge1xuICAgICAgICBsZXQgbmV4dE1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKCdkZWJvdW5jZScpICsgMV0gfHwgJ2ludmFsaWQtd2FpdCc7XG4gICAgICAgIGxldCB3YWl0ID0gaXNOdW1lcmljKG5leHRNb2RpZmllci5zcGxpdCgnbXMnKVswXSkgPyBOdW1iZXIobmV4dE1vZGlmaWVyLnNwbGl0KCdtcycpWzBdKSA6IDI1MDtcbiAgICAgICAgaGFuZGxlciA9IGRlYm91bmNlKGhhbmRsZXIsIHdhaXQpO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBydW5MaXN0ZW5lckhhbmRsZXIoY29tcG9uZW50LCBleHByZXNzaW9uLCBlLCBleHRyYVZhcnMpIHtcbiAgICByZXR1cm4gY29tcG9uZW50LmV2YWx1YXRlQ29tbWFuZEV4cHJlc3Npb24oZS50YXJnZXQsIGV4cHJlc3Npb24sICgpID0+IHtcbiAgICAgIHJldHVybiBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgZXh0cmFWYXJzKCkpLCB7fSwge1xuICAgICAgICAnJGV2ZW50JzogZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0tleUV2ZW50KGV2ZW50KSB7XG4gICAgcmV0dXJuIFsna2V5ZG93bicsICdrZXl1cCddLmluY2x1ZGVzKGV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTGlzdGVuaW5nRm9yQVNwZWNpZmljS2V5VGhhdEhhc250QmVlblByZXNzZWQoZSwgbW9kaWZpZXJzKSB7XG4gICAgbGV0IGtleU1vZGlmaWVycyA9IG1vZGlmaWVycy5maWx0ZXIoaSA9PiB7XG4gICAgICByZXR1cm4gIVsnd2luZG93JywgJ2RvY3VtZW50JywgJ3ByZXZlbnQnLCAnc3RvcCddLmluY2x1ZGVzKGkpO1xuICAgIH0pO1xuXG4gICAgaWYgKGtleU1vZGlmaWVycy5pbmNsdWRlcygnZGVib3VuY2UnKSkge1xuICAgICAgbGV0IGRlYm91bmNlSW5kZXggPSBrZXlNb2RpZmllcnMuaW5kZXhPZignZGVib3VuY2UnKTtcbiAgICAgIGtleU1vZGlmaWVycy5zcGxpY2UoZGVib3VuY2VJbmRleCwgaXNOdW1lcmljKChrZXlNb2RpZmllcnNbZGVib3VuY2VJbmRleCArIDFdIHx8ICdpbnZhbGlkLXdhaXQnKS5zcGxpdCgnbXMnKVswXSkgPyAyIDogMSk7XG4gICAgfSAvLyBJZiBubyBtb2RpZmllciBpcyBzcGVjaWZpZWQsIHdlJ2xsIGNhbGwgaXQgYSBwcmVzcy5cblxuXG4gICAgaWYgKGtleU1vZGlmaWVycy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTsgLy8gSWYgb25lIGlzIHBhc3NlZCwgQU5EIGl0IG1hdGNoZXMgdGhlIGtleSBwcmVzc2VkLCB3ZSdsbCBjYWxsIGl0IGEgcHJlc3MuXG5cbiAgICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMSAmJiBrZXlNb2RpZmllcnNbMF0gPT09IGtleVRvTW9kaWZpZXIoZS5rZXkpKSByZXR1cm4gZmFsc2U7IC8vIFRoZSB1c2VyIGlzIGxpc3RlbmluZyBmb3Iga2V5IGNvbWJpbmF0aW9ucy5cblxuICAgIGNvbnN0IHN5c3RlbUtleU1vZGlmaWVycyA9IFsnY3RybCcsICdzaGlmdCcsICdhbHQnLCAnbWV0YScsICdjbWQnLCAnc3VwZXInXTtcbiAgICBjb25zdCBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycyA9IHN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIobW9kaWZpZXIgPT4ga2V5TW9kaWZpZXJzLmluY2x1ZGVzKG1vZGlmaWVyKSk7XG4gICAga2V5TW9kaWZpZXJzID0ga2V5TW9kaWZpZXJzLmZpbHRlcihpID0+ICFzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5pbmNsdWRlcyhpKSk7XG5cbiAgICBpZiAoc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzID0gc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMuZmlsdGVyKG1vZGlmaWVyID0+IHtcbiAgICAgICAgLy8gQWxpYXMgXCJjbWRcIiBhbmQgXCJzdXBlclwiIHRvIFwibWV0YVwiXG4gICAgICAgIGlmIChtb2RpZmllciA9PT0gJ2NtZCcgfHwgbW9kaWZpZXIgPT09ICdzdXBlcicpIG1vZGlmaWVyID0gJ21ldGEnO1xuICAgICAgICByZXR1cm4gZVtgJHttb2RpZmllcn1LZXlgXTtcbiAgICAgIH0pOyAvLyBJZiBhbGwgdGhlIG1vZGlmaWVycyBzZWxlY3RlZCBhcmUgcHJlc3NlZCwgLi4uXG5cbiAgICAgIGlmIChhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMubGVuZ3RoID09PSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgICAgLy8gQU5EIHRoZSByZW1haW5pbmcga2V5IGlzIHByZXNzZWQgYXMgd2VsbC4gSXQncyBhIHByZXNzLlxuICAgICAgICBpZiAoa2V5TW9kaWZpZXJzWzBdID09PSBrZXlUb01vZGlmaWVyKGUua2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gLy8gV2UnbGwgY2FsbCBpdCBOT1QgYSB2YWxpZCBrZXlwcmVzcy5cblxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlUb01vZGlmaWVyKGtleSkge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICcvJzpcbiAgICAgICAgcmV0dXJuICdzbGFzaCc7XG5cbiAgICAgIGNhc2UgJyAnOlxuICAgICAgY2FzZSAnU3BhY2ViYXInOlxuICAgICAgICByZXR1cm4gJ3NwYWNlJztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGtleSAmJiBrZWJhYkNhc2Uoa2V5KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3Rlck1vZGVsTGlzdGVuZXIoY29tcG9uZW50LCBlbCwgbW9kaWZpZXJzLCBleHByZXNzaW9uLCBleHRyYVZhcnMpIHtcbiAgICAvLyBJZiB0aGUgZWxlbWVudCB3ZSBhcmUgYmluZGluZyB0byBpcyBhIHNlbGVjdCwgYSByYWRpbywgb3IgY2hlY2tib3hcbiAgICAvLyB3ZSdsbCBsaXN0ZW4gZm9yIHRoZSBjaGFuZ2UgZXZlbnQgaW5zdGVhZCBvZiB0aGUgXCJpbnB1dFwiIGV2ZW50LlxuICAgIHZhciBldmVudCA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcgfHwgWydjaGVja2JveCcsICdyYWRpbyddLmluY2x1ZGVzKGVsLnR5cGUpIHx8IG1vZGlmaWVycy5pbmNsdWRlcygnbGF6eScpID8gJ2NoYW5nZScgOiAnaW5wdXQnO1xuICAgIGNvbnN0IGxpc3RlbmVyRXhwcmVzc2lvbiA9IGAke2V4cHJlc3Npb259ID0gcmlnaHRTaWRlT2ZFeHByZXNzaW9uKCRldmVudCwgJHtleHByZXNzaW9ufSlgO1xuICAgIHJlZ2lzdGVyTGlzdGVuZXIoY29tcG9uZW50LCBlbCwgZXZlbnQsIG1vZGlmaWVycywgbGlzdGVuZXJFeHByZXNzaW9uLCAoKSA9PiB7XG4gICAgICByZXR1cm4gX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycygpKSwge30sIHtcbiAgICAgICAgcmlnaHRTaWRlT2ZFeHByZXNzaW9uOiBnZW5lcmF0ZU1vZGVsQXNzaWdubWVudEZ1bmN0aW9uKGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24pXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlTW9kZWxBc3NpZ25tZW50RnVuY3Rpb24oZWwsIG1vZGlmaWVycywgZXhwcmVzc2lvbikge1xuICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAvLyBSYWRpbyBidXR0b25zIG9ubHkgd29yayBwcm9wZXJseSB3aGVuIHRoZXkgc2hhcmUgYSBuYW1lIGF0dHJpYnV0ZS5cbiAgICAgIC8vIFBlb3BsZSBtaWdodCBhc3N1bWUgd2UgdGFrZSBjYXJlIG9mIHRoYXQgZm9yIHRoZW0sIGJlY2F1c2VcbiAgICAgIC8vIHRoZXkgYWxyZWFkeSBzZXQgYSBzaGFyZWQgXCJ4LW1vZGVsXCIgYXR0cmlidXRlLlxuICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoJ25hbWUnKSkgZWwuc2V0QXR0cmlidXRlKCduYW1lJywgZXhwcmVzc2lvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChldmVudCwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgICAvLyBDaGVjayBmb3IgZXZlbnQuZGV0YWlsIGR1ZSB0byBhbiBpc3N1ZSB3aGVyZSBJRTExIGhhbmRsZXMgb3RoZXIgZXZlbnRzIGFzIGEgQ3VzdG9tRXZlbnQuXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBDdXN0b21FdmVudCAmJiBldmVudC5kZXRhaWwpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LmRldGFpbDtcbiAgICAgIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAvLyBJZiB0aGUgZGF0YSB3ZSBhcmUgYmluZGluZyB0byBpcyBhbiBhcnJheSwgdG9nZ2xlIGl0cyB2YWx1ZSBpbnNpZGUgdGhlIGFycmF5LlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBtb2RpZmllcnMuaW5jbHVkZXMoJ251bWJlcicpID8gc2FmZVBhcnNlTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSkgOiBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jaGVja2VkID8gY3VycmVudFZhbHVlLmNvbmNhdChbbmV3VmFsdWVdKSA6IGN1cnJlbnRWYWx1ZS5maWx0ZXIoaSA9PiBpICE9PSBuZXdWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcgJiYgZWwubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0O1xuICAgICAgICAgIHJldHVybiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpO1xuICAgICAgICB9KSA6IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSB8fCBvcHRpb24udGV4dDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByYXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpIDogbW9kaWZpZXJzLmluY2x1ZGVzKCd0cmltJykgPyByYXdWYWx1ZS50cmltKCkgOiByYXdWYWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2FmZVBhcnNlTnVtYmVyKHJhd1ZhbHVlKSB7XG4gICAgY29uc3QgbnVtYmVyID0gcmF3VmFsdWUgPyBwYXJzZUZsb2F0KHJhd1ZhbHVlKSA6IG51bGw7XG4gICAgcmV0dXJuIGlzTnVtZXJpYyhudW1iZXIpID8gbnVtYmVyIDogcmF3VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ29weXJpZ2h0IChDKSAyMDE3IHNhbGVzZm9yY2UuY29tLCBpbmMuXG4gICAqL1xuICBjb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuICBjb25zdCB7IGdldFByb3RvdHlwZU9mLCBjcmVhdGU6IE9iamVjdENyZWF0ZSwgZGVmaW5lUHJvcGVydHk6IE9iamVjdERlZmluZVByb3BlcnR5LCBkZWZpbmVQcm9wZXJ0aWVzOiBPYmplY3REZWZpbmVQcm9wZXJ0aWVzLCBpc0V4dGVuc2libGUsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciwgZ2V0T3duUHJvcGVydHlOYW1lcywgZ2V0T3duUHJvcGVydHlTeW1ib2xzLCBwcmV2ZW50RXh0ZW5zaW9ucywgaGFzT3duUHJvcGVydHksIH0gPSBPYmplY3Q7XG4gIGNvbnN0IHsgcHVzaDogQXJyYXlQdXNoLCBjb25jYXQ6IEFycmF5Q29uY2F0LCBtYXA6IEFycmF5TWFwLCB9ID0gQXJyYXkucHJvdG90eXBlO1xuICBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gIH1cbiAgY29uc3QgcHJveHlUb1ZhbHVlTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQcm94eShwcm94eSwgdmFsdWUpIHtcbiAgICAgIHByb3h5VG9WYWx1ZU1hcC5zZXQocHJveHksIHZhbHVlKTtcbiAgfVxuICBjb25zdCB1bndyYXAgPSAocmVwbGljYU9yQW55KSA9PiBwcm94eVRvVmFsdWVNYXAuZ2V0KHJlcGxpY2FPckFueSkgfHwgcmVwbGljYU9yQW55O1xuXG4gIGZ1bmN0aW9uIHdyYXBWYWx1ZShtZW1icmFuZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBtZW1icmFuZS52YWx1ZUlzT2JzZXJ2YWJsZSh2YWx1ZSkgPyBtZW1icmFuZS5nZXRQcm94eSh2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxuICAvKipcbiAgICogVW53cmFwIHByb3BlcnR5IGRlc2NyaXB0b3JzIHdpbGwgc2V0IHZhbHVlIG9uIG9yaWdpbmFsIGRlc2NyaXB0b3JcbiAgICogV2Ugb25seSBuZWVkIHRvIHVud3JhcCBpZiB2YWx1ZSBpcyBzcGVjaWZpZWRcbiAgICogQHBhcmFtIGRlc2NyaXB0b3IgZXh0ZXJuYWwgZGVzY3JwaXRvciBwcm92aWRlZCB0byBkZWZpbmUgbmV3IHByb3BlcnR5IG9uIG9yaWdpbmFsIHZhbHVlXG4gICAqL1xuICBmdW5jdGlvbiB1bndyYXBEZXNjcmlwdG9yKGRlc2NyaXB0b3IpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2NyaXB0b3IsICd2YWx1ZScpKSB7XG4gICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IHVud3JhcChkZXNjcmlwdG9yLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9XG4gIGZ1bmN0aW9uIGxvY2tTaGFkb3dUYXJnZXQobWVtYnJhbmUsIHNoYWRvd1RhcmdldCwgb3JpZ2luYWxUYXJnZXQpIHtcbiAgICAgIGNvbnN0IHRhcmdldEtleXMgPSBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIHRhcmdldEtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgLy8gV2UgZG8gbm90IG5lZWQgdG8gd3JhcCB0aGUgZGVzY3JpcHRvciBpZiBjb25maWd1cmFibGVcbiAgICAgICAgICAvLyBCZWNhdXNlIHdlIGNhbiBkZWFsIHdpdGggd3JhcHBpbmcgaXQgd2hlbiB1c2VyIGdvZXMgdGhyb3VnaFxuICAgICAgICAgIC8vIEdldCBvd24gcHJvcGVydHkgZGVzY3JpcHRvci4gVGhlcmUgaXMgYWxzbyBhIGNoYW5jZSB0aGF0IHRoaXMgZGVzY3JpcHRvclxuICAgICAgICAgIC8vIGNvdWxkIGNoYW5nZSBzb21ldGltZSBpbiB0aGUgZnV0dXJlLCBzbyB3ZSBjYW4gZGVmZXIgd3JhcHBpbmdcbiAgICAgICAgICAvLyB1bnRpbCB3ZSBuZWVkIHRvXG4gICAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2NyaXB0b3IsIHdyYXBWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcHJldmVudEV4dGVuc2lvbnMoc2hhZG93VGFyZ2V0KTtcbiAgfVxuICBjbGFzcyBSZWFjdGl2ZVByb3h5SGFuZGxlciB7XG4gICAgICBjb25zdHJ1Y3RvcihtZW1icmFuZSwgdmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9yaWdpbmFsVGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5tZW1icmFuZSA9IG1lbWJyYW5lO1xuICAgICAgfVxuICAgICAgZ2V0KHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBvcmlnaW5hbFRhcmdldFtrZXldO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVPYnNlcnZlZCB9ID0gbWVtYnJhbmU7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gbWVtYnJhbmUuZ2V0UHJveHkodmFsdWUpO1xuICAgICAgfVxuICAgICAgc2V0KHNoYWRvd1RhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lOiB7IHZhbHVlTXV0YXRlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIG9yaWdpbmFsVGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdmFsdWVNdXRhdGVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdsZW5ndGgnICYmIGlzQXJyYXkob3JpZ2luYWxUYXJnZXQpKSB7XG4gICAgICAgICAgICAgIC8vIGZpeCBmb3IgaXNzdWUgIzIzNjogcHVzaCB3aWxsIGFkZCB0aGUgbmV3IGluZGV4LCBhbmQgYnkgdGhlIHRpbWUgbGVuZ3RoXG4gICAgICAgICAgICAgIC8vIGlzIHVwZGF0ZWQsIHRoZSBpbnRlcm5hbCBsZW5ndGggaXMgYWxyZWFkeSBlcXVhbCB0byB0aGUgbmV3IGxlbmd0aCB2YWx1ZVxuICAgICAgICAgICAgICAvLyB0aGVyZWZvcmUsIHRoZSBvbGRWYWx1ZSBpcyBlcXVhbCB0byB0aGUgdmFsdWUuIFRoaXMgaXMgdGhlIGZvcmtpbmcgbG9naWNcbiAgICAgICAgICAgICAgLy8gdG8gc3VwcG9ydCB0aGlzIHVzZSBjYXNlLlxuICAgICAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgZGVsZXRlUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU11dGF0ZWQgfSB9ID0gdGhpcztcbiAgICAgICAgICBkZWxldGUgb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBhcHBseShzaGFkb3dUYXJnZXQsIHRoaXNBcmcsIGFyZ0FycmF5KSB7XG4gICAgICAgICAgLyogTm8gb3AgKi9cbiAgICAgIH1cbiAgICAgIGNvbnN0cnVjdCh0YXJnZXQsIGFyZ0FycmF5LCBuZXdUYXJnZXQpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgaGFzKHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmU6IHsgdmFsdWVPYnNlcnZlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIHZhbHVlT2JzZXJ2ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIGtleSBpbiBvcmlnaW5hbFRhcmdldDtcbiAgICAgIH1cbiAgICAgIG93bktleXMoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCB9ID0gdGhpcztcbiAgICAgICAgICByZXR1cm4gQXJyYXlDb25jYXQuY2FsbChnZXRPd25Qcm9wZXJ0eU5hbWVzKG9yaWdpbmFsVGFyZ2V0KSwgZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9yaWdpbmFsVGFyZ2V0KSk7XG4gICAgICB9XG4gICAgICBpc0V4dGVuc2libGUoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3Qgc2hhZG93SXNFeHRlbnNpYmxlID0gaXNFeHRlbnNpYmxlKHNoYWRvd1RhcmdldCk7XG4gICAgICAgICAgaWYgKCFzaGFkb3dJc0V4dGVuc2libGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWRvd0lzRXh0ZW5zaWJsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0SXNFeHRlbnNpYmxlID0gaXNFeHRlbnNpYmxlKG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICBpZiAoIXRhcmdldElzRXh0ZW5zaWJsZSkge1xuICAgICAgICAgICAgICBsb2NrU2hhZG93VGFyZ2V0KG1lbWJyYW5lLCBzaGFkb3dUYXJnZXQsIG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRhcmdldElzRXh0ZW5zaWJsZTtcbiAgICAgIH1cbiAgICAgIHNldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCwgcHJvdG90eXBlKSB7XG4gICAgICB9XG4gICAgICBnZXRQcm90b3R5cGVPZihzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBnZXRQcm90b3R5cGVPZihvcmlnaW5hbFRhcmdldCk7XG4gICAgICB9XG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IHRoaXMubWVtYnJhbmU7XG4gICAgICAgICAgLy8ga2V5cyBsb29rZWQgdXAgdmlhIGhhc093blByb3BlcnR5IG5lZWQgdG8gYmUgcmVhY3RpdmVcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGxldCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChkZXNjKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2hhZG93RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzaGFkb3dUYXJnZXQsIGtleSk7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChzaGFkb3dEZXNjcmlwdG9yKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2hhZG93RGVzY3JpcHRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTm90ZTogYnkgYWNjZXNzaW5nIHRoZSBkZXNjcmlwdG9yLCB0aGUga2V5IGlzIG1hcmtlZCBhcyBvYnNlcnZlZFxuICAgICAgICAgIC8vIGJ1dCBhY2Nlc3MgdG8gdGhlIHZhbHVlLCBzZXR0ZXIgb3IgZ2V0dGVyIChpZiBhdmFpbGFibGUpIGNhbm5vdCBvYnNlcnZlXG4gICAgICAgICAgLy8gbXV0YXRpb25zLCBqdXN0IGxpa2UgcmVndWxhciBtZXRob2RzLCBpbiB3aGljaCBjYXNlIHdlIGp1c3QgZG8gbm90aGluZy5cbiAgICAgICAgICBkZXNjID0gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2MsIHdyYXBWYWx1ZSk7XG4gICAgICAgICAgaWYgKCFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAvLyBJZiBkZXNjcmlwdG9yIGZyb20gb3JpZ2luYWwgdGFyZ2V0IGlzIG5vdCBjb25maWd1cmFibGUsXG4gICAgICAgICAgICAgIC8vIFdlIG11c3QgY29weSB0aGUgd3JhcHBlZCBkZXNjcmlwdG9yIG92ZXIgdG8gdGhlIHNoYWRvdyB0YXJnZXQuXG4gICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcHJveHkgd2lsbCB0aHJvdyBhbiBpbnZhcmlhbnQgZXJyb3IuXG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgb3VyIGxhc3QgY2hhbmNlIHRvIGxvY2sgdGhlIHZhbHVlLlxuICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9oYW5kbGVyL2dldE93blByb3BlcnR5RGVzY3JpcHRvciNJbnZhcmlhbnRzXG4gICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICB9XG4gICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBsb2NrU2hhZG93VGFyZ2V0KG1lbWJyYW5lLCBzaGFkb3dUYXJnZXQsIG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhvcmlnaW5hbFRhcmdldCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBkZWZpbmVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lIH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVNdXRhdGVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICBjb25zdCB7IGNvbmZpZ3VyYWJsZSB9ID0gZGVzY3JpcHRvcjtcbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGZvciB2YWx1ZSBpbiBkZXNjcmlwdG9yXG4gICAgICAgICAgLy8gYmVjYXVzZSBPYmplY3QuZnJlZXplKHByb3h5KSBjYWxscyB0aGlzIG1ldGhvZFxuICAgICAgICAgIC8vIHdpdGggb25seSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRlYWJsZTogZmFsc2UgfVxuICAgICAgICAgIC8vIEFkZGl0aW9uYWxseSwgbWV0aG9kIHdpbGwgb25seSBiZSBjYWxsZWQgd2l0aCB3cml0ZWFibGU6ZmFsc2VcbiAgICAgICAgICAvLyBpZiB0aGUgZGVzY3JpcHRvciBoYXMgYSB2YWx1ZSwgYXMgb3Bwb3NlZCB0byBnZXR0ZXIvc2V0dGVyXG4gICAgICAgICAgLy8gU28gd2UgY2FuIGp1c3QgY2hlY2sgaWYgd3JpdGFibGUgaXMgcHJlc2VudCBhbmQgdGhlbiBzZWUgaWZcbiAgICAgICAgICAvLyB2YWx1ZSBpcyBwcmVzZW50LiBUaGlzIGVsaW1pbmF0ZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgZGVzY3JpcHRvcnNcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAnd3JpdGFibGUnKSAmJiAhaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbERlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBvcmlnaW5hbERlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KG9yaWdpbmFsVGFyZ2V0LCBrZXksIHVud3JhcERlc2NyaXB0b3IoZGVzY3JpcHRvcikpO1xuICAgICAgICAgIGlmIChjb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzY3JpcHRvciwgd3JhcFZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlTXV0YXRlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXBSZWFkT25seVZhbHVlKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG1lbWJyYW5lLnZhbHVlSXNPYnNlcnZhYmxlKHZhbHVlKSA/IG1lbWJyYW5lLmdldFJlYWRPbmx5UHJveHkodmFsdWUpIDogdmFsdWU7XG4gIH1cbiAgY2xhc3MgUmVhZE9ubHlIYW5kbGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgICAgIHRoaXMub3JpZ2luYWxUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLm1lbWJyYW5lID0gbWVtYnJhbmU7XG4gICAgICB9XG4gICAgICBnZXQoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG1lbWJyYW5lLCBvcmlnaW5hbFRhcmdldCB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsVGFyZ2V0W2tleV07XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZU9ic2VydmVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiBtZW1icmFuZS5nZXRSZWFkT25seVByb3h5KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNldChzaGFkb3dUYXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBkZWxldGVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGFwcGx5KHNoYWRvd1RhcmdldCwgdGhpc0FyZywgYXJnQXJyYXkpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgY29uc3RydWN0KHRhcmdldCwgYXJnQXJyYXksIG5ld1RhcmdldCkge1xuICAgICAgICAgIC8qIE5vIG9wICovXG4gICAgICB9XG4gICAgICBoYXMoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU9ic2VydmVkIH0gfSA9IHRoaXM7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4ga2V5IGluIG9yaWdpbmFsVGFyZ2V0O1xuICAgICAgfVxuICAgICAgb3duS2V5cyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIH1cbiAgICAgIHNldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCwgcHJvdG90eXBlKSB7XG4gICAgICB9XG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IG1lbWJyYW5lO1xuICAgICAgICAgIC8vIGtleXMgbG9va2VkIHVwIHZpYSBoYXNPd25Qcm9wZXJ0eSBuZWVkIHRvIGJlIHJlYWN0aXZlXG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICBsZXQgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICBpZiAoaXNVbmRlZmluZWQoZGVzYykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNoYWRvd0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc2hhZG93RGVzY3JpcHRvcikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWRvd0Rlc2NyaXB0b3I7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5vdGU6IGJ5IGFjY2Vzc2luZyB0aGUgZGVzY3JpcHRvciwgdGhlIGtleSBpcyBtYXJrZWQgYXMgb2JzZXJ2ZWRcbiAgICAgICAgICAvLyBidXQgYWNjZXNzIHRvIHRoZSB2YWx1ZSBvciBnZXR0ZXIgKGlmIGF2YWlsYWJsZSkgY2Fubm90IGJlIG9ic2VydmVkLFxuICAgICAgICAgIC8vIGp1c3QgbGlrZSByZWd1bGFyIG1ldGhvZHMsIGluIHdoaWNoIGNhc2Ugd2UganVzdCBkbyBub3RoaW5nLlxuICAgICAgICAgIGRlc2MgPSB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzYywgd3JhcFJlYWRPbmx5VmFsdWUpO1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2MsICdzZXQnKSkge1xuICAgICAgICAgICAgICBkZXNjLnNldCA9IHVuZGVmaW5lZDsgLy8gcmVhZE9ubHkgbWVtYnJhbmUgZG9lcyBub3QgYWxsb3cgc2V0dGVyc1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgIC8vIElmIGRlc2NyaXB0b3IgZnJvbSBvcmlnaW5hbCB0YXJnZXQgaXMgbm90IGNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICAgICAgLy8gV2UgbXVzdCBjb3B5IHRoZSB3cmFwcGVkIGRlc2NyaXB0b3Igb3ZlciB0byB0aGUgc2hhZG93IHRhcmdldC5cbiAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBwcm94eSB3aWxsIHRocm93IGFuIGludmFyaWFudCBlcnJvci5cbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBvdXIgbGFzdCBjaGFuY2UgdG8gbG9jayB0aGUgdmFsdWUuXG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L2hhbmRsZXIvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yI0ludmFyaWFudHNcbiAgICAgICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgIH1cbiAgICAgIHByZXZlbnRFeHRlbnNpb25zKHNoYWRvd1RhcmdldCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGRlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYWRvd1RhcmdldCh2YWx1ZSkge1xuICAgICAgbGV0IHNoYWRvd1RhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHNoYWRvd1RhcmdldCA9IFtdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgc2hhZG93VGFyZ2V0ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhZG93VGFyZ2V0O1xuICB9XG4gIGNvbnN0IE9iamVjdERvdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG4gIGZ1bmN0aW9uIGRlZmF1bHRWYWx1ZUlzT2JzZXJ2YWJsZSh2YWx1ZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxseSBjaGVja2luZyBmb3IgbnVsbFxuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdHJlYXQgYWxsIG5vbi1vYmplY3QgdHlwZXMsIGluY2x1ZGluZyB1bmRlZmluZWQsIGFzIG5vbi1vYnNlcnZhYmxlIHZhbHVlc1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb3RvID0gZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAgICAgcmV0dXJuIChwcm90byA9PT0gT2JqZWN0RG90UHJvdG90eXBlIHx8IHByb3RvID09PSBudWxsIHx8IGdldFByb3RvdHlwZU9mKHByb3RvKSA9PT0gbnVsbCk7XG4gIH1cbiAgY29uc3QgZGVmYXVsdFZhbHVlT2JzZXJ2ZWQgPSAob2JqLCBrZXkpID0+IHtcbiAgICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfTtcbiAgY29uc3QgZGVmYXVsdFZhbHVlTXV0YXRlZCA9IChvYmosIGtleSkgPT4ge1xuICAgICAgLyogZG8gbm90aGluZyAqL1xuICB9O1xuICBjb25zdCBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uID0gKHZhbHVlKSA9PiB2YWx1ZTtcbiAgZnVuY3Rpb24gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2NyaXB0b3IsIGdldFZhbHVlKSB7XG4gICAgICBjb25zdCB7IHNldCwgZ2V0IH0gPSBkZXNjcmlwdG9yO1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZ2V0VmFsdWUobWVtYnJhbmUsIGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChnZXQpKSB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgLy8gaW52b2tpbmcgdGhlIG9yaWdpbmFsIGdldHRlciB3aXRoIHRoZSBvcmlnaW5hbCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRWYWx1ZShtZW1icmFuZSwgZ2V0LmNhbGwodW53cmFwKHRoaXMpKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc2V0KSkge1xuICAgICAgICAgICAgICBkZXNjcmlwdG9yLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBkb24ndCBoYXZlIGEgY2xlYXIgaW5kaWNhdGlvbiBvZiB3aGV0aGVyXG4gICAgICAgICAgICAgICAgICAvLyBvciBub3QgYSB2YWxpZCBtdXRhdGlvbiB3aWxsIG9jY3VyLCB3ZSBkb24ndCBoYXZlIHRoZSBrZXksXG4gICAgICAgICAgICAgICAgICAvLyBhbmQgd2UgYXJlIG5vdCBzdXJlIHdoeSBhbmQgaG93IHRoZXkgYXJlIGludm9raW5nIHRoaXMgc2V0dGVyLlxuICAgICAgICAgICAgICAgICAgLy8gTmV2ZXJ0aGVsZXNzIHdlIHByZXNlcnZlIHRoZSBvcmlnaW5hbCBzZW1hbnRpY3MgYnkgaW52b2tpbmcgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBzZXR0ZXIgd2l0aCB0aGUgb3JpZ2luYWwgdGFyZ2V0IGFuZCB0aGUgdW53cmFwcGVkIHZhbHVlXG4gICAgICAgICAgICAgICAgICBzZXQuY2FsbCh1bndyYXAodGhpcyksIG1lbWJyYW5lLnVud3JhcFByb3h5KHZhbHVlKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH1cbiAgY2xhc3MgUmVhY3RpdmVNZW1icmFuZSB7XG4gICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZURpc3RvcnRpb24gPSBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uO1xuICAgICAgICAgIHRoaXMudmFsdWVNdXRhdGVkID0gZGVmYXVsdFZhbHVlTXV0YXRlZDtcbiAgICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZWQgPSBkZWZhdWx0VmFsdWVPYnNlcnZlZDtcbiAgICAgICAgICB0aGlzLnZhbHVlSXNPYnNlcnZhYmxlID0gZGVmYXVsdFZhbHVlSXNPYnNlcnZhYmxlO1xuICAgICAgICAgIHRoaXMub2JqZWN0R3JhcGggPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZURpc3RvcnRpb24sIHZhbHVlTXV0YXRlZCwgdmFsdWVPYnNlcnZlZCwgdmFsdWVJc09ic2VydmFibGUgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWVEaXN0b3J0aW9uID0gaXNGdW5jdGlvbih2YWx1ZURpc3RvcnRpb24pID8gdmFsdWVEaXN0b3J0aW9uIDogZGVmYXVsdFZhbHVlRGlzdG9ydGlvbjtcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZU11dGF0ZWQgPSBpc0Z1bmN0aW9uKHZhbHVlTXV0YXRlZCkgPyB2YWx1ZU11dGF0ZWQgOiBkZWZhdWx0VmFsdWVNdXRhdGVkO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZWQgPSBpc0Z1bmN0aW9uKHZhbHVlT2JzZXJ2ZWQpID8gdmFsdWVPYnNlcnZlZCA6IGRlZmF1bHRWYWx1ZU9ic2VydmVkO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlSXNPYnNlcnZhYmxlID0gaXNGdW5jdGlvbih2YWx1ZUlzT2JzZXJ2YWJsZSkgPyB2YWx1ZUlzT2JzZXJ2YWJsZSA6IGRlZmF1bHRWYWx1ZUlzT2JzZXJ2YWJsZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBnZXRQcm94eSh2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHVud3JhcHBlZFZhbHVlID0gdW53cmFwKHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBkaXN0b3J0ZWQgPSB0aGlzLnZhbHVlRGlzdG9ydGlvbih1bndyYXBwZWRWYWx1ZSk7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVJc09ic2VydmFibGUoZGlzdG9ydGVkKSkge1xuICAgICAgICAgICAgICBjb25zdCBvID0gdGhpcy5nZXRSZWFjdGl2ZVN0YXRlKHVud3JhcHBlZFZhbHVlLCBkaXN0b3J0ZWQpO1xuICAgICAgICAgICAgICAvLyB3aGVuIHRyeWluZyB0byBleHRyYWN0IHRoZSB3cml0YWJsZSB2ZXJzaW9uIG9mIGEgcmVhZG9ubHlcbiAgICAgICAgICAgICAgLy8gd2UgcmV0dXJuIHRoZSByZWFkb25seS5cbiAgICAgICAgICAgICAgcmV0dXJuIG8ucmVhZE9ubHkgPT09IHZhbHVlID8gdmFsdWUgOiBvLnJlYWN0aXZlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGlzdG9ydGVkO1xuICAgICAgfVxuICAgICAgZ2V0UmVhZE9ubHlQcm94eSh2YWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0gdW53cmFwKHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBkaXN0b3J0ZWQgPSB0aGlzLnZhbHVlRGlzdG9ydGlvbih2YWx1ZSk7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVJc09ic2VydmFibGUoZGlzdG9ydGVkKSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWFjdGl2ZVN0YXRlKHZhbHVlLCBkaXN0b3J0ZWQpLnJlYWRPbmx5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGlzdG9ydGVkO1xuICAgICAgfVxuICAgICAgdW53cmFwUHJveHkocCkge1xuICAgICAgICAgIHJldHVybiB1bndyYXAocCk7XG4gICAgICB9XG4gICAgICBnZXRSZWFjdGl2ZVN0YXRlKHZhbHVlLCBkaXN0b3J0ZWRWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHsgb2JqZWN0R3JhcGgsIH0gPSB0aGlzO1xuICAgICAgICAgIGxldCByZWFjdGl2ZVN0YXRlID0gb2JqZWN0R3JhcGguZ2V0KGRpc3RvcnRlZFZhbHVlKTtcbiAgICAgICAgICBpZiAocmVhY3RpdmVTdGF0ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVhY3RpdmVTdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbWVtYnJhbmUgPSB0aGlzO1xuICAgICAgICAgIHJlYWN0aXZlU3RhdGUgPSB7XG4gICAgICAgICAgICAgIGdldCByZWFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWN0aXZlSGFuZGxlciA9IG5ldyBSZWFjdGl2ZVByb3h5SGFuZGxlcihtZW1icmFuZSwgZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgLy8gY2FjaGluZyB0aGUgcmVhY3RpdmUgcHJveHkgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWRcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGNyZWF0ZVNoYWRvd1RhcmdldChkaXN0b3J0ZWRWYWx1ZSksIHJlYWN0aXZlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhY3RpdmUnLCB7IHZhbHVlOiBwcm94eSB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZ2V0IHJlYWRPbmx5KCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZE9ubHlIYW5kbGVyID0gbmV3IFJlYWRPbmx5SGFuZGxlcihtZW1icmFuZSwgZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgLy8gY2FjaGluZyB0aGUgcmVhZE9ubHkgcHJveHkgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWRcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGNyZWF0ZVNoYWRvd1RhcmdldChkaXN0b3J0ZWRWYWx1ZSksIHJlYWRPbmx5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhZE9ubHknLCB7IHZhbHVlOiBwcm94eSB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgb2JqZWN0R3JhcGguc2V0KGRpc3RvcnRlZFZhbHVlLCByZWFjdGl2ZVN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gcmVhY3RpdmVTdGF0ZTtcbiAgICAgIH1cbiAgfVxuICAvKiogdmVyc2lvbjogMC4yNi4wICovXG5cbiAgZnVuY3Rpb24gd3JhcChkYXRhLCBtdXRhdGlvbkNhbGxiYWNrKSB7XG5cbiAgICBsZXQgbWVtYnJhbmUgPSBuZXcgUmVhY3RpdmVNZW1icmFuZSh7XG4gICAgICB2YWx1ZU11dGF0ZWQodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgbXV0YXRpb25DYWxsYmFjayh0YXJnZXQsIGtleSk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbWVtYnJhbmUuZ2V0UHJveHkoZGF0YSksXG4gICAgICBtZW1icmFuZTogbWVtYnJhbmVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVud3JhcCQxKG1lbWJyYW5lLCBvYnNlcnZhYmxlKSB7XG4gICAgbGV0IHVud3JhcHBlZERhdGEgPSBtZW1icmFuZS51bndyYXBQcm94eShvYnNlcnZhYmxlKTtcbiAgICBsZXQgY29weSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHVud3JhcHBlZERhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChbJyRlbCcsICckcmVmcycsICckbmV4dFRpY2snLCAnJHdhdGNoJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuICAgICAgY29weVtrZXldID0gdW53cmFwcGVkRGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbCwgY29tcG9uZW50Rm9yQ2xvbmUgPSBudWxsKSB7XG4gICAgICB0aGlzLiRlbCA9IGVsO1xuICAgICAgY29uc3QgZGF0YUF0dHIgPSB0aGlzLiRlbC5nZXRBdHRyaWJ1dGUoJ3gtZGF0YScpO1xuICAgICAgY29uc3QgZGF0YUV4cHJlc3Npb24gPSBkYXRhQXR0ciA9PT0gJycgPyAne30nIDogZGF0YUF0dHI7XG4gICAgICBjb25zdCBpbml0RXhwcmVzc2lvbiA9IHRoaXMuJGVsLmdldEF0dHJpYnV0ZSgneC1pbml0Jyk7XG4gICAgICBsZXQgZGF0YUV4dHJhcyA9IHtcbiAgICAgICAgJGVsOiB0aGlzLiRlbFxuICAgICAgfTtcbiAgICAgIGxldCBjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlID0gY29tcG9uZW50Rm9yQ2xvbmUgPyBjb21wb25lbnRGb3JDbG9uZS4kZWwgOiB0aGlzLiRlbDtcbiAgICAgIE9iamVjdC5lbnRyaWVzKEFscGluZS5tYWdpY1Byb3BlcnRpZXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRhdGFFeHRyYXMsIGAkJHtuYW1lfWAsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhID0gY29tcG9uZW50Rm9yQ2xvbmUgPyBjb21wb25lbnRGb3JDbG9uZS5nZXRVbm9ic2VydmVkRGF0YSgpIDogc2FmZXJFdmFsKGRhdGFFeHByZXNzaW9uLCBkYXRhRXh0cmFzKTtcbiAgICAgIC8vIENvbnN0cnVjdCBhIFByb3h5LWJhc2VkIG9ic2VydmFibGUuIFRoaXMgd2lsbCBiZSB1c2VkIHRvIGhhbmRsZSByZWFjdGl2aXR5LlxuXG4gICAgICBsZXQge1xuICAgICAgICBtZW1icmFuZSxcbiAgICAgICAgZGF0YVxuICAgICAgfSA9IHRoaXMud3JhcERhdGFJbk9ic2VydmFibGUodGhpcy51bm9ic2VydmVkRGF0YSk7XG4gICAgICB0aGlzLiRkYXRhID0gZGF0YTtcbiAgICAgIHRoaXMubWVtYnJhbmUgPSBtZW1icmFuZTsgLy8gQWZ0ZXIgbWFraW5nIHVzZXItc3VwcGxpZWQgZGF0YSBtZXRob2RzIHJlYWN0aXZlLCB3ZSBjYW4gbm93IGFkZFxuICAgICAgLy8gb3VyIG1hZ2ljIHByb3BlcnRpZXMgdG8gdGhlIG9yaWdpbmFsIGRhdGEgZm9yIGFjY2Vzcy5cblxuICAgICAgdGhpcy51bm9ic2VydmVkRGF0YS4kZWwgPSB0aGlzLiRlbDtcbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJHJlZnMgPSB0aGlzLmdldFJlZnNQcm94eSgpO1xuICAgICAgdGhpcy5uZXh0VGlja1N0YWNrID0gW107XG5cbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJG5leHRUaWNrID0gY2FsbGJhY2sgPT4ge1xuICAgICAgICB0aGlzLm5leHRUaWNrU3RhY2sucHVzaChjYWxsYmFjayk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLndhdGNoZXJzID0ge307XG5cbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJHdhdGNoID0gKHByb3BlcnR5LCBjYWxsYmFjaykgPT4ge1xuICAgICAgICBpZiAoIXRoaXMud2F0Y2hlcnNbcHJvcGVydHldKSB0aGlzLndhdGNoZXJzW3Byb3BlcnR5XSA9IFtdO1xuICAgICAgICB0aGlzLndhdGNoZXJzW3Byb3BlcnR5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH07IC8vIFJlZ2lzdGVyIGN1c3RvbSBtYWdpYyBwcm9wZXJ0aWVzLlxuXG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKEFscGluZS5tYWdpY1Byb3BlcnRpZXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudW5vYnNlcnZlZERhdGEsIGAkJHtuYW1lfWAsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNob3dEaXJlY3RpdmVTdGFjayA9IFtdO1xuICAgICAgdGhpcy5zaG93RGlyZWN0aXZlTGFzdEVsZW1lbnQ7XG4gICAgICBjb21wb25lbnRGb3JDbG9uZSB8fCBBbHBpbmUub25CZWZvcmVDb21wb25lbnRJbml0aWFsaXplZHMuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0aGlzKSk7XG4gICAgICB2YXIgaW5pdFJldHVybmVkQ2FsbGJhY2s7IC8vIElmIHgtaW5pdCBpcyBwcmVzZW50IEFORCB3ZSBhcmVuJ3QgY2xvbmluZyAoc2tpcCB4LWluaXQgb24gY2xvbmUpXG5cbiAgICAgIGlmIChpbml0RXhwcmVzc2lvbiAmJiAhY29tcG9uZW50Rm9yQ2xvbmUpIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0byBhbGxvdyBkYXRhIG1hbmlwdWxhdGlvbiwgYnV0IG5vdCB0cmlnZ2VyIERPTSB1cGRhdGVzIGp1c3QgeWV0LlxuICAgICAgICAvLyBXZSBoYXZlbid0IGV2ZW4gaW5pdGlhbGl6ZWQgdGhlIGVsZW1lbnRzIHdpdGggdGhlaXIgQWxwaW5lIGJpbmRpbmdzLiBJIG1lYW4gYydtb24uXG4gICAgICAgIHRoaXMucGF1c2VSZWFjdGl2aXR5ID0gdHJ1ZTtcbiAgICAgICAgaW5pdFJldHVybmVkQ2FsbGJhY2sgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbih0aGlzLiRlbCwgaW5pdEV4cHJlc3Npb24pO1xuICAgICAgICB0aGlzLnBhdXNlUmVhY3Rpdml0eSA9IGZhbHNlO1xuICAgICAgfSAvLyBSZWdpc3RlciBhbGwgb3VyIGxpc3RlbmVycyBhbmQgc2V0IGFsbCBvdXIgYXR0cmlidXRlIGJpbmRpbmdzLlxuXG5cbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKHRoaXMuJGVsKTsgLy8gVXNlIG11dGF0aW9uIG9ic2VydmVyIHRvIGRldGVjdCBuZXcgZWxlbWVudHMgYmVpbmcgYWRkZWQgd2l0aGluIHRoaXMgY29tcG9uZW50IGF0IHJ1bi10aW1lLlxuICAgICAgLy8gQWxwaW5lJ3MganVzdCBzbyBkYXJuIGZsZXhpYmxlIGFtaXJpdGU/XG5cbiAgICAgIHRoaXMubGlzdGVuRm9yTmV3RWxlbWVudHNUb0luaXRpYWxpemUoKTtcblxuICAgICAgaWYgKHR5cGVvZiBpbml0UmV0dXJuZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBSdW4gdGhlIGNhbGxiYWNrIHJldHVybmVkIGZyb20gdGhlIFwieC1pbml0XCIgaG9vayB0byBhbGxvdyB0aGUgdXNlciB0byBkbyBzdHVmZiBhZnRlclxuICAgICAgICAvLyBBbHBpbmUncyBnb3QgaXQncyBncnViYnkgbGl0dGxlIHBhd3MgYWxsIG92ZXIgZXZlcnl0aGluZy5cbiAgICAgICAgaW5pdFJldHVybmVkQ2FsbGJhY2suY2FsbCh0aGlzLiRkYXRhKTtcbiAgICAgIH1cblxuICAgICAgY29tcG9uZW50Rm9yQ2xvbmUgfHwgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEFscGluZS5vbkNvbXBvbmVudEluaXRpYWxpemVkcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRoaXMpKTtcbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGdldFVub2JzZXJ2ZWREYXRhKCkge1xuICAgICAgcmV0dXJuIHVud3JhcCQxKHRoaXMubWVtYnJhbmUsIHRoaXMuJGRhdGEpO1xuICAgIH1cblxuICAgIHdyYXBEYXRhSW5PYnNlcnZhYmxlKGRhdGEpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGxldCB1cGRhdGVEb20gPSBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYudXBkYXRlRWxlbWVudHMoc2VsZi4kZWwpO1xuICAgICAgfSwgMCk7XG4gICAgICByZXR1cm4gd3JhcChkYXRhLCAodGFyZ2V0LCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHNlbGYud2F0Y2hlcnNba2V5XSkge1xuICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSB3YXRjaGVyIGZvciB0aGlzIHNwZWNpZmljIGtleSwgcnVuIGl0LlxuICAgICAgICAgIHNlbGYud2F0Y2hlcnNba2V5XS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRhcmdldFtrZXldKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgLy8gQXJyYXlzIGFyZSBzcGVjaWFsIGNhc2VzLCBpZiBhbnkgb2YgdGhlIGl0ZW1zIGNoYW5nZSwgd2UgY29uc2lkZXIgdGhlIGFycmF5IGFzIG11dGF0ZWQuXG4gICAgICAgICAgT2JqZWN0LmtleXMoc2VsZi53YXRjaGVycykuZm9yRWFjaChmdWxsRG90Tm90YXRpb25LZXkgPT4ge1xuICAgICAgICAgICAgbGV0IGRvdE5vdGF0aW9uUGFydHMgPSBmdWxsRG90Tm90YXRpb25LZXkuc3BsaXQoJy4nKTsgLy8gSWdub3JlIGxlbmd0aCBtdXRhdGlvbnMgc2luY2UgdGhleSB3b3VsZCByZXN1bHQgaW4gZHVwbGljYXRlIGNhbGxzLlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIHdoZW4gY2FsbGluZyBwdXNoLCB3ZSB3b3VsZCBnZXQgYSBtdXRhdGlvbiBmb3IgdGhlIGl0ZW0ncyBrZXlcbiAgICAgICAgICAgIC8vIGFuZCBhIHNlY29uZCBtdXRhdGlvbiBmb3IgdGhlIGxlbmd0aCBwcm9wZXJ0eS5cblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2xlbmd0aCcpIHJldHVybjtcbiAgICAgICAgICAgIGRvdE5vdGF0aW9uUGFydHMucmVkdWNlKChjb21wYXJpc29uRGF0YSwgcGFydCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoT2JqZWN0LmlzKHRhcmdldCwgY29tcGFyaXNvbkRhdGFbcGFydF0pKSB7XG4gICAgICAgICAgICAgICAgc2VsZi53YXRjaGVyc1tmdWxsRG90Tm90YXRpb25LZXldLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGFyZ2V0KSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbkRhdGFbcGFydF07XG4gICAgICAgICAgICB9LCBzZWxmLmdldFVub2JzZXJ2ZWREYXRhKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIExldCdzIHdhbGsgdGhyb3VnaCB0aGUgd2F0Y2hlcnMgd2l0aCBcImRvdC1ub3RhdGlvblwiIChmb28uYmFyKSBhbmQgc2VlXG4gICAgICAgICAgLy8gaWYgdGhpcyBtdXRhdGlvbiBmaXRzIGFueSBvZiB0aGVtLlxuICAgICAgICAgIE9iamVjdC5rZXlzKHNlbGYud2F0Y2hlcnMpLmZpbHRlcihpID0+IGkuaW5jbHVkZXMoJy4nKSkuZm9yRWFjaChmdWxsRG90Tm90YXRpb25LZXkgPT4ge1xuICAgICAgICAgICAgbGV0IGRvdE5vdGF0aW9uUGFydHMgPSBmdWxsRG90Tm90YXRpb25LZXkuc3BsaXQoJy4nKTsgLy8gSWYgdGhpcyBkb3Qtbm90YXRpb24gd2F0Y2hlcidzIGxhc3QgXCJwYXJ0XCIgZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgLy8ga2V5LCB0aGVuIHNraXAgaXQgZWFybHkgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG5cbiAgICAgICAgICAgIGlmIChrZXkgIT09IGRvdE5vdGF0aW9uUGFydHNbZG90Tm90YXRpb25QYXJ0cy5sZW5ndGggLSAxXSkgcmV0dXJuOyAvLyBOb3csIHdhbGsgdGhyb3VnaCB0aGUgZG90LW5vdGF0aW9uIFwicGFydHNcIiByZWN1cnNpdmVseSB0byBmaW5kXG4gICAgICAgICAgICAvLyBhIG1hdGNoLCBhbmQgY2FsbCB0aGUgd2F0Y2hlciBpZiBvbmUncyBmb3VuZC5cblxuICAgICAgICAgICAgZG90Tm90YXRpb25QYXJ0cy5yZWR1Y2UoKGNvbXBhcmlzb25EYXRhLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuaXModGFyZ2V0LCBjb21wYXJpc29uRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyBSdW4gdGhlIHdhdGNoZXJzLlxuICAgICAgICAgICAgICAgIHNlbGYud2F0Y2hlcnNbZnVsbERvdE5vdGF0aW9uS2V5XS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRhcmdldFtrZXldKSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbkRhdGFbcGFydF07XG4gICAgICAgICAgICB9LCBzZWxmLmdldFVub2JzZXJ2ZWREYXRhKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IC8vIERvbid0IHJlYWN0IHRvIGRhdGEgY2hhbmdlcyBmb3IgY2FzZXMgbGlrZSB0aGUgYHgtY3JlYXRlZGAgaG9vay5cblxuXG4gICAgICAgIGlmIChzZWxmLnBhdXNlUmVhY3Rpdml0eSkgcmV0dXJuO1xuICAgICAgICB1cGRhdGVEb20oKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHdhbGtBbmRTa2lwTmVzdGVkQ29tcG9uZW50cyhlbCwgY2FsbGJhY2ssIGluaXRpYWxpemVDb21wb25lbnRDYWxsYmFjayA9ICgpID0+IHt9KSB7XG4gICAgICB3YWxrKGVsLCBlbCA9PiB7XG4gICAgICAgIC8vIFdlJ3ZlIGhpdCBhIGNvbXBvbmVudC5cbiAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgneC1kYXRhJykpIHtcbiAgICAgICAgICAvLyBJZiBpdCdzIG5vdCB0aGUgY3VycmVudCBvbmUuXG4gICAgICAgICAgaWYgKCFlbC5pc1NhbWVOb2RlKHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBpdCBpZiBpdCdzIG5vdC5cbiAgICAgICAgICAgIGlmICghZWwuX194KSBpbml0aWFsaXplQ29tcG9uZW50Q2FsbGJhY2soZWwpOyAvLyBOb3cgd2UnbGwgbGV0IHRoYXQgc3ViLWNvbXBvbmVudCBkZWFsIHdpdGggaXRzZWxmLlxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbGVtZW50cyhyb290RWwsIGV4dHJhVmFycyA9ICgpID0+IHt9KSB7XG4gICAgICB0aGlzLndhbGtBbmRTa2lwTmVzdGVkQ29tcG9uZW50cyhyb290RWwsIGVsID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgdG91Y2ggc3Bhd25zIGZyb20gZm9yIGxvb3BcbiAgICAgICAgaWYgKGVsLl9feF9mb3Jfa2V5ICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTsgLy8gRG9uJ3QgdG91Y2ggc3Bhd25zIGZyb20gaWYgZGlyZWN0aXZlc1xuXG4gICAgICAgIGlmIChlbC5fX3hfaW5zZXJ0ZWRfbWUgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVFbGVtZW50KGVsLCBleHRyYVZhcnMpO1xuICAgICAgfSwgZWwgPT4ge1xuICAgICAgICBlbC5fX3ggPSBuZXcgQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKTtcbiAgICAgIHRoaXMuZXhlY3V0ZUFuZENsZWFyTmV4dFRpY2tTdGFjayhyb290RWwpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbGVtZW50KGVsLCBleHRyYVZhcnMpIHtcbiAgICAgIC8vIFRvIHN1cHBvcnQgY2xhc3MgYXR0cmlidXRlIG1lcmdpbmcsIHdlIGhhdmUgdG8ga25vdyB3aGF0IHRoZSBlbGVtZW50J3NcbiAgICAgIC8vIG9yaWdpbmFsIGNsYXNzIGF0dHJpYnV0ZSBsb29rZWQgbGlrZSBmb3IgcmVmZXJlbmNlLlxuICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnY2xhc3MnKSAmJiBnZXRYQXR0cnMoZWwsIHRoaXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWwuX194X29yaWdpbmFsX2NsYXNzZXMgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnMoZWwsIGV4dHJhVmFycyk7XG4gICAgICB0aGlzLnJlc29sdmVCb3VuZEF0dHJpYnV0ZXMoZWwsIHRydWUsIGV4dHJhVmFycyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRWxlbWVudHMocm9vdEVsLCBleHRyYVZhcnMgPSAoKSA9PiB7fSkge1xuICAgICAgdGhpcy53YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMocm9vdEVsLCBlbCA9PiB7XG4gICAgICAgIC8vIERvbid0IHRvdWNoIHNwYXducyBmcm9tIGZvciBsb29wIChhbmQgY2hlY2sgaWYgdGhlIHJvb3QgaXMgYWN0dWFsbHkgYSBmb3IgbG9vcCBpbiBhIHBhcmVudCwgZG9uJ3Qgc2tpcCBpdC4pXG4gICAgICAgIGlmIChlbC5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkICYmICFlbC5pc1NhbWVOb2RlKHRoaXMuJGVsKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZUVsZW1lbnQoZWwsIGV4dHJhVmFycyk7XG4gICAgICB9LCBlbCA9PiB7XG4gICAgICAgIGVsLl9feCA9IG5ldyBDb21wb25lbnQoZWwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJOZXh0VGlja1N0YWNrKHJvb3RFbCk7XG4gICAgfVxuXG4gICAgZXhlY3V0ZUFuZENsZWFyTmV4dFRpY2tTdGFjayhlbCkge1xuICAgICAgLy8gU2tpcCBzcGF3bnMgZnJvbSBhbHBpbmUgZGlyZWN0aXZlc1xuICAgICAgaWYgKGVsID09PSB0aGlzLiRlbCAmJiB0aGlzLm5leHRUaWNrU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBXZSBydW4gdGhlIHRpY2sgc3RhY2sgYWZ0ZXIgdGhlIG5leHQgZnJhbWUgdG8gYWxsb3cgYW55XG4gICAgICAgIC8vIHJ1bm5pbmcgdHJhbnNpdGlvbnMgdG8gcGFzcyB0aGUgaW5pdGlhbCBzaG93IHN0YWdlLlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHdoaWxlICh0aGlzLm5leHRUaWNrU3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5uZXh0VGlja1N0YWNrLnNoaWZ0KCkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpIHtcbiAgICAgIC8vIFRoZSBnb2FsIGhlcmUgaXMgdG8gc3RhcnQgYWxsIHRoZSB4LXNob3cgdHJhbnNpdGlvbnNcbiAgICAgIC8vIGFuZCBidWlsZCBhIG5lc3RlZCBwcm9taXNlIGNoYWluIHNvIHRoYXQgZWxlbWVudHNcbiAgICAgIC8vIG9ubHkgaGlkZSB3aGVuIHRoZSBjaGlsZHJlbiBhcmUgZmluaXNoZWQgaGlkaW5nLlxuICAgICAgdGhpcy5zaG93RGlyZWN0aXZlU3RhY2sucmV2ZXJzZSgpLm1hcCh0aGluZyA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICB0aGluZyhmaW5pc2ggPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShmaW5pc2gpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pLnJlZHVjZSgobmVzdGVkUHJvbWlzZSwgcHJvbWlzZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmVzdGVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZpbmlzaCA9PiBmaW5pc2goKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKCgpID0+IHt9KSk7IC8vIFdlJ3ZlIHByb2Nlc3NlZCB0aGUgaGFuZGxlciBzdGFjay4gbGV0J3MgY2xlYXIgaXQuXG5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrID0gW107XG4gICAgICB0aGlzLnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cGRhdGVFbGVtZW50KGVsLCBleHRyYVZhcnMpIHtcbiAgICAgIHRoaXMucmVzb2x2ZUJvdW5kQXR0cmlidXRlcyhlbCwgZmFsc2UsIGV4dHJhVmFycyk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoZWwsIGV4dHJhVmFycykge1xuICAgICAgZ2V0WEF0dHJzKGVsLCB0aGlzKS5mb3JFYWNoKCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnb24nOlxuICAgICAgICAgICAgcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBlbCwgdmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgcmVnaXN0ZXJNb2RlbExpc3RlbmVyKHRoaXMsIGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzb2x2ZUJvdW5kQXR0cmlidXRlcyhlbCwgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlLCBleHRyYVZhcnMpIHtcbiAgICAgIGxldCBhdHRycyA9IGdldFhBdHRycyhlbCwgdGhpcyk7XG4gICAgICBhdHRycy5mb3JFYWNoKCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgaGFuZGxlQXR0cmlidXRlQmluZGluZ0RpcmVjdGl2ZSh0aGlzLCBlbCwgJ3ZhbHVlJywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzLCB0eXBlLCBtb2RpZmllcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdiaW5kJzpcbiAgICAgICAgICAgIC8vIFRoZSA6a2V5IGJpbmRpbmcgb24gYW4geC1mb3IgaXMgc3BlY2lhbCwgaWdub3JlIGl0LlxuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RlbXBsYXRlJyAmJiB2YWx1ZSA9PT0gJ2tleScpIHJldHVybjtcbiAgICAgICAgICAgIGhhbmRsZUF0dHJpYnV0ZUJpbmRpbmdEaXJlY3RpdmUodGhpcywgZWwsIHZhbHVlLCBleHByZXNzaW9uLCBleHRyYVZhcnMsIHR5cGUsIG1vZGlmaWVycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgaGFuZGxlVGV4dERpcmVjdGl2ZShlbCwgb3V0cHV0LCBleHByZXNzaW9uKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgICBoYW5kbGVIdG1sRGlyZWN0aXZlKHRoaXMsIGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGhhbmRsZVNob3dEaXJlY3RpdmUodGhpcywgZWwsIG91dHB1dCwgbW9kaWZpZXJzLCBpbml0aWFsVXBkYXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaWYnOlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGFsc28gaGFzIHgtZm9yIG9uIGl0LCBkb24ndCBwcm9jZXNzIHgtaWYuXG4gICAgICAgICAgICAvLyBXZSB3aWxsIGxldCB0aGUgXCJ4LWZvclwiIGRpcmVjdGl2ZSBoYW5kbGUgdGhlIFwiaWZcImluZy5cbiAgICAgICAgICAgIGlmIChhdHRycy5zb21lKGkgPT4gaS50eXBlID09PSAnZm9yJykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGhhbmRsZUlmRGlyZWN0aXZlKHRoaXMsIGVsLCBvdXRwdXQsIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2Zvcic6XG4gICAgICAgICAgICBoYW5kbGVGb3JEaXJlY3RpdmUodGhpcywgZWwsIGV4cHJlc3Npb24sIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2Nsb2FrJzpcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgneC1jbG9haycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHJldHVybiBzYWZlckV2YWwoZXhwcmVzc2lvbiwgdGhpcy4kZGF0YSwgX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycygpKSwge30sIHtcbiAgICAgICAgJGRpc3BhdGNoOiB0aGlzLmdldERpc3BhdGNoRnVuY3Rpb24oZWwpXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgZXZhbHVhdGVDb21tYW5kRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHJldHVybiBzYWZlckV2YWxOb1JldHVybihleHByZXNzaW9uLCB0aGlzLiRkYXRhLCBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgZXh0cmFWYXJzKCkpLCB7fSwge1xuICAgICAgICAkZGlzcGF0Y2g6IHRoaXMuZ2V0RGlzcGF0Y2hGdW5jdGlvbihlbClcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBnZXREaXNwYXRjaEZ1bmN0aW9uKGVsKSB7XG4gICAgICByZXR1cm4gKGV2ZW50LCBkZXRhaWwgPSB7fSkgPT4ge1xuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudCwge1xuICAgICAgICAgIGRldGFpbCxcbiAgICAgICAgICBidWJibGVzOiB0cnVlXG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGlzdGVuRm9yTmV3RWxlbWVudHNUb0luaXRpYWxpemUoKSB7XG4gICAgICBjb25zdCB0YXJnZXROb2RlID0gdGhpcy4kZWw7XG4gICAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBGaWx0ZXIgb3V0IG11dGF0aW9ucyB0cmlnZ2VyZWQgZnJvbSBjaGlsZCBjb21wb25lbnRzLlxuICAgICAgICAgIGNvbnN0IGNsb3Nlc3RQYXJlbnRDb21wb25lbnQgPSBtdXRhdGlvbnNbaV0udGFyZ2V0LmNsb3Nlc3QoJ1t4LWRhdGFdJyk7XG4gICAgICAgICAgaWYgKCEoY2xvc2VzdFBhcmVudENvbXBvbmVudCAmJiBjbG9zZXN0UGFyZW50Q29tcG9uZW50LmlzU2FtZU5vZGUodGhpcy4kZWwpKSkgY29udGludWU7XG5cbiAgICAgICAgICBpZiAobXV0YXRpb25zW2ldLnR5cGUgPT09ICdhdHRyaWJ1dGVzJyAmJiBtdXRhdGlvbnNbaV0uYXR0cmlidXRlTmFtZSA9PT0gJ3gtZGF0YScpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhd0RhdGEgPSBzYWZlckV2YWwobXV0YXRpb25zW2ldLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3gtZGF0YScpIHx8ICd7fScsIHtcbiAgICAgICAgICAgICAgJGVsOiB0aGlzLiRlbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhyYXdEYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLiRkYXRhW2tleV0gIT09IHJhd0RhdGFba2V5XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGFba2V5XSA9IHJhd0RhdGFba2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxIHx8IG5vZGUuX194X2luc2VydGVkX21lKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgaWYgKG5vZGUubWF0Y2hlcygnW3gtZGF0YV0nKSAmJiAhbm9kZS5fX3gpIHtcbiAgICAgICAgICAgICAgICBub2RlLl9feCA9IG5ldyBDb21wb25lbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRWxlbWVudHMobm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldFJlZnNQcm94eSgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciByZWZPYmogPSB7fTtcbiAgICAgIC8vIE9uZSBvZiB0aGUgZ29hbHMgb2YgdGhpcyBpcyB0byBub3QgaG9sZCBlbGVtZW50cyBpbiBtZW1vcnksIGJ1dCByYXRoZXIgcmUtZXZhbHVhdGVcbiAgICAgIC8vIHRoZSBET00gd2hlbiB0aGUgc3lzdGVtIG5lZWRzIHNvbWV0aGluZyBmcm9tIGl0LiBUaGlzIHdheSwgdGhlIGZyYW1ld29yayBpcyBmbGV4aWJsZSBhbmRcbiAgICAgIC8vIGZyaWVuZGx5IHRvIG91dHNpZGUgRE9NIGNoYW5nZXMgZnJvbSBsaWJyYXJpZXMgbGlrZSBWdWUvTGl2ZXdpcmUuXG4gICAgICAvLyBGb3IgdGhpcyByZWFzb24sIEknbSB1c2luZyBhbiBcIm9uLWRlbWFuZFwiIHByb3h5IHRvIGZha2UgYSBcIiRyZWZzXCIgb2JqZWN0LlxuXG4gICAgICByZXR1cm4gbmV3IFByb3h5KHJlZk9iaiwge1xuICAgICAgICBnZXQob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJyRpc0FscGluZVByb3h5JykgcmV0dXJuIHRydWU7XG4gICAgICAgICAgdmFyIHJlZjsgLy8gV2UgY2FuJ3QganVzdCBxdWVyeSB0aGUgRE9NIGJlY2F1c2UgaXQncyBoYXJkIHRvIGZpbHRlciBvdXQgcmVmcyBpblxuICAgICAgICAgIC8vIG5lc3RlZCBjb21wb25lbnRzLlxuXG4gICAgICAgICAgc2VsZi53YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMoc2VsZi4kZWwsIGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3gtcmVmJykgJiYgZWwuZ2V0QXR0cmlidXRlKCd4LXJlZicpID09PSBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICByZWYgPSBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgQWxwaW5lID0ge1xuICAgIHZlcnNpb246IFwiMi43LjBcIixcbiAgICBwYXVzZU11dGF0aW9uT2JzZXJ2ZXI6IGZhbHNlLFxuICAgIG1hZ2ljUHJvcGVydGllczoge30sXG4gICAgb25Db21wb25lbnRJbml0aWFsaXplZHM6IFtdLFxuICAgIG9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWRzOiBbXSxcbiAgICBpZ25vcmVGb2N1c2VkRm9yVmFsdWVCaW5kaW5nOiBmYWxzZSxcbiAgICBzdGFydDogYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgICAgIGF3YWl0IGRvbVJlYWR5KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlzY292ZXJDb21wb25lbnRzKGVsID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pOyAvLyBJdCdzIGVhc2llciBhbmQgbW9yZSBwZXJmb3JtYW50IHRvIGp1c3Qgc3VwcG9ydCBUdXJib2xpbmtzIHRoYW4gbGlzdGVuXG4gICAgICAvLyB0byBNdXRhdGlvbk9ic2VydmVyIG11dGF0aW9ucyBhdCB0aGUgZG9jdW1lbnQgbGV2ZWwuXG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0dXJib2xpbmtzOmxvYWRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoZWwgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudChlbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmxpc3RlbkZvck5ld1VuaW5pdGlhbGl6ZWRDb21wb25lbnRzQXRSdW5UaW1lKGVsID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGlzY292ZXJDb21wb25lbnRzOiBmdW5jdGlvbiBkaXNjb3ZlckNvbXBvbmVudHMoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHJvb3RFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbeC1kYXRhXScpO1xuICAgICAgcm9vdEVscy5mb3JFYWNoKHJvb3RFbCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJvb3RFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHM6IGZ1bmN0aW9uIGRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoY2FsbGJhY2ssIGVsID0gbnVsbCkge1xuICAgICAgY29uc3Qgcm9vdEVscyA9IChlbCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbCgnW3gtZGF0YV0nKTtcbiAgICAgIEFycmF5LmZyb20ocm9vdEVscykuZmlsdGVyKGVsID0+IGVsLl9feCA9PT0gdW5kZWZpbmVkKS5mb3JFYWNoKHJvb3RFbCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJvb3RFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGxpc3RlbkZvck5ld1VuaW5pdGlhbGl6ZWRDb21wb25lbnRzQXRSdW5UaW1lOiBmdW5jdGlvbiBsaXN0ZW5Gb3JOZXdVbmluaXRpYWxpemVkQ29tcG9uZW50c0F0UnVuVGltZShjYWxsYmFjaykge1xuICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBpZiAodGhpcy5wYXVzZU11dGF0aW9uT2JzZXJ2ZXIpIHJldHVybjtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAvLyBEaXNjYXJkIG5vbi1lbGVtZW50IG5vZGVzIChsaWtlIGxpbmUtYnJlYWtzKVxuICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuOyAvLyBEaXNjYXJkIGFueSBjaGFuZ2VzIGhhcHBlbmluZyB3aXRoaW4gYW4gZXhpc3RpbmcgY29tcG9uZW50LlxuICAgICAgICAgICAgICAvLyBUaGV5IHdpbGwgdGFrZSBjYXJlIG9mIHRoZW1zZWx2ZXMuXG5cbiAgICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50RWxlbWVudCAmJiBub2RlLnBhcmVudEVsZW1lbnQuY2xvc2VzdCgnW3gtZGF0YV0nKSkgcmV0dXJuO1xuICAgICAgICAgICAgICB0aGlzLmRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoZWwgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudChlbCk7XG4gICAgICAgICAgICAgIH0sIG5vZGUucGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXROb2RlLCBvYnNlcnZlck9wdGlvbnMpO1xuICAgIH0sXG4gICAgaW5pdGlhbGl6ZUNvbXBvbmVudDogZnVuY3Rpb24gaW5pdGlhbGl6ZUNvbXBvbmVudChlbCkge1xuICAgICAgaWYgKCFlbC5fX3gpIHtcbiAgICAgICAgLy8gV3JhcCBpbiBhIHRyeS9jYXRjaCBzbyB0aGF0IHdlIGRvbid0IHByZXZlbnQgb3RoZXIgY29tcG9uZW50c1xuICAgICAgICAvLyBmcm9tIGluaXRpYWxpemluZyB3aGVuIG9uZSBjb21wb25lbnQgY29udGFpbnMgYW4gZXJyb3IuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZWwuX194ID0gbmV3IENvbXBvbmVudChlbCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xvbmU6IGZ1bmN0aW9uIGNsb25lKGNvbXBvbmVudCwgbmV3RWwpIHtcbiAgICAgIGlmICghbmV3RWwuX194KSB7XG4gICAgICAgIG5ld0VsLl9feCA9IG5ldyBDb21wb25lbnQobmV3RWwsIGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhZGRNYWdpY1Byb3BlcnR5OiBmdW5jdGlvbiBhZGRNYWdpY1Byb3BlcnR5KG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm1hZ2ljUHJvcGVydGllc1tuYW1lXSA9IGNhbGxiYWNrO1xuICAgIH0sXG4gICAgb25Db21wb25lbnRJbml0aWFsaXplZDogZnVuY3Rpb24gb25Db21wb25lbnRJbml0aWFsaXplZChjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbkNvbXBvbmVudEluaXRpYWxpemVkcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uIG9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWQoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25CZWZvcmVDb21wb25lbnRJbml0aWFsaXplZHMucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xuXG4gIGlmICghaXNUZXN0aW5nKCkpIHtcbiAgICB3aW5kb3cuQWxwaW5lID0gQWxwaW5lO1xuXG4gICAgaWYgKHdpbmRvdy5kZWZlckxvYWRpbmdBbHBpbmUpIHtcbiAgICAgIHdpbmRvdy5kZWZlckxvYWRpbmdBbHBpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuQWxwaW5lLnN0YXJ0KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LkFscGluZS5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBBbHBpbmU7XG5cbn0pKSk7XG4iLCAiaW1wb3J0IFwiYWxwaW5lanNcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICB0b2dnbGVOYXZiYXI6IHR5cGVvZiB0b2dnbGVOYXZiYXI7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlTmF2YmFyKGNvbGxhcHNlSUQ6IHN0cmluZykge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb2xsYXBzZUlEKT8uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29sbGFwc2VJRCk/LmNsYXNzTGlzdC50b2dnbGUoXCJibG9ja1wiKTtcbn1cblxud2luZG93LnRvZ2dsZU5hdmJhciA9IHRvZ2dsZU5hdmJhcjtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUEsSUFBQyxVQUFVLFFBQVE7QUFDakIsYUFBTyxZQUFZLFlBQVksT0FBTyxXQUFXLGNB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
