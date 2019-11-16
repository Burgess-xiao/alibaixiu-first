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
    // console.log(this)
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

// 向服务器发送请求，索取用户列表数据
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        console.log(response)
        // 将HTML字符串和数据进行拼接
        let html = template('userTpl', { data: response })
        // 将拼接好的字符串显示在页面
        $('#userBox').html(html)
    }
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
    // 获取被点击用户的id   
    let id = $(this).attr('data-id')
    // alert(id)
    $.ajax({
        type: "get",
        url: `/users/${id}`,
        success: function (response) {
            // console.log(response);
            let html = template('modifyTpl', response)
            // console.log(html)
            $('#modifyBox').html(html)
        }
    });
})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取用户在表单中输入的内容
    let formData = $(this).serialize();
    // 获取要修改的用户的id
    let id = $(this).attr('data-id')
    // console.log(formData)
    // 发送请求，修改信息
    $.ajax({
        type: "put",
        url: `/users/${id}`,
        data: formData,
        success: function (response) {
            // console.log(response)
            // 修改后重新加载到页面
            location.reload();
        }
    });
    // 阻止表单默认提交
    return false;
})

// 删除用户
$('#userBox').on('click', '.delete', function () {
    if (confirm('您要删除用户吗')) {
        var id = $(this).attr('data-id')
    }
    $.ajax({
        type: "delete",
        url: `/users/${id}`,
        success: function (response) {
            location.reload()
        }
    });
})

// 获取全选按钮
var selectAll = $('#selectAll')
// 获取批量删除按钮
var deleteMany = $('#deleteMany')
$('#selectAll').on('change', function () {
    var status = $(this).prop('checked')
    // 批量删除标志的状态
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    // 获取所有用户的状态并与全选按钮保持一致
    $('#userBox').find('input').prop('checked', status)
})
// 所有复选框为选中状态时，全选框变选中状态
$('#userBox').on('change', '.userStatus', function () {
    // 获取所有动态创建的复选框
    var inputs = $('#userBox').find('input')
    /**
     * 判断选中用户的数量和所有用户的数量是否一致
     * 如果一致，就说明所有的用户都是选中的
     * 否则就是有用户没有被选中
     */
    if (inputs.length == inputs.filter(':checked').length) {
        // alert('全选中')
        selectAll.prop('checked', true)
    } else {
        // alert('没有全选中')
        selectAll.prop('checked', false)
    }
    // 如果有复选框选中，就显示批量删除，复选框长度大于0即可
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
})
// 点击批量删除删除所又有选中的复选框
deleteMany.on('click', function () {
    let ids = [];
    // 获取所有选中的用户
    let checkUser = $('#userBox').find('input').filter(':checked')
    // 循环复选框，获得选中复选框的data-id
    checkUser.each(function (index, element) {
        // 这个时转换成jq形式才能用jq的方法attr
        ids.push($(element).attr('data-id'))
        // 这个是原生代码获取data-id
        // element.dataset.id
    })
    if (confirm('是否要删除所选用户')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload()
            }
        });
    }
})