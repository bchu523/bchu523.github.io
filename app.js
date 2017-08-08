$(function(){
    var user;   
    var logged_in; 
    var getUser = $.getJSON("/user",
            function (data) {
                user = data.user;
                console.log(user)
            }
    );
     var getLogStatus = $.getJSON("/loginstatus",
            function (data) {
                logged_in = data.logged_in;
                console.log(logged_in)
            }
    );


    var logoutHandler = function(evt){
        evt.preventDefault();


        var req = {
            url: "/logout",
            method: "post",
            processData: false,
            contentType: false,
            data: formData
        };

        var promise = $.ajax(req);
        
    };


    var setLogStatus = function(data){
            var logged_status = data.logged_in
            console.log(logged_status)
            if (data.logged_in == 'False')
            {
                data = {logged_in:'Login'}

            }
            else
            {
                data = {logged_in:'Logout'}
            }
            var source   = $("#logged-template").html();
            var template = Handlebars.compile(source);
            var renderedText = template(data);
            var renderedDom = $(renderedText);
            $("#log").empty();
            $("#log").append(renderedDom);

    };
    var requestLogStatus = function(data){
        var url = "/loginstatus";
        var promise = $.get(url);
        promise.then(setLogStatus);
    };

    var logoutTemplate = function(data){
        var templateText = $("#logoutTemplate").html();
        var template = Handlebars.compile(templateText);
        var renderedText = template(data);
        var renderedDom = $(renderedText);
        $("#logoutarea").empty();
        $("#tablearea").append(renderedDom);
    };


    var refreshFilenameList = function(data){
        var templateText = $("#tableTemplate").html();
        var template = Handlebars.compile(templateText);
        var renderedText = template(data);
        var renderedDom = $(renderedText);
        $("#tablearea").empty();
        $("#tablearea").append(renderedDom);
    };

    var fileUploadSuccess = function(data){
        var url = "/filenames";
        var promise = $.get(url);
        promise.then(refreshFilenameList);
    };

    var fileUploadFail = function(data){};

    var dragHandler = function(evt){
        evt.preventDefault();
    };

    var dropHandler = function(evt){
        evt.preventDefault();
        var files = evt.originalEvent.dataTransfer.files;

        var formData = new FormData();
        formData.append("file2upload", files[0]);

        var req = {
            url: "/sendfile",
            method: "post",
            processData: false,
            contentType: false,
            data: formData
        };

        var promise = $.ajax(req);
        
        promise.then(fileUploadSuccess, fileUploadFail);
    };



    var imageHandler = function(evt){
         evt.preventDefault();
         var newSRC = $(this)[0];
         console.log(newSRC)
         $('.imagearea').children('img').attr('src','/static/'.concat(user).concat('/').concat(newSRC.innerHTML));
    }


    var logHandler = function(evt)
    {
        var promise = $.get("/loginstatus");
        promise.then(logStatSucess)
    }
    var logStatSucess = function(data){
        console.log('click!')
        $.ajax({
            type: "GET",
            url: '/logout',
            dataType: "json",
            success: function(data) {
                    window.location.href = data.url;
            }
        });
    }

    var logout = function(data){
        console.log('click!')
        $.ajax({
            type: "GET",
            url: '/logout',
            dataType: "json",
            success: function(data) {
                    window.location.href = data.url;
            }
        });
    }




    var dropHandlerSet = {
        dragover: dragHandler,
        drop: dropHandler
    };

    if (logged_in)
    {
        $(".logout").on(logoutHandler);
    }
    $(".droparea").on(dropHandlerSet);
    fileUploadSuccess(false); // called to ensure that we have initial data
    requestLogStatus(false);
    $('.tablearea').on('click' , '#picturetable tr td', imageHandler
            //function (e) {
            //e.preventDefault();
            //alert("click!");
            //}
    );
    $('.log').on('click', '#logbutton',  logout);
    //$('.tablearea').on('click' , '#picturetable tr td', 
    //        function (e) {
    //        e.preventDefault();
    //        alert("click!");
    //        }
    //);


});
