/* eslint-disable no-useless-escape */

import { Validation } from '../types';

const EMAIL_VALIDATION_REGEX = RegExp(
  '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$',
);
const MONEY_VALIDATION_REGEX = RegExp('^\\d*(\\.\\d{1,2})?$');
const NAME_VALIDATION_REGEX = RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '’-]*$");
const TEXT_VALIDATION_REGEX = RegExp(
  '^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ~`!@#£€$%^&*(){}\\[\\];:"\'’<,.>?\\/|_+=\\\\-]*$',
);
const MULTILINE_TEXT_VALIDATION_REGEX = RegExp(
  '^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \n~`!@#£€$%^&*(){}\\[\\];:"\'’<,.>?\\/|_+=\\\\-]*$',
);

const PASSWORD_VALIDATION_REGEX = RegExp(
  '^^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
);
const PHONE_VALIDATION_REGEX = RegExp('^(0)([0-9]){9,10}$');
const POSTCODE_VALIDATION_REGEX = RegExp(
  '^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$',
);
const VAT_VALIDATION_REGEX = RegExp(
  '(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})',
);

function validateRegex(
  regex: RegExp,
  errorMessage: string,
): Validation.Function<string> {
  return (text = '') => {
    return !regex.test(text) && errorMessage;
  };
}

function validateLength(
  length: number,
  errorMessage = 'Too short',
): Validation.Function<string> {
  return (text = '') => text.length < length && errorMessage;
}

const validateEmail = validateRegex(
  EMAIL_VALIDATION_REGEX,
  'Not an email address',
);

const validateMoney = validateRegex(MONEY_VALIDATION_REGEX, 'Invalid value');

const validateName = validateRegex(NAME_VALIDATION_REGEX, 'Invalid name');
const validateTextOnly = validateRegex(TEXT_VALIDATION_REGEX, 'Invalid text');
const validateMultilineText = validateRegex(
  MULTILINE_TEXT_VALIDATION_REGEX,
  'Invalid text',
);

const validatePassword = validateRegex(
  PASSWORD_VALIDATION_REGEX,
  'Invalid password',
);

const validatePhone = validateRegex(
  PHONE_VALIDATION_REGEX,
  'Not a phone number',
);

const validatePostcode = validateRegex(
  POSTCODE_VALIDATION_REGEX,
  'Not a postcode',
);

const validateVat = validateRegex(VAT_VALIDATION_REGEX, 'Not a VAT number');

function validateCopy(
  copyString: string,
  errorMessage: string,
): Validation.Function<string> {
  return (text = '') => text !== copyString && errorMessage;
}

function validateNumber({
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  maxDecimals,
}: {
  greaterThan?: number;
  greaterThanOrEqual?: number;
  lessThan?: number;
  lessThanOrEqual?: number;
  maxDecimals?: number;
}): Validation.Function<string> {
  return (text = '') => {
    if (isNaN(Number(text)) || text?.slice(-1) === '.') {
      console.log(12);
      return 'Invalid number';
    }

    if (typeof lessThanOrEqual === 'number' && Number(text) > lessThanOrEqual) {
      return `Must be less than or equal to ${lessThanOrEqual.toString()}`;
    }

    if (
      typeof greaterThanOrEqual === 'number' &&
      Number(text) < greaterThanOrEqual
    ) {
      return `Must be greater than or equal to ${greaterThanOrEqual.toString()}`;
    }

    if ((lessThan === 0 || greaterThan === 0) && Number(text) === 0) {
      return 'Cannot be zero';
    }

    if (lessThan === 0 && Number(text) > 0) {
      return 'Must be negative';
    }

    if (greaterThan === 0 && Number(text) < 0) {
      return 'Cannot be negative';
    }

    if (greaterThan && Number(text) <= greaterThan) {
      return `Must be greater than ${greaterThan.toString()}`;
    }

    if (lessThan && Number(text) >= lessThan) {
      return `Must be less than ${lessThan.toString()}`;
    }

    if (maxDecimals === 0 && Number(text) % 1 !== 0) {
      return 'Cannot have decimals';
    }
    if (maxDecimals) {
      const decimalPosition = text.indexOf('.');
      if (decimalPosition !== -1) {
        const decimals = text.length - decimalPosition - 1;
        if (decimals > maxDecimals) {
          return 'Too many decimal places';
        }
      }
    }
    return false;
  };
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function validateDate({
  canBeToday,
  isFuture,
  isPast,
  before,
  after,
}: {
  canBeToday?: boolean;
  isFuture?: boolean;
  isPast?: boolean;
  before?: Date;
  after?: Date;
}): Validation.Function<Date | null> {
  return (date) => {
    if (!date) {
      return false;
    }

    const time = date.getTime();

    if (
      canBeToday &&
      date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      return false;
    }

    if (
      canBeToday === false &&
      date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    ) {
      return 'Cannot be today';
    }

    if (isFuture && time < new Date().valueOf()) {
      return 'Needs to be in the future';
    }

    if (isPast && time >= new Date().valueOf()) {
      return 'Needs to be in the past';
    }

    if (before && time > new Date(before).valueOf()) {
      return `Needs to be before ${before.toLocaleDateString()}`;
    }

    if (after && time < new Date(after).valueOf()) {
      return `Needs to be after ${after.toLocaleDateString()}`;
    }

    return false;
  };
}

export const validators = {
  copy: validateCopy,
  date: validateDate,
  email: validateEmail,
  length: validateLength,
  money: validateMoney,
  multiLineText: validateMultilineText,
  name: validateName,
  number: validateNumber,
  password: validatePassword,
  phone: validatePhone,
  postcode: validatePostcode,
  regex: validateRegex,
  textOnly: validateTextOnly,
  vat: validateVat,
};
