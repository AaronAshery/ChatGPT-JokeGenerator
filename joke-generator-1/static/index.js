function displayResults(){
    for(joke in jokes){
        $("#list_results").append(`
            <div>${joke}</div>
        `)
    }
}

function submit_data() {
  window.location.assign(`/results`);
  let topic = $("#topic_input").val();
  let audience = $("#audience_input").val();
  let age = $("#age_input").val();
  let data = {
    "topic": topic,
    "audience": audience,
    "age": age,
  };
  $.ajax({
    type: "POST",
    url: "/get_data",
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
  // window.location.assign(`/results`);
}

function more_data() {
  window.location.assign('/')
}

$(document).ready(() => {
    $("#get_results").click(function(){
        submit_data();
    })

    $("#more_jokes").click(function(){
        more_data();
    })
});
