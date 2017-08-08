$(document).ready(function(){
    var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
    })();
    $(".table").on("click","tr>td>#hide",function(){
        $("#tooltip").attr('id', 'tooltiph');
        $(this).parent().parent().find(".display").hide();
        $(this).parent().parent().find(".input").show();
        //$(this).parent().parent().find("#tooltip").show();


    
    });
$( "li.item-ii" ).find( "li" ).css( "background-color", "red" );

    $('.table').on("click", "tr>td>#btn",function(){
        //$(this).parent().parent().find("#tooltip").hide();
        $("#tooltiph").attr('id', 'tooltip');

        var items  = $(this).parent().parent().find( ".equip" )
        console.log(items);
        items.each(function(){

        var item1 = $(this).find("#item1").val();
        console.log(item1);
        $(this).find("#i1").attr("src",item1);
        var item1 = $(this).find("#item2").val();
        console.log(item1);
        $(this).find("#tooltip").attr("src",item1);


        });
        $(this).parent().parent().find(".display").show();
        $(this).parent().parent().find(".input").hide();
        var character = $(this).parent().parent().find('#usr').val();
        $(this).parent().parent().find("#char").attr("src",character);
        var charactername = $(this).parent().parent().find('#usrname').val();
        $(this).parent().parent().find("#charname").text(charactername);

        var item1 = $(this).parent().parent().find('#item1').val();
        $(this).parent().parent().find(".display>#i1>#i1").attr("src",item1);
        $(this).parent().parent().find(".display>#tooltip").attr("src",item1);


        $('table').append('<tr><input class="remove" value="remove"></tr>');
    });
    $(".table").on("click","tr>td>.new",function() {
        //var id = ($(".grid3x3 .display .equip").length + 1).toString();
        //console.log(id)
                var id = add();
                console.log(id);
                $(this).parent().parent().find(".equip").append('<img src="swrod.jpg"  id="tooltiph"><div class="item"><img src="Eqp_Sweetwater_Shining_Rod.png" id="i1"><div class="input"> <div class="form-group"> <label for="item1">Icon:</label> <input type="text" class="form-control" id="item1" value="Eqp_Sweetwater_Shining_Rod.png"></div> <div class="form-group"> <label for="item2">Tooltip:</label> <input type="text" class="form-control" id="item2" value="swrod.jpg"></div>  <a class="remove_block" href="#">Remove</a></div></div></div>'); 
    //$("#tooltip").attr('id', 'tooltiph');

    //$(this).parent().parent().parent().parent().parent().append('<img src="swrod.jpg"  id="tooltip">');
    $(".input").show();
    //$(this).parent().parent().find("#tooltip").show();



    });


$(".table").on({
    mouseover: function () {
        $("#tooltip").show();
    }
    ,
    mouseleave: function () {
        $("#tooltip").hide();
    }}
,"tr>td>.equip");




    $(".table").on("click", "tr>td>.equip>.item>.input>.remove_block", function(events){
    console.log("hi");
    console.log($(this).parent().parent().parent())
    $(this).parent().parent().remove();
    });
    $("#show").click(function(){
        $("p").show();
    });

    $('.entry').on('click' ,function(){
        $('.table').append(`

<tr>
        <td>
            <img src="mage.png"  id="char">
            <div class="form-group input">
                <input type="text" class="form-control" id="usr" value="mage.png">
            </div> 
        
        </td>
        <td>Mage</td>
        <td>
            <div class="equip">
            </div>
        </div>
        <a class="new input"> Add</a>
        </td>
        <td>
            <button id="hide">Edit</button>            
            <button id="btn">View</button>  
        </td>
      </tr>

            `)
    });


});
