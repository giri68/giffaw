

$(document).on("ready", function(){

getGifsData();
  $("form").on("submit", function(event){
    event.preventDefault();
$("form [name='offset']").val(0);
//$(".gif-gallery").empty()
    getGifsData();
  });
$(".load-more").on("click", loadMore)
});
function getGifsData(){
  $.ajax({
    method: "GET",
    url:  "http://api.giphy.com/v1/gifs/search",
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
  });
}

function onSuccess(responseData){
if (responseData.pagination.offset === 0){
 $(".gif-img").remove();
}

  responseData.data.forEach(function(value, index){
  $(".gif-gallery").append("<img class = 'img-responsive img-thumbnail gif-image' src="+value.images.fixed_height.url+">");
  });
}
function onError(xhr, status, errorThrown){
  alert("There is error");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.log(xhr);
}


function loadMore(){
  var newOffset = parseInt($("form [name='offset']").val()) + 25;
$("form [name='offset']").val(newOffset);
getGifsData();
}
