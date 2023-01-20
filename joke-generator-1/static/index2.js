function displayResults(){
    for(joke in jokes){
        $("#list_results").append(`
            <div>${joke}</div>
        `)
    }
}


function submit_data2() {
  let subtopic = $("#subtopic_input").val();
  let more_info = $("#info_input").val();
  
  let data = {
    "subtopic": subtopic,
    "info": more_info,
  };
  $.ajax({
    type: "POST",
    url: "/get_data2",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function (result) {
      console.log(result.data);
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
  window.location.assign(`/results2`);
}

// document.onreadystatechange = function() {
//   if (document.readyState !== "complete") {
//       document.querySelector(
//         "body").style.visibility = "hidden";
//       document.querySelector(
//         "#loader").style.visibility = "visible";
//   } else {
//       document.querySelector(
//         "#loader").style.display = "none";
//       document.querySelector(
//         "body").style.visibility = "visible";
//       $("#get_results2").click(function(){
//           submit_data2();
//       })
      
//   }
// };

$(document).ready(() => {
  $("#get_results2").click(function(){
    submit_data2();
})
});