$(function(){
    var user;   
    var logged_in; 
    Handlebars.registerHelper('link', function(object) {
  var url = Handlebars.escapeExpression(object.url),
      text = Handlebars.escapeExpression(object.text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
    });
Handlebars.registerHelper('ul', function(object) {
  var url = Handlebars.escapeExpression(object.url),
      text = Handlebars.escapeExpression(object.text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );

});
    Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
    });
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
    var setLogStatus = function(data){
            var logged_status = data.logged_in
            console.log(logged_status)
            if (data.logged_in == 'True')
            {

                var source   = $("#logged-template").html();
                var template = Handlebars.compile(source);
                var renderedText = template(data);
                var renderedDom = $(renderedText);
                $("#log").empty();
                $("#log").append(renderedDom);
                $('.log').on('click', '#logbutton',  logout);

            }
            else
            {
                var source   = $("#login-template").html();
                var template = Handlebars.compile(source);
                var renderedText = template(data);
                var renderedDom = $(renderedText);
                $("#loginarea").empty();
                $("#loginarea").append(renderedDom);

            }

    };
    var requestLogStatus = function(data){
        var url = "/loginstatus";
        var promise = $.get(url);
        promise.then(setLogStatus);
    };



    var usersList = function(data){
        var templateText = $("#tableTemplate").html();
        var template = Handlebars.compile(templateText);
        var renderedText = template(data);
        var renderedDom = $(renderedText);
        console.log(JSON.stringify(data))
        $("#tablearea2").empty();
        $("#tablearea2").append(renderedDom);
    };
    var usersSuccess = function(data){
        var url = "/getusers";
        var promise = $.get(url);
        promise.then(usersList);
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

    var userHandler = function(evt){
        evt.preventDefault();

        var req = {
            url: "/getusers",
            method: "get",
            processData: false,
            contentType: false,
        };

        var promise = $.ajax(req);
        
        promise.then(usersSuccess, usersFail);
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





    //$(".droparea").on(dropHandlerSet);
    usersSuccess(false);
    fileUploadSuccess(false);
    requestLogStatus(false);

    });

    //$('.tablearea').on('click' , '#picturetable tr td', imageHandler
            //function (e) {
            //e.preventDefault();
            //alert("click!");
            //}
    //$('.log').on('click', '#logbutton',  logout);
    //$('.tablearea').on('click' , '#picturetable tr td', 
    //        function (e) {
    //        e.preventDefault();
    //        alert("click!");
    //        }
   // );
