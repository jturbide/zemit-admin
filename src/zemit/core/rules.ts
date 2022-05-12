import moment from 'moment';

export default class Rules {
  static required (value: Array<any> | string = ''): boolean {
    return (Array.isArray(value) && value.length > 0) || (typeof value === 'string' && !!value);
  }

  static email (value = ''): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  }

  static min (min = 8, value = ''): boolean {
    return (value && value.length >= min) || false;
  }

  static max (min = 16, value = ''): boolean {
    return (value && value.length <= min) || false;
  }

  static between(min = 0, max = 0, value = '') {
    return this.min(min, value) && this.max(max, value);
  }

  static identical (value = '', compare = ''): boolean {
    return value === compare;
  }

  static digit(value:string|number = ''): boolean {
    return Number.isInteger(Number(value)) && value !== null;
  }

  static date(value:string, format = 'YYYY-MM-DD') : boolean {
    const v = moment(value, format);
    return v.isValid()
  }

  static boolean(value:boolean|string|number = '') : boolean {
    return typeof value === 'boolean' || value === '1' || value === '0' || value === 1 || value === 0;
  }

  static includes(value:string|number, domain:Array<string|number>) : boolean {
    return domain.includes(value);
  }

  static excludes(value:string|number, domain:Array<string|number>) : boolean {
    return !domain.includes(value);
  }

  // The password is at least 8 characters long (?=.{8,}).
  // The password has at least one uppercase letter (?=.*[A-Z]).
  // The password has at least one lowercase letter (?=.*[a-z]).
  // The password has at least one digit (?=.*[0-9]).
  // The password has at least one special character ([^A-Za-z0-9]).
  // Strong: The password has to meet all the requirements.
  static strongPassword(value:string) {
    return (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value));
  }

  // If the password is at least six characters long and meets all the other requirements, or has no digit but meets the rest of the requirements.
  static mediumPassword(value:string) {
    return (/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(value));
  }

  static password(value:string) {
    return this.between(8, 36) && this.hasLowerCase(value) && this.hasUpperCase(value) && this.hasDigit(value);
  }

  static hasLowerCase(value:string) {
    return (/[a-z]/.test(value));
  }

  static hasUpperCase(value:string) {
    return (/[A-Z]/.test(value));
  }

  static hasDigit(value:string) {
    return (/[0-9]/.test(value));
  }

  static hasSpecialChar(value:string) {
    return (/[^A-Za-z0-9]/.test(value));
  }

  // ^[a-zA-Z0-9]+$
  static alphanumeric(value:string) {
    return (/[^\w]|_/g.test(value));
  }

}
