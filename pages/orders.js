document.getElementById("add-item-button").addEventListener("click", addTheItem);

var subTotal = 0;

$(document).ready(function(){
  var getter = $.ajax({
      url: "https://galvanize-eats-api.herokuapp.com/menu",
      method: "GET",
      dataType: "json"
    });
    getter.done(function (response) {
      console.log(response);
      for(var i = 0; i < response.menu.length; i++){
        if(response["menu"][i]["type"] === "burger"){
          $("#all-items").append("<option value="+response["menu"][i]["price"]+">"+response["menu"][i]["name"]+"("+response["menu"][i]["price"]+")");
        }
      }
      $("#all-items").append("<option disabled>pizza</option>");

      for(var i = 0; i < response.menu.length; i++){
        if(response["menu"][i]["type"] === "pizza"){
          $("#all-items").append("<option value="+response["menu"][i]["price"]+">"+response["menu"][i]["name"]+"("+response["menu"][i]["price"]+")");
        }
      }
    })
  });

  function addTheItem() {

    var indivs = [];
    var quantity = 1;
    if($("#choose-quantity").val() === ""){
      quantity = 1;
    }else{
      quantity = Number($("#choose-quantity").val());
    }

    $("#all-items :selected").each(function(){
      indivs.push($(this).text());
      subTotal += Number($(this).val()) * quantity;
      $("#Subtotal").text("Subtotal: " + subTotal.toString());
      $("#Tax").text("Tax: " + (subTotal * .08).toFixed(2).toString());
      $("#Total").text("Total: " + (subTotal + (subTotal * .08)).toFixed(2).toString());
    });
    for(var i = 0; i < indivs.length; i++){
      $(".selected-items").append(
        quantity + "x " + indivs[i] + "</br>"
      );
    }
  }

document.getElementById("deliver-button").addEventListener("click", function () {
  var datas = $(".selected-items").val();
  var sender = $.ajax({
      url: "https://lit-fortress-6467.herokuapp.com/post",
      method: "POST",
      data: datas
    });
    sender.done(function(response){
      console.log(response);
    })
})
