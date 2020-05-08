import React, { useEffect, useState } from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome'

function App() {
  const [questions, setQuestions] = useState([])
  useEffect(()=>{
    loadQuestions((response, status)=>{
      setQuestions([...response])
    })
  }, [])

  return questions.map((item, index) => {
    return <Question question={item} key={`${index}`}/>
  })

  // return (
  //   <div className="container">
  //     <FontAwesome
  //       className="super-crazy-colors"
  //       name="heart"
  //     />
  //   </div>
  // );
}

function Question(props) {
  return (
    <div>
      {props.question.question_text}
    </div>
  );
}





function lookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
      jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `http://127.0.0.1:8000/api${endpoint}`
  xhr.responseType = "json"
  xhr.open(method, url)
  const csrftoken = getCookie('csrftoken');
  xhr.setRequestHeader("Content-Type", "application/json")

  if (csrftoken) {
      xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("X-CSRFToken", csrftoken)
  }
  
  xhr.onload = function () {
      callback(xhr.response, xhr.status)
  }
  xhr.onerror = function (e) {
      console.log(e)
      callback({ "message": "Ne radi" }, 400)
  }
  xhr.send(jsonData)
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

// function createTweet(newTweet, callback){
//   lookup("POST", "/tweets/create/", callback, {content: newTweet})
// }

function loadQuestions(callback) {
 lookup("GET", "/questions/", callback)
}

export default App;
