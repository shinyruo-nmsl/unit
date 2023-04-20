/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInstance": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_0__.createInstance),
/* harmony export */   "effect": () => (/* reexport safe */ _reactive__WEBPACK_IMPORTED_MODULE_1__.effect),
/* harmony export */   "reactive": () => (/* reexport safe */ _reactive__WEBPACK_IMPORTED_MODULE_1__.reactive),
/* harmony export */   "renderCommonElement": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_0__.renderCommonElement),
/* harmony export */   "renderCustomElement": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_0__.renderCustomElement),
/* harmony export */   "renderNativeElement": () => (/* reexport safe */ _element__WEBPACK_IMPORTED_MODULE_0__.renderNativeElement)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInstance": () => (/* binding */ createInstance),
/* harmony export */   "renderCommonElement": () => (/* binding */ renderCommonElement),
/* harmony export */   "renderCustomElement": () => (/* binding */ renderCustomElement),
/* harmony export */   "renderNativeElement": () => (/* binding */ renderNativeElement)
/* harmony export */ });
/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function hasInit(ins) {
    return !!ins.element;
}
function isCustomElement(el) {
    return !(typeof el.type === 'string');
}
function patchChildren(oldChildren, newChildren, container) {
    // it is a simple realization
    container.innerHTML = '';
    if (typeof newChildren === 'string') {
        container.innerHTML = newChildren;
    }
    else {
        newChildren.forEach((child) => {
            if (isCustomElement(child) && Array.isArray(oldChildren)) {
                const oldChild = oldChildren.find((c) => isCustomElement(c) && c.hash === child.hash);
                if (oldChild) {
                    ;
                    child.instance = oldChild.instance;
                }
            }
            renderCommonElement(child, container);
        });
    }
}
function createInstance(el, container) {
    const reactiveData = (0,_reactive__WEBPACK_IMPORTED_MODULE_0__.reactive)(el.type.data());
    const props = el.type.props.reduce((obj, prop) => {
        return { ...obj, [prop]: el.props[prop] };
    }, {});
    const methods = el.type.methods;
    const instance = {
        data: reactiveData,
        props,
        methods,
        $emit(targetName, ...args) {
            ;
            this.props['@' + targetName](...args);
        },
    };
    const context = new Proxy(instance, {
        get(target, key) {
            if (key in target.data) {
                return target.data[key];
            }
            if (key in instance.props) {
                return target.props[key];
            }
            if (key in instance.methods) {
                return target.methods[key];
            }
            return target[key];
        },
        set(target, key, newval) {
            target.data[key] = newval;
            return target.data[key];
        },
    });
    return {
        element: null,
        render() {
            const newEl = el.type.createElement.call(context);
            if (!hasInit(this)) {
                renderCommonElement(newEl, container);
            }
            else if (isCustomElement(this.element)) {
                ;
                newEl.instance = this.element.instance;
                renderCommonElement(newEl, container);
            }
            else {
                ;
                newEl.dom = this.element.dom;
                container.appendChild(newEl.dom);
                patchChildren(this.element.children, newEl.children, this.element.dom);
            }
            this.element = newEl;
        },
    };
}
function renderNativeElement(el, container) {
    el.dom = document.createElement(el.type);
    container.appendChild(el.dom);
    if (typeof el.children === 'string') {
        el.dom.textContent = el.children;
    }
    else {
        el.children.forEach((child) => renderCommonElement(child, el.dom));
    }
    Object.keys(el.props).forEach((eventName) => {
        if (eventName.startsWith('@')) {
            el.dom.addEventListener(eventName.slice(1), el.props[eventName]);
        }
    });
}
function renderCustomElement(el, container) {
    if (!el.instance) {
        el.instance = createInstance(el, container);
    }
    (0,_reactive__WEBPACK_IMPORTED_MODULE_0__.effect)(() => el.instance.render());
}
function renderCommonElement(el, container) {
    if (isCustomElement(el)) {
        renderCustomElement(el, container);
    }
    else {
        renderNativeElement(el, container);
    }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "effect": () => (/* binding */ effect),
/* harmony export */   "reactive": () => (/* binding */ reactive)
/* harmony export */ });
function reactive(obj) {
    const observerMap = {};
    return new Proxy(obj, {
        get(target, key, receiver) {
            track(key, observerMap);
            const value = Reflect.get(target, key, receiver);
            if (typeof value === 'object' && value !== null) {
                return reactive(value);
            }
            return value;
        },
        set(target, key, newVal, receiver) {
            const value = Reflect.set(target, key, newVal, receiver);
            trigger(key, observerMap);
            return value;
        },
    });
}
let currentEffect;
function track(key, observerMap) {
    if (!observerMap[key]) {
        observerMap[key] = [];
    }
    observerMap[key].push(currentEffect);
}
function trigger(key, observerMap) {
    if (observerMap[key]) {
        observerMap[key].forEach((fn) => fn());
    }
}
function effect(fn) {
    currentEffect = fn;
    currentEffect();
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "humanCfg": () => (/* binding */ humanCfg),
/* harmony export */   "humanInstanceEl": () => (/* binding */ humanInstanceEl)
/* harmony export */ });
/* harmony import */ var _cat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

const humanCfg = {
    data() {
        return {
            name: 'Bridge',
            age: 2,
        };
    },
    props: ['father', 'mother'],
    methods: {
        laugh(v) {
            alert(v);
        },
        growUp() {
            this.age++;
            alert(this.age);
        },
    },
    createElement() {
        return {
            dom: null,
            type: 'div',
            props: {},
            children: [
                {
                    dom: null,
                    type: 'div',
                    props: {},
                    children: `my age is ${this.age}, my father is ${this.father}, my mother is ${this.mother}`,
                },
                {
                    dom: null,
                    type: 'button',
                    props: {
                        '@click': this.growUp.bind(this),
                    },
                    children: '点我长大',
                },
                {
                    hash: 'CAT_1',
                    type: _cat__WEBPACK_IMPORTED_MODULE_0__.catCfg,
                    props: {
                        owner: this.father,
                        '@laugh': this.laugh.bind(this),
                    },
                    instance: null,
                },
            ],
        };
    },
};
const humanInstanceEl = {
    hash: 'HUMAN_1',
    type: humanCfg,
    props: {
        father: 'jim',
        mother: 'viven',
    },
    instance: null,
};


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "catCfg": () => (/* binding */ catCfg)
/* harmony export */ });
const catCfg = {
    data() {
        return {
            name: 'xiangguo',
            age: 5,
        };
    },
    props: ['owner', '@laugh'],
    methods: {
        laugh() {
            this.$emit('laugh', 'miaomiao~');
        },
        growUp() {
            this.age++;
        },
    },
    createElement() {
        return {
            dom: null,
            type: 'div',
            props: {},
            children: [
                {
                    dom: null,
                    type: 'div',
                    props: {},
                    children: `my name is ${this.name}, my age is ${this.age}, my owner is ${this.owner}`,
                },
                {
                    dom: null,
                    type: 'button',
                    props: {
                        '@click': this.laugh.bind(this),
                    },
                    children: '点我^_^',
                },
                {
                    dom: null,
                    type: 'button',
                    props: {
                        '@click': this.growUp.bind(this),
                    },
                    children: '点我++',
                },
            ],
        };
    },
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _human__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


(0,_util__WEBPACK_IMPORTED_MODULE_0__.renderCommonElement)(_human__WEBPACK_IMPORTED_MODULE_1__.humanInstanceEl, document.getElementById('app'));

})();

/******/ })()
;