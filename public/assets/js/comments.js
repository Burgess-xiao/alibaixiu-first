// 向服务器发送请求获取评论列表
$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        // console.log(response)
        let html = template('commentsTpl', response)
        $('#commentsBox').html(html)
        // console.log(html)
        let page = template('pageTpl', response)
        $('#pageBox').html(page)
    }
});
// 分页
function changePage(page) {
    // alert(page)
    // 想服务端发送请求，获取文章列表
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response)
            let html = template('commentsTpl', response)
            $('#commentsBox').html(html)
            let page = template('pageTpl', response)
            $('#pageBox').html(page)
        }
    });
}

$('#commentsBox').on('click', '.status', function () {
    // 获取当前的评论的状态
    let status = $(this).attr('data-status')
    // 获取当前修改评论的id
    let id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: `/comments/${id}`,
        data: {
            state: status == 0? 1 : 0
        },
        success: function (response) {
            console.log(response)
            location.reload();
        }
    });
})

// 删除评论
$('#commentsBox').on('click', '.delete', function () {
    // 获取删除评论的id
    let id = $(this).attr('data-id')
    if (confirm('确定要删除')) {
        $.ajax({
            type: "delete",
            url: `/comments/${id}`,
            success: function (response) {
                location.reload();
            }
        });
    }
})