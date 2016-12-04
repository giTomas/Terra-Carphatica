const getType = (el) => Object.prototype.toString.call(el).slice(8, -1);

const isObject = function(elem) {
    return getType(elem) === 'Object';
};

const isFunction = function(elem){
  return getType(elem) === "Function";
};

export const compose = (...funcs) => value =>
                          funcs.reduceRight((v, fn) => fn(v), value);

export const pipe = (...funcs) => value =>
                        funcs.reduce((v, fn) => fn(v), value);

export const dispatch_f2 = (...fns) => (...args) =>
  [...fns].map(fn => fn(...args)).find((result) => result !== undefined);

//curry
function curry(fn, ...args1) {
  return (...args2) => fn(...args1, ...args2);
}

const curry2 = (fn, ...args1) => (...args2) => fn(...args1, ...args2)

const partial = fn => (...args) => fn.bind(null, ...args);
