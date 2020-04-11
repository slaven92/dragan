$(document).ready(function () {
  $('#answerContainer').on('click', '.answer' ,function (){
    var answer = $(this).html()
    $('.answer').remove()
    console.log(answer)
    $.ajax({
      type: "GET",
      url: url,
      data: {'answer':answer},
      dataType: "JSON",
      success: function (response) {
        if (response.hasOwnProperty('result')) {
          $('#question').html('Rezultat:')
          $('#answerContainer').html('Ti si ' + response['result'] + ' Dragan')
          var img = document.createElement("img");
          img.setAttribute('src', get_name(response['result']));
          img.setAttribute('alt', 'dragan');
          $('#imageContainer').append(img);

          var link = document.createElement("a");
          link.setAttribute('href', home);
          link.innerHTML = "odradi opet";
          link.className = "answer btn btn-primary";
          $('#answerContainer').append(link);

        } else {
        $('#question').html(response['question'])
        refreshAnswers(response['answer'])
        }
      }
    });
  });
});

function refreshAnswers(answers){
  answers.forEach(answer => {
      var div = document.createElement("button");
      div.className = "answer btn btn-primary";
      div.innerHTML = answer;
      $('#answerContainer').append(div);
  });
}


