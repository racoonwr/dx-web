// 标记
export const tokenTag = "*t*o*k*e*n*";
export const detailTag = "*d*e*t*a*i*l*";

// 验证正则
export const regs = {
  mobile: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
};

//替换空字符
export const replaceSpace = (val = "") => {
  return val.replace(/\s+/g, "");
};

//是否包含元素
export const closest = (el, selector) => {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};
