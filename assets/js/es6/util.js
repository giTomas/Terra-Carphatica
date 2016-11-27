  // utils
  const getType = (el) => Object.prototype.toString.call(el).slice(8, -1);

  const isObject = function(elem) {
      return getType(elem) === 'Object';
  };

  const isFunction = function(elem){
    return getType(elem) === "Function";
  };

  function forEachEl_2(els, fn) {
      const len = els.length;
      for (let i = 0; i < len; i++ ) {
          if (els[i]) {
              els[i].addEventListener('click', fn, false);
          }
      }
  }

  function forEachEl(els, fn){
    for (let el of els) { if (el) {el.addEventListener('click', fn, false);}}
  }

  function findData(arr, prop, data){
      for (let i = 0; i < arr.length; i++) {
          if(arr[i][prop] === data) {
              return arr[i];
          }
      }
  }

 // definitly in this case this is better, it's faster, more concise, not so complicated
 // BEAWARE probably if array contains more identical properties it will return array
 // traverse whole array callback is executed for every item in array
 // IE not support
 function findValue({arr, prop='id', data}) {
    return arr.find((el, i) =>  el[prop] === data);
  }

  //NEAT!!!
  // maps array -> make new array from properties
  // indexing array of these properties
  // use index to find object in array
  // probably works in most browsers
 function findValueByIndex(arr, prop, val) {
    return arr[arr.map( (el)=> el[prop] ).indexOf(val)];
  }

  function findItem(arr, prop, val) {
    return arr.reduce((x, y)=> x[prop] === val ? x : y);
  }

  //haluz ale je to dost DIRTY; Note comma operator!
 function findValue2(arr, prop, data) {
    let result = null;
    arr.some((el, i) =>  el[prop] === data ? ((result = el), true) : false);
    return result;
  }

//function overloading

  const dispatch = function(...fns) {

    return function(...args){
      for (let fn of fns) {
        let result = fn(...args);
        if (exists(result)) {return result;}
        // return result !== undefined ? result : undefined;
      }
    };
  };
  // find nevrati vysledok funkcie, ale iba funkciu samotnu, ktora splna podmienku , mozno by sa to dalo riesit data streamom!
  // map find do the work!!
  // interesting possiblity to do this with filter function returns array of results. Could by applicated to functions that works with same args
  // rozdiel oproti function composition vyberie sa jedna funkcia, ktora sa pouzije
  // stream 1) find 2) execute function ale tym padom bude funckia exec dvakrat, ale na druhej strane nemusia byt exec vsetky funckie ako pri map-filter
  const dispatch_f = (...fns) => (...args) => {
    return [...fns].map(fn => fn(...args)).find((result) => result !== undefined);
  };

  // 1) find 2) execute
  // Could be refactored?
  const dispatch_f2 = (...fns) => (...args) =>
    [...fns].map(fn => fn(...args)).find((result) => result !== undefined);


  function notExists(value){
    return value === undefined;
  }
  function exists(value){
    return value !== undefined;
  }

//function composition
 const compose = (...funcs) => (value) => funcs.reduceRight((v, fn) => fn(v), value);
 const pipe = (...funcs) => (value) => funcs.reduce((v, fn) => fn(v), value);


 //curry
 function curry(fn, ...args1) {
   return (...args2) => fn(...args1, ...args2);
 }

 //parial
