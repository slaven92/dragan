import React, { useEffect, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solid } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [questions, setQuestions] = useState([])
  const [isEnd, setIsEnd] = useState(false)
  const [isSet, setIsSet] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    if (isSet === false) {
      loadQuestions((response, status) => {
        setQuestions([...response])
        setIsSet(true)
      })
    }

  }, [isSet])

  const answerClicked = (elem) => {
    var tmpAswers = [...answers]
    var tmpObj = {
      answer: elem,
      question: questions[currentQuestion].question_text,
    }
    tmpAswers.push(tmpObj)
    setAnswers(tmpAswers)
    setCurrentQuestion(currentQuestion + 1)
    if (currentQuestion === questions.length - 1) {
      setIsEnd(true)
    }
  }

  const refresh = () => {
    if(isSet===true){
      setIsSet(false)
      setCurrentQuestion(0)
    }
  }


  if (isSet === true) {


    if (isEnd === true) {
      return (
        <div className='mx-auto'>
          <Result answers={answers} onClick={refresh} />
        </div>
      )
    }
    return <Question question={questions[currentQuestion]} onClick={answerClicked} />


  } else return <div>Loading</div>

}

function Result(props) {

  const [isSet, setIsSet] = useState(false)
  const [result, setResult] = useState("")

  useEffect(() => {
    postAnswer(props.answers, (response, status) => {
      setIsSet(true)
      setResult(response.result)
    })
  }, [props.answers])

  if (isSet === true) {
    return (
      <div className='row justify-content-center'>
        <div className='col-sx'>
          <div className="card">
            <img className="card-img-top" src={`http://127.0.0.1:8000/static/kviz/${result}.jpeg`} alt="Responsive" />
            <div className="card-body">
              <h5 className="card-title">{result}</h5>
              <p className="card-text">Ovo je jedan od mnogih verzija Dragana.</p>
              <a href="/" onClick={()=>props.onClick()} className="btn btn-primary">Pocni opet</a>
            </div>
          </div>
        </div>
      </div>
    )
  } else return <div>Loading</div>
}

function Question(props) {
  const text = props.question ? props.question.question_text : ''
  const answers = props.question ? props.question.choice_set : []
  const creator = props.question ? props.question.creator : ""
  const votes = props.question ? props.question.votes : 0
  // const func = props.question ? props.question.onClick : ()=>{}
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-sm">
          <div className="border">
            <div className="border my-3">
              <p className="h1 text-center">{text}</p>
            </div>
            <div className="border mt-3">
              <Answers answers={answers} onClick={props.onClick} />
            </div>
          </div>
        </div>
      </div>

      <div className='row justify-content-between'>
        <div className="col-auto">
          <p> Pitanje postavio: {creator}</p>
        </div>
        <div className="col-2">
          <button className="btn btn-dark btn-block">
            <FontAwesomeIcon icon={regular} /> <span className='badge badge-primary'>{votes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Answers(props) {
  return props.answers.map((item, index) => {
    return (
      <div className="mx-auto m-6 border" key={index}>
        <button type='button' className="btn btn-outline-primary btn-lg btn-block" onClick={() => props.onClick(item.choice_text)}>
          {item.choice_text}({item.votes}<FontAwesomeIcon icon={solid} />)
        </button>
      </div>
    )
  })
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

function postAnswer(listOfAnswers, callback) {
  lookup("POST", "/submit/", callback, listOfAnswers)
}

function loadQuestions(callback) {
  lookup("GET", "/questions/", callback)
}

export default App;
