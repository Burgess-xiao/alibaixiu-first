$('#logout').on('click', function () {
    let isConfirm = confirm('确定退出')
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function () {
                location.href = 'login.html'
            },
            error: function () {
                alert('退出失败')
            }
        });
    }
})

// 处理日期格式
function formateDate(date) {
    // 将日期时间字符串转为日期对象
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}