//form listener
const join_form = document.getElementById("join-game-form")
join_form.addEventListener(type="submit", handleJoinGame)


function handleNewGame(){
    document.getElementById('create-btn').style.display = 'none'
    document.getElementById('myform').style.display = 'block'
    // const responseType = "json"
    // const url = "/podmornice/create/"
    // const method = 'POST'
    // const xhr = new XMLHttpRequest()
    // const csrftoken = getCookie('csrftoken');
    // xhr.responseType = responseType
    // xhr.open(method, url)
    // xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
    // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    // xhr.setRequestHeader("X-CSRFToken", csrftoken)
    // xhr.onload = function(){
    //     console.log(xhr.status, xhr.response)
    // }
    // xhr.send()
}

function handleJoinGame(event){
    event.preventDefault()

    const myForm = event.target
    const myFormData = new FormData(myForm)
    
    const responseType = "json"
    const url = "/podmornice/join/"
    const method = 'POST'
    const xhr = new XMLHttpRequest()
    const csrftoken = getCookie('csrftoken');
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.onload = function(){
        console.log(xhr.status, xhr.response)
    }
    xhr.send(myFormData)
}

function handleSendMove(){
    var data = new FormData()
    data.append('move', 'B4')
    const responseType = "json"
    const url = "/podmornice/send/"
    const method = 'POST'
    const xhr = new XMLHttpRequest()
    const csrftoken = getCookie('csrftoken');
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.onload = function(){
        console.log(xhr.status, xhr.response)
    }
    xhr.send(data)
}

function handleRecieveMove(){
    const responseType = "json"
    const url = "/podmornice/recieve/"
    const method = 'GET'
    const xhr = new XMLHttpRequest()
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.onload = function(){
        console.log(xhr.status, xhr.response)
    }
    xhr.send()
}



// helper functions
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