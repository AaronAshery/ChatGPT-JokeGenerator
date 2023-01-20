function displayResults(){
    for(joke in jokes){
        $("#list_results").append(`
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">Joke ${Number(joke) + 1}</h5>
        <div class="card-content"><span class="card-text">${jokes[joke]}</span>
        <a href="#" onClick=view(${joke}) class="btn btn-outline-success">Select</a></div>
        </div>
        </div>
        `)
    }
}
function view(joke) {
  $("#joke_meaning").empty()
  let data = jokes[joke]
  $.ajax({
    type: "POST",
    url: "/explain_data",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(data),
    success: function(result){
        console.log(result["explain"])
        $("#joke_meaning").append(`
        <div class="card2">
        <div class="card-body">
        <h5 class="card-title">Is it really Funny?</h5>
        <div class="card-content"><span class="card-text">${result["explain"]}</span></div>
        </div>
        </div>
        `)
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
});
}

function more_data() {
    window.location.assign('/feedback')
  }

//   document.onreadystatechange = function() {
//     if (document.readyState !== "complete") {
//         document.querySelector(
//           "body").style.visibility = "hidden";
//         document.querySelector(
//           "#loader").style.visibility = "visible";
//     } else {
//         document.querySelector(
//           "#loader").style.display = "none";
//         document.querySelector(
//           "body").style.visibility = "visible";
//         jokes.shift();
//         displayResults();
    
//         $("#more_jokes").click(function(){
//             more_data();
//         })
        
//     }
//   };

$(document).ready(() => {
    jokes.shift();
    displayResults();

    $("#more_jokes").click(function(){
        more_data();
    })
});
