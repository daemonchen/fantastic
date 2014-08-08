$(function() {
    var register = {
        init: function() {
            this.bindEvent();

        },
        bindEvent: function() {
            var self = this;
            $("#register").click(function() {
                self.postData();
            });
        },
        postData: function() {
            this.data = {
                username: $("#registerForm #username").val(),
                password: $("#registerForm #password").val()
            };
            var self = this;
            $.ajax({
                type: "POST",
                url: '/admin/register',
                data: self.data, //{timestamp:timestamp},
                success: function(xhr, result, obj) {
                    window.location.href = "/";
                },
                error: function(obj, err, xhr) {
                    alert(err);
                }
            });

        }
    }

    register.init();
});