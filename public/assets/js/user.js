$('#userForm').on('submit', function () {
    // 获取表单输入的内容并将其转换为参数字符串
    let userDate = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: userDate,
        success: function () {
            // reaload刷新页面
            location.reload()
        },
        error: function () {
            alert('添加用户失败')
        }
    });
    return false;
})

$('#modifyBox').on('change', '#avatar', function () {
    // 用户选择到的文件
    // this.file[0]
    console.log(this)
    let formData = new FormData();
    formData.append('avatar', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉ajax方法不要解析请求参数
        processData: false,
        // 告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response)
            // 实现头像预览功能
            $('#preview').attr('src', response[0].avatar)
            // 设置隐藏域的值，点击提交时提交给服务器
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
})