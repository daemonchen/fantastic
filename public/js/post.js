
$(function(){
  var doPostUpdate = function(url, stamp, articleContent){
    $.ajax({
        url: url,
        type: "POST",
        data: { stamp: stamp, content: articleContent},
        dataType: "json",
        success: function (result) {
          console.log("todo: change url to detail","result:",result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        }
    });
  }

  var doDeleteUpdate = function(url){
    $.ajax({
        url: url,
        type: "DELETE",
        // data: { stamp: stamp},
        // dataType: "json",
        success: function (result) {
          console.log("todo: change url to detail","result:",result);
          window.location.reload();

        },
        error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status,thrownError);
        }
    });
  }

  //editable for content
  $("#save").click(function(){
    var contentEditable = CKEDITOR.instances.editor
    if(contentEditable == undefined){return}
    var articleContent = contentEditable.getData()
    if(articleContent.length == 0){
      return console.log("你在逗我么");
    }
    doPostUpdate("/post/update", stamp, articleContent)
  });
  $("#delete").click(function(){
    console.log(stamp)
    doDeleteUpdate("/post/index/?stamp="+stamp)
  });



});