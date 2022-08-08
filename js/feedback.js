$(document).ready(function()
{
$("input").focus(function(){
    $(this).css("background-color","#cccccc");
     $(this).css("color","#000");
  });
    $("input").blur(function(){
    $(this).css("background-color","#ffffff");
    $(this).css("color"," #4f4f4f"); 
  });

$("#message").focus(function(){
    $(this).css("background-color","#cccccc");
     $(this).css("color","#000");
  });
      $("#message").blur(function(){
    $(this).css("background-color","#ffffff");
    $(this).css("color"," #4f4f4f"); 
});

$('input').keyup(function(){
    this.value = this.value.toUpperCase();
});
$('input[id="name"]').keypress(function(e)
{
    var arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    var code;
    if (window.event)
        code = e.keyCode;
    else
        code = e.which;
    var char = keychar = String.fromCharCode(code);
    if (arr.indexOf(char) == -1)
        return false;
});
$("#send").bind("click", function ()
     {

        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
          if (name == '' || email == '' || message == '') 
           {
                $('input[type="text"],input[type="email"]').css("border", "2px solid red");
                $('input[type="text"],input[type="email"]').css("box-shadow", "0 0 3px red");
                $('#message').css("border", "2px solid red");
                $('#message').css("box-shadow", "0 0 3px red");
                alert("Please fill all fields...!!!!!!");
        }
        else if (!/^[\w.+-]+@[\w-]+\.[\w-.]+$/.test($("#email").val()))
         {
            alert("Your email format is not valid.");
 
        }
        
        else if ($("#message").val().replace(/\s/g, "").length < 30)
         {
            alert("Message is too short. Minimum 30 characters required");
 
        }

        else {
             alert("Thanks to contact us!!!!");
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');
        }
    });
 });
