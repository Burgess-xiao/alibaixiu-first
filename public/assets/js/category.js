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

// 点击编辑按钮获取对应用户的data-id
$('#categoryBox').on('click', '.edit', function () {
    let id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: `/categories/${id}`,
        success: function (response) {
            // console.log(response)
            let html = template('modifycategoryTpl', response)
            $('#formBox').html(html)
        }
    });
})
// 当修改表单数据后进行提交表单
$('#formBox').on('submit', '#modifyCategory', function () {
    // 获取管理员在表单中输入的值
    let formData = $(this).serialize();
    // 获取要修改用户的id
    let id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: `/categories/${id}`,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });

    // 阻止默认提交
    return false;
})
// 点击删除按钮时
$('#categoryBox').on('click', '.delete', function () { 
    // 点击删除时获取要删除用户的id
    let id = $(this).attr('data-id')
    $.ajax({
        type: "delete",
        url: `categories/${id}`,
        success: function (response) {
            location.reload()
        }
    });
 })