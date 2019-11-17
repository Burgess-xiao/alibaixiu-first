$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let html = template('categoryTpl', { data: response })
        $('#category').html(html)
    }
});

$('#feature').on('change', function () {
    // 获取选择的文件
    let file = this.files[0]
    // 创建formData对象上传二进制文件
    let formData = new FormData();
    // 将选择的文件追加到formData对象 里
    formData.append('cover', file)
    // 上传文件
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $('#thumbnail').val(response[0].cover)
        }
    });
})

// 当文章提交表单时
$('#addForm').on('submit', function () {
    // 获取输入的内容
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href = '/admin/post-add.html'
        }
    });
    return false;
})

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories;
                    console.log(response)
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            })

        }
    })
}

// 从地址栏获取查询参数
// location.search 获取的是类似于 ?id=9&age=18
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&'); // 
    for (let i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }

    }
    return -1;
}

$('#parentBox').on('submit', function () {
    // 获取输入的内容
    let formData = $(this).serialize();
    // 获取修改用户的id
    let id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: `/post/${id}`,
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
})


