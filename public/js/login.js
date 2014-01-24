$(function(){
  var login = function(){
    var username = $("#username").val();
    var password = $("#password").val();
    var data = {username:username,password:MD5(password)};
    $.ajax({
      type:"GET",
      url: '/login/login',
      data: data,//{timestamp:timestamp},
      success: function(xhr,result,obj){

        console.log('login success');
        window.location.href="/edit/index";
        console.log("back");
      },
      error: function(obj,err,xhr){
        alert('username or password is wrong');
      }
    });
  };
  $(".ui.submit").click(login);
});