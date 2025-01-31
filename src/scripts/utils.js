export function shuffleArray(a) {
  let array = a;
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function setDebug(isDebug) {
  if (isDebug) {
    window.debug = {
      log: window.console.log.bind(window.console, "log: %s"),
      error: window.console.error.bind(window.console, "error: %s"),
      info: window.console.info.bind(window.console, "info: %s"),
      warn: window.console.warn.bind(window.console, "warn: %s"),
    };
  } else {
    var __no_op = function () {};

    window.debug = {
      log: __no_op,
      error: __no_op,
      warn: __no_op,
      info: __no_op,
    };
  }
}
