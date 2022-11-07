export function handleChangeSecondToDate(secs) {
    const date = new Date(secs * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const result = day + "-" + month + "-" + year;
    return result;
  }
  