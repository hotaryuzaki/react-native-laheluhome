/**
 * Below are the Functions that are used in the app.
 */

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const Functions = {
  msToDayTime: (ms: number): string => {
    let ret: string = '';
    if (ms > 86400000) {
      ret = `${Math.floor(ms / 86400000)} hari`; // 86400000 is 24 hours
    } else {
      ret = `${Math.floor(ms / 3600000)} jam`; // 3600000 is 1 hour
    }
    return ret;
  },

  secToMin: (sec: number): string => {
    let ret: string = '';
    if (sec > 60) {
      ret = `${Math.floor(sec / 60)}:${padTo2Digits(Math.floor(sec % 60))}`;
    } else {
      ret = `0:${padTo2Digits(Math.floor(sec % 60))}`;
    }
    return ret;
  },
};
