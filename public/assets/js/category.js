// 提交表单时
$('#addCategory').on('submit', function () {
    // 获取表单中输入的内容
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function () {
            location.reload();
        }
    });
    return false;
})

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // 将服务器端返回的数据与html字符串进行拼接
        let html = template('categoryListTpl', {data: response})
        // 将拼接好的字符串渲染到页面
        $('#categoryBox').html(html)
    }
});