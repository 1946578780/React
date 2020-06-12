function getTodayDate() {
    var date = new Date();

    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();

    return year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minute;
};