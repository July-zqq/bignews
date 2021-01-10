$(function() {
    var layer = layui.layer
    unameInfor()
    $('.tuichu').click(function() {
        layer.confirm('你确定要退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = 'login.html'

            layer.close(index);
        });
    })
})

function unameInfor() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            nikeAvater(res.data);
        }
    })

}

function nikeAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.nike-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var frist = name[0].toUpperCase()
        $('.nike-avater').html(frist).show()
    }
}