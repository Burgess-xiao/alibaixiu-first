// 当程序员选择logo图片时
$('#logo').on('change', function () { 
    // 获取上传的文件
    let file = this.files[0];
    // 用formData 上传二进制文件
    let formData = new FormData();
    // 将文件追加到formData 对象里
    formData.append('logo', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $('#hiddenLogo').val(response[0].logo)
            // 将图片显示在页面中
            $('#preview').attr('src', response[0].logo)
        }
    });
 })

// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
    // 获取表单里输入的值
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
})

// 向服务器发送请求，索要网站设置数据
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        console.log(response)
        if (response) {
           // 将 logo地址存在隐藏域中
           $('#hiddenLogo').val(response.logo)
           //将logo显示在页面中
           $('#preview').attr('src', response.logo)
           // 将网站标题显示在页面中
           $('input[name="title"]').val(response.title)
           // 是否将评论功能展示在页面中
           $('input[name="comment"]').prop('checked', response.comment)
           // 是否将人工审核展示在页面
           $('input[name="review"]').prop('checked', response.review)
        }
    }
});