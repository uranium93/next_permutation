const assert = require("assert").strict;

function processWord(w) {
  let weaklyIncresingSuffix = "";
  let weaklyIncresingSuffixIndex = -1;
  for (let i = w.length - 1; i > 0; i--) {
    const currentChar = w.charAt(i);
    const previousChar = w.charAt(i - 1);
    weaklyIncresingSuffix = currentChar + weaklyIncresingSuffix;
    if (currentChar > previousChar) {
      weaklyIncresingSuffix = previousChar + weaklyIncresingSuffix;
      weaklyIncresingSuffixIndex = i;
      break;
    }
  }

  // lenght === 1 means only the first character was added so there's no suffix found
  return {
    weaklyIncresingSuffix:
      weaklyIncresingSuffix.length === 1 ? "" : weaklyIncresingSuffix,
    weaklyIncresingSuffixIndex,
    root: w.slice(0, weaklyIncresingSuffixIndex - 1),
  };
}

function swapChars(w, pos1, pos2) {
  const chars = w.split("");
  const temp = chars[pos1];
  chars[pos1] = chars[pos2];
  chars[pos2] = temp;
  return chars.join("");
}

function getFirstBiggerCharIndex(s) {
  let index = -1;
  for (let i = 1; i < s.length; i++) {
    if (
      s.charAt(i) > s.charAt(0) &&
      (index === -1 || s.charAt(i) <= s.charAt(index))
    ) {
      index = i;
    }
  }
  return index;
}

function reversTail(s) {
  let result = s.charAt(0);
  for (let i = s.length - 1; i > 0; i--) {
    result += s.charAt(i);
  }
  return result;
}

function nextPermutation(w) {
  const {
    weaklyIncresingSuffix,
    root,
    weaklyIncresingSuffixIndex,
  } = processWord(w);
  if (!weaklyIncresingSuffix.length || weaklyIncresingSuffixIndex < 0) {
    return null;
  }
  const swappedSuffix = swapChars(
    weaklyIncresingSuffix,
    0,
    getFirstBiggerCharIndex(weaklyIncresingSuffix)
  );
  return root + reversTail(swappedSuffix);
}

assert.equal(
  nextPermutation("zedawdvyyfumwpupuinbdbfndyehircmylbaowuptgmw"),
  "zedawdvyyfumwpupuinbdbfndyehircmylbaowuptgwm"
);

assert.equal(nextPermutation("dcba"), null);
console.log("Success");
