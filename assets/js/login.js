$(function() {
    // 给登录、注册页面绑定点击事件
    $('#login').on('click', function() {
        $('.link-reg').show()
        $('.link-login').hide()
    })
    $('#reg').on('click', function() {
            $('.link-reg').hide()
            $('.link-login').show()
        })
        // 密码的表单验证
    var form = layui.form
    form.verify({
            // 自定义密码的验证规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 注册页的表单验证
            repwd: function(val) {
                var s = $('.link-reg [name =password]').val()
                if (s !== val) {
                    return '两次密码不一致，请重新输入'
                }
            }
        })
        // 提交注册的请求
        // 监听表单的提交事件
    $('.reg-form').on('submit', function(e) {
            e.preventDefault()
                // console.log(1);
            var data = $(this).serialize()
                // console.log(data);
                // 发起ajax请求
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: data,
                success: function(res) {
                    // console.log(res);
                    layui.layer.msg(res.message);
                    $('#reg').click()
                }

            })

        })
        // 登陆的请求
    $('.login-form').on('submit', function(e) {
        e.preventDefault()
            // console.log(1);
        var data = $(this).serialize()
            // console.log(data);
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('登陆失败')
                } else {
                    layer.msg('登录成功')
                    localStorage.setItem('token', res.token)
                    location.href = 'index.html'
                }

            }

        })

    })
})