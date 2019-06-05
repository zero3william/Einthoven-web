export const format = (_date, arg = 0) => {
  const year = _date.getFullYear();
  const month =
    _date.getMonth() <= 9 ? `0${_date.getMonth() + 1}` : _date.getMonth() + 1;
  const date = _date.getDate() <= 9 ? `0${_date.getDate()}` : _date.getDate();
  const hour =
    _date.getHours() <= 9 ? `0${_date.getHours()}` : _date.getHours();
  const minute =
    _date.getMinutes() <= 9 ? `0${_date.getMinutes()}` : _date.getMinutes();
  const second =
    _date.getSeconds() <= 9 ? `0${_date.getSeconds()}` : _date.getSeconds();
  const timezone =
    _date.getTimezoneOffset() / -60 >= 0 ?
    `+${_date.getTimezoneOffset() / -60}` :
    `-${_date.getTimezoneOffset() / -60}`;
  switch (arg) {
    case 1:
      return `${year}-${month}-${date} ${hour}:${minute}:${second} (UTC${timezone})`;
    default:
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
};

export const hhmmss = sec => {
  const hour =
    Math.floor(sec / 3600) <= 9 ?
    `0${Math.floor(sec / 3600)}` :
    Math.floor(sec / 3600);
  const minute =
    Math.floor(sec / 60) % 60 <= 9 ?
    `0${Math.floor(sec / 60) % 60}` :
    Math.floor(sec / 60) % 60;
  const second = sec % 60 <= 9 ? `0${sec % 60}` : sec % 60;
  return `${hour}:${minute}:${second}`;
};

export default format;
