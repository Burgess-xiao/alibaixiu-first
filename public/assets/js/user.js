$('#userForm').on('submit', function () {
    // 获取表单输入的内容并将其转换为参数字符串
    let userDate = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: userDate,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('添加用户失败')
        }
    });
    return false;
})