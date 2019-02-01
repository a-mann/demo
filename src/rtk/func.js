export const makeDateStringFromMonthYear = (monthyear) => {
  return `${monthyear}-01`;
};

export const calcPercents = (item, max) => {
  return Math.round(item * 100 / max);
};

export const getColumnsMaxData = (columns) => {
  let data = columns.map((col) => {
    return col.value;
  });
  return Math.max(...data);
};