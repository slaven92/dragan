import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solid } from '@fortawesome/free-solid-svg-icons'

// const global_url = "http://127.0.0.1:8000/"
const global_url = "/"


function App() {
  const [questions, setQuestions] = useState([])
  const [isEnd, setIsEnd] = useState(false)
  const [isSet, setIsSet] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isLogedInStatus, setIsLogedInStatus] = useState(false)
  const [username, setUserName] = useState("Anonimus")
  const [isCreateMod, setIsCreateMod] = useState(false)

  useEffect(() => {
    if (isSet === false) {
      loadQuestions((response, status) => {
        setQuestions([...response])
        setIsSet(true)
        const firstObj = response[0]
        if (firstObj.hasOwnProperty("curr_user")) {
          setIsLogedInStatus(true)
          setUserName(firstObj.curr_user)
        }
        else {
          setIsLogedInStatus(false)
          setUserName('Anonimus')
        }
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
    if (isSet === true) {
      setIsSet(false)
      setCurrentQuestion(0)
    }
  }

  const createQuestion = () => {
    setIsCreateMod(true)
  }

  function submitNewQuestion (question, answers) {

    var isValid = true

    if (question === "") isValid = false

    var obj = {
      question_text: question,
      choice_set: [],
    }

    answers.forEach(answer => {
      if (answer !== ""){
        obj.choice_set.push(
          {
            choice_text: answer
          }
        )
      }
    });

    if(obj.choice_set === []) isValid = false

    console.log(obj)
    console.log(isValid)
    if(isValid){
      newQuestion(obj, (response, status) => {
        if(status===201){
          setIsCreateMod(false)
        }
      })
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
    if (isCreateMod) {
      return (
        <div>
          <Header onClick={createQuestion} username={username} isLogedIn={isLogedInStatus} />
          <Create onClick={submitNewQuestion} />
        </div>
      )
    } else {
      return (
        <div>
          <Header onClick={createQuestion} username={username} isLogedIn={isLogedInStatus} />
          <Question question={questions[currentQuestion]} onClick={answerClicked} isLogedIn={isLogedInStatus} />
        </div>
      )
    }


  } else {
    return (
      <div>
        <Header />
        Loading
      </div>
    )
  }

}

function Create(props) {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState(["",""])
  const [numAnswers, setNumAnswers] = useState(2)

  const handleChangeQuestion = (event)=>{
    setQuestion(event.target.value)
  }

  const handleChangeAnswers = (target, index) =>{
    var tmpAnswers = [...answers]
    tmpAnswers[index] = target.value
    setAnswers(tmpAnswers)
  }

  var odgovori = []
  for (let index = 0; index < numAnswers; index++) {
    odgovori.push(
      <div key={index}>
        <label>
            <p>Odgovor {index+1}:</p>
          <input type="text" value={answers[index]} onChange={(event)=>{handleChangeAnswers(event.target, index)}} />
        </label>
      </div>
    )
  }

  function addAnswerField () {
    setNumAnswers(numAnswers+1)
    var tmpAnswers = [...answers]
    tmpAnswers.push("")
    setAnswers(tmpAnswers)
  } 

  return (
    <div>
      <form onSubmit={(event) => {event.preventDefault(); props.onClick(question, answers) }}>
        <label>
          <div>
            <p className='h1'>Pitanje:</p>
          </div>
          <input type="text" value={question} onChange={handleChangeQuestion} />
        </label>
        <div>
          <p className='h1'>Odgovori:</p>
        </div>
        {odgovori}
        <input className='btn btn-primary' type="submit" value="Posalji pitanje" />
      </form>
      <button className='btn btn-secondary' onClick={addAnswerField} >Dodaj polje za odgovor</button>
    </div>
  )
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
            <img className="card-img-top" src={`${global_url}static/kviz/${result}.jpeg`} alt="Responsive" />
            <div className="card-body">
              <h5 className="card-title">{result}</h5>
              <p className="card-text">Ovo je jedan od mnogih verzija Dragana.</p>
              <a href="/" onClick={() => props.onClick()} className="btn btn-primary">Pocni opet</a>
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
  const isLogedIn = props.question ? props.isLogedIn : false
  var didVote = false
  if (props.question) {
    if (props.question.user_did_vote===true) {
      didVote = true
    }
  }
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
        <div className="col-md-2 col-3">
          <ActionButton votes={votes} isLogedIn={isLogedIn} didVote={didVote} question={text} />
        </div>
      </div>
    </div>
  );
}

function ActionButton(props) {
  const [didVote, setDidVote] = useState(props.didVote)
  const [votes, setVotes] = useState(props.votes)
  useEffect(() => {
    if (props.isLogedIn === true) {
      window.$('[data-toggle="popover"]').popover('disable');
    } else {
      window.$('[data-toggle="popover"]').popover();
    }
  })

  useEffect(()=>{
    setDidVote(props.didVote)
    setVotes(props.votes)
  },[props.didVote, props.votes, props.question])

  const handleAction = () => {
    if (props.isLogedIn) {
      const question = { "question": props.question }
      toggleLike(question, (response, status) => {
        if (didVote) {
          setDidVote(false)
          setVotes(votes - 1)
        } else {
          setDidVote(true)
          setVotes(votes + 1)
        }
      })
    }
  }

  if (props.isLogedIn && didVote) {
    return (
      <button id="popover" onClick={()=>{handleAction()}} className="btn btn-dark btn-block" data-container="body" data-toggle="popover" data-placement="left" data-content="Morate se prvo ulogovati!" >
        <FontAwesomeIcon icon={solid} /> <span className='badge badge-primary'>{votes}</span>
      </button>
    )
  } else {
    return (
      <button id="popover" onClick={()=>{handleAction()}} className="btn btn-dark btn-block" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." >
        <FontAwesomeIcon icon={regular} /> <span className='badge badge-primary'>{votes}</span>
      </button>
    )
  }
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
  const url = `${global_url}api${endpoint}`
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

function toggleLike(question, callback) {
  lookup("POST", "/toggle-vote/", callback, question)
}

function newQuestion(fullObj, callback) {
  lookup("POST", "/create/", callback, fullObj)
}

export default App;
