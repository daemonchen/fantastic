$(function() {
    var login = function() {
        var username = $("#loginForm #username").val();
        var password = $("#loginForm #password").val();
        var data = {
            username: username,
            password: MD5(password)
        };
        $.ajax({
            type: "GET",
            url: '/admin/login',
            data: data, //{timestamp:timestamp},
            success: function(xhr, result, obj) {
                window.location.href = "/";
            },
            error: function(obj, err, xhr) {
                alert(err);
            }
        });
    };
    $("#login").click(login);
});