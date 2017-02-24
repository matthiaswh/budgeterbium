import momentjs from 'moment';

export const moment = (date, format) => {
  format = format || 'MMMM YYYY';
  return momentjs(date).format(format);
};
