// 向服务器发送请求，获取文章列表
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        console.log(response)
        let html = template('postsTpl', response)
        $('#postsBox').html(html)
        let page = template('pageTpl', response)
        $('#page').html(page)
    }
});


// 分页
function changePage(page) {
    // alert(page)
    // 想服务端发送请求，获取文章列表
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response)
            let html = template('postsTpl', response)
            $('#postsBox').html(html)
            let page = template('pageTpl', response)
            $('#page').html(page)
        }
    });
}

$('#postsBox').on('click', '.delete', function () {
    let id = $(this).attr('data-id')
    if (confirm('确定要删除')) {
        $.ajax({
            type: "delete",
            url: `/posts/${id}`,
            success: function (response) {
                location.reload()
            }
        });
    }
})

var id, userId;
$('#postsBox').on('click', ".postCom", function () {
    id = $(this).data('id')
    console.log(id, 678);
    userId = JSON.parse(localStorage.getItem('user'))._id
    console.log(userId, 444);
    $('#exampleModal').modal('show')
})

/* 点击发布 */
$('.addCom').on('click', function () {
    var content = $('#message-text').val()
    console.log(content, 1111);
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            author: userId,
            content: content,
            post: id
        },
        success: function (res) {
            console.log(res, 543);
            $('#exampleModal').modal('hide')
        }
    })
})

