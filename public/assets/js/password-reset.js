// 修改密码表单时的提交行为
$('#modifyForm').on('submit', function () {
    // 获取表单输入的内容
    let formData = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function () {
            location.href = '/admin/login.html'
        }
    });
    // 阻止默认提交
    return false;
})