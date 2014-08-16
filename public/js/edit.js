$(function() {
    var edit = {
        init: function() {
            this.editorContent = CKEDITOR.replace('content');
            this.title = window.localStorage.getItem("edittingArticleTitle");
            this.content = window.localStorage.getItem("edittingArticleContent");
            this.tags = [];
            this.launch();
            this.bindEvent();
        },
        launch: function() {
            if (this.title && this.title.length > 0) {
                $("#title").val(this.title)
            }
            if (this.content && this.content.length > 0) {
                this.editorContent.setData(this.content)
            }
        },
        bindEvent: function() {
            var self = this;
            $("#title").keyup(function() {
                window.localStorage.setItem("edittingArticleTitle", $(this).val());
            });
            this.editorContent.on("key", function(evt) {
                window.localStorage.setItem("edittingArticleContent", evt.editor.getData());
            });
            $("#submit").click(function() {
                self.sendPost();
            });
            $("#tag").keyup(function(e){
                if (e.keyCode == 13) {
                    self.tags.push($(this).val());
                    self.addTag($(this).val());
                };
            });
        },
        addTag: function(tag){
            var tagTpl = '<a href="/tag/getByTag?tag={tag}">[{tag}]</a>';
            tagTpl = tagTpl.replace('{tag}',tag).replace('{tag}',tag);
            console.log(tagTpl,tag);
            $("#tags").append($(tagTpl));
        },
        sendPost: function() {
            var self = this;
            var articleTitle = this.articleTitle = $("#title").val();
            var articleContent = this.editorContent.getData()
            if (articleTitle.length == 0 || articleContent.length == 0) {
                console.log("你在逗我么");
            }
            $.ajax({
                url: "/edit/post",
                type: "POST",
                data: {
                    title: articleTitle,
                    content: articleContent
                },
                dataType: "json",
                success: function(result) {
                    console.log("todo: change url to detail", "result:", result);
                    self.afterSendPost(result);
                    // todo: change url to detail
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });

        },
        afterSendPost: function(data) {
            this.saveTags(data);

        },
        saveTags: function(result){
            if (this.tags.length == 0) { return this.clean(); };
            for (var i = this.tags.length - 1; i >= 0; i--) {
                this.saveTag(this.tags[i],result.data, this.articleTitle);
            };
            this.clean();
        },
        saveTag: function(tag, stamp, title){
            $.ajax({
                url: '/tag/save',
                type: 'POST',
                data: {
                    title: title,
                    stamp: stamp,
                    tag: tag
                },
                dataType: "json",
                success: function(result) {
                    console.log("tag",tag,"saved");
                    // todo: change url to detail
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        },
        clean: function(){
            $("#title").val("");
            // this.tags = [];
            this.editorContent.setData("", function() {
                console.log("clear content after send");
            })
            window.localStorage.clear();

        }
    };
    edit.init();
});