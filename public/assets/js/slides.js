$('#file').on('change', function () {
    // 获取用户选择的文件
    let file = this.files[0];
    console.log(this)
    // 利用formData对象上传二进制文件
    let formData = new FormData();
    // 将选择的文件追加到formData 对象里
    formData.append('image', file)
    // 向发送请求服务器
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response[0].image)
            $('#image').val(response[0].image)
        }
    });
})

// 当轮播图发生提交表单行为时
$('#slidesForm').on('submit', function () {
    // 获取表单中输入的内容
    let formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload
        }
    });
    return false;
})

// 获取轮播图列表
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        console.log(response)
        let html = template('slidesTpl', { data: response })
        $('#slidesBox').html(html)
    }
});


// 删除
$('#slidesBox').on('click', '.delete', function () {

    if (confirm('确定删除')) {
        // 获取要删除图片的id
        let id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: `/slides/${id}`,
            success: function (response) {
                console.log(response)
                location.reload()
            }
        });
    }
})

