//@ts-nocheck
export function bind(fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
}

export function addListener(target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent('on' + eventName, callback);
}

export function setSelectorByValue(selector, value) {
  for (let i = 0; i < selector.options.length; i++) {
    const option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
}

export class CountryProvinceSelector {
  constructor(country_domid, province_domid, options) {
    this.countryEl = document.getElementById(country_domid);
    this.provinceEl = document.getElementById(province_domid);
    this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

    addListener(this.countryEl, 'change', bind(this.countryHandler, this));

    this.initCountry();
    this.initProvince();
  }

  initCountry() { }
  initProvince() { }
  countryHandler(e) { }
  clearOptions(selector) { }
  setOptions(selector, values) { }
}
