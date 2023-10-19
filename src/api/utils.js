// 2023-10-19 10:23
export const dateFormatDefault = (data) => {
    const dateObj = new Date(data);
    let formattedDate = dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDay() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();
    return formattedDate;
}

// 7일 전
export const dateFormatTrans = (data) => {
    const dateObj = new Date(data);
    let currentDate = new Date();
    const timeDiff = currentDate - dateObj;
    let date = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if(date == 0) {
        date = '오늘';
    } else {
        date += '일 전';
    }
    return date;
}