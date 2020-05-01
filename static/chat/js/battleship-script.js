// //form listener
// const join_form = document.getElementById("join-game-form")
// join_form.addEventListener(type = "submit", handleJoinGame)


function handleNewGame(i) {
    const channelName = document.getElementById('channel-name').value
    // console.log(channelName)
    localStorage.clear();
    if (i === 1) {
        localStorage.setItem("igrac2", "Rem0tePlayer_");
        localStorage.setItem("real_player", 1)
        localStorage.setItem("flagIgrac", 1);
        localStorage.setItem("channel_name", channelName)
        document.getElementById('create-btn').style.display = 'none'
        document.getElementById('player-two-name-input').style.display = 'none'
        document.getElementById('myform').style.display = 'block'

    }else if (i === 2){
        localStorage.setItem("igrac1", "Rem0tePlayer_");
        localStorage.setItem("real_player", 2)
        localStorage.setItem("flagIgrac", 2);
        localStorage.setItem("channel_name", channelName)
        document.getElementById('create-btn').style.display = 'none'
        document.getElementById('player-one-name-input').style.display = 'none'
        document.getElementById('myform').style.display = 'block'
    }
}

// function handleJoinGame(event) {
//     event.preventDefault()

//     const myForm = event.target
//     const myFormData = new FormData(myForm)

//     const responseType = "json"
//     const url = "/chat/join/"
//     const method = 'POST'
//     const xhr = new XMLHttpRequest()
//     const csrftoken = getCookie('csrftoken');
//     xhr.responseType = responseType
//     xhr.open(method, url)
//     xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
//     xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
//     xhr.setRequestHeader("X-CSRFToken", csrftoken)
//     xhr.onload = function () {
//         localStorage.setItem("nista", 0);
//         localStorage.clear();
//         localStorage.setItem("igrac1", "Rem0tePlayer_");
//         localStorage.setItem("flagIgrac", 2);
//         document.getElementById('player-one-name-input').style.display = 'none'

//         document.getElementById('create-btn').style.display = 'none'
//         document.getElementById('myform').style.display = 'block'
//     }
//     xhr.send(myFormData)
// }

// function handleSendMove(move, was_hit) {
//     var data = new FormData()
//     data.append('move', move)
//     data.append('was_hit', was_hit)
//     const responseType = "json"
//     const url = "/chat/send/"
//     const method = 'POST'
//     const xhr = new XMLHttpRequest()
//     const csrftoken = getCookie('csrftoken');
//     xhr.responseType = responseType
//     xhr.open(method, url)
//     xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
//     xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
//     xhr.setRequestHeader("X-CSRFToken", csrftoken)
//     xhr.onload = function () {
//         if (xhr.status === 200) {
//             localStorage.setItem('was_hit_position', move)
//         }
//     }
//     xhr.send(data)
// }

// function handleRecieveMove() {
//     var move
//     const responseType = "json"
//     const url = "/podmornice/recieve/"
//     const method = 'GET'
//     const xhr = new XMLHttpRequest()
//     xhr.responseType = responseType
//     xhr.open(method, url)
//     xhr.setRequestHeader("HTTP_X_REQUEST_WITH", "XMLHttpRequest")
//     xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
//     xhr.onload = function () {
//         localStorage.setItem('last_move', xhr.response.move)
//         localStorage.setItem('last_move_error', xhr.response.error)
//         // localStorage.setItem('was_hit', xhr.response.was_hit)
//         if (xhr.status === 200) {
//             document.getElementById("loading-element").innerHTML = "Igraj"
//             if (xhr.response.move !== "") {
//                 const listPosition = xhr.response.move.split(',')
//                 const wasHitPosition = localStorage.getItem('was_hit_position').split(',')
//                 if(xhr.response.was_hit === true){
//                     if (wasHitPosition !== null){
//                         const name = wasHitPosition[2] + "(" + wasHitPosition[0] + "," + wasHitPosition[1] + ")"
//                         localStorage.setItem(name, "true")
//                         callback_proveri(wasHitPosition[0], wasHitPosition[1], wasHitPosition[2])
//                     }
//                 } else {
//                     if (wasHitPosition !== null) callback_proveri(wasHitPosition[0], wasHitPosition[1], wasHitPosition[2])
//                     console.log(listPosition)
//                     callback_proveri(listPosition[0], listPosition[1], listPosition[2])
//                 }
//             }
//         } else if (xhr.status === 201) {
//             document.getElementById("loading-element").innerHTML = 'Cekaj'
//         }
//     }
//     xhr.send()
// }



// // helper functions
// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }


function openWindowSetup() {
    document.getElementById('start-game').innerHTML = 'Cekamo drugog igraca'
    // localStorage.setItem("nista",0);
    localStorage.setItem("last_move", "")
    let igrac1
    let igrac2

    if (localStorage.getItem('igrac1') !== null) {
        igrac1 = localStorage.getItem('igrac1')
    } else {
        igrac1 = new String(document.mojaforma.igrac1.value);
    }

    if (localStorage.getItem('igrac2') !== null) {
        igrac2 = localStorage.getItem('igrac2')
    } else {
        igrac2 = new String(document.mojaforma.igrac2.value);
    }

    let donjaCrta = /_/;
    let broj = /[0-9]/;
    let veliko1;
    let malo1;

    let veliko2;
    let malo2;
    for (let i = 0; i < igrac1.length; i++) {
        if (igrac1.charCodeAt(i) >= 65 && igrac1.charCodeAt(i) <= 90) {
            veliko1 = 1;
        } else {
            if (igrac1.charCodeAt(i) >= 97 && igrac1.charCodeAt(i) <= 122) {
                malo1 = 1;
            }

        }
    }
    for (let i = 0; i < igrac2.length; i++) {
        if (igrac2.charCodeAt(i) >= 65 && igrac2.charCodeAt(i) <= 90) {
            veliko2 = 1;
        } else {
            if (igrac2.charCodeAt(i) >= 97 && igrac2.charCodeAt(i) <= 122) {
                malo2 = 1;
            }
        }
    }

    let vred = malo1 + malo2 + veliko1 + veliko2;

    if (igrac1.search(donjaCrta) >= 0 && igrac2.search(donjaCrta) >= 0 && igrac1.search(broj) >= 0 && igrac2.search(broj) >= 0 && igrac1.length >= 3 && igrac1.length <= 15 && igrac2.length >= 3 && igrac2.length <= 15 && vred == 4) {
        
        const ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
        const chatSocket = new WebSocket(
            ws_scheme
            + window.location.host
            + '/ws/chat/'
            + localStorage.getItem('channel_name')
            + '/'
        );
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        if(localStorage.getItem('real_player') === "1"){

            var player1Set = false

            chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data.player)
                console.log(e.data)
                if(data.player === "2") {
                    player1Set = true
                    if (data.is_set === true){
                        console.log('success')
                        localStorage.setItem("igrac2", data.message);
                        clearInterval(intervalId1)
                        localStorage.setItem("igrac1", igrac1);
                        var windSetup = window.open("/chat/og/setup/", "_self");
                    } 
                }
                
            };


            var intervalId1 = setInterval(()=>{
                const realPlayerName = igrac1
                console.log('ime igraca ' + realPlayerName)
                chatSocket.send(JSON.stringify({
                    'message': realPlayerName,
                    'player': localStorage.getItem('real_player'),
                    'is_set' : player1Set,
                }));
            }, 5000)
        } else {

            var player2Set = false

            chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data.player)
                console.log(e.data)
                if(data.player === "1") {
                    player2Set = true
                    if (true){
                        console.log('success')
                        localStorage.setItem("igrac1", data.message);
                        clearInterval(intervalId2)
                        localStorage.setItem("igrac2", igrac2);
                        chatSocket.send(JSON.stringify({
                            'message': igrac2,
                            'player': localStorage.getItem('real_player'),
                            'is_set' : player2Set
                        }));
                        var windSetup = window.open("/chat/og/setup/", "_self");
                    } 

                }
            };
            


            var intervalId2 = setInterval(()=>{
                const realPlayerName = igrac2
                console.log('ime igraca ' + realPlayerName)
                chatSocket.send(JSON.stringify({
                    'message': realPlayerName,
                    'player': localStorage.getItem('real_player'),
                    'is_set' : player2Set
                }));
            }, 6000)
        }
        // localStorage.setItem("flagIgrac", 1);
    } else {
        alert("Niste korektno uneli imena igraca!!! Ime mora da sadrzi minimum 3 karaktera, a najvise 15 od kojih mora makar jedan broj, jedno veliko i jedno malo slovo, kao i karakter '_'");
    }
}




var brKv1;
var brKv2;
var brKv3;
var brKv4;
var flagIgrac;

var brKv1_1;
var brKv1_2;
var brKv1_3;
var brKv1_4;

var brKv2_1;
var brKv2_2;
var brKv2_3;
var brKv2_4;

function funkcijaSetup() {
    if (localStorage.getItem("flagIgrac") == 1) {
        document.getElementById("igrac1Naslov").innerHTML = "Igrac 1: " + localStorage.getItem("igrac1");
        brKv1_1 = 0;
        brKv1_2 = 0;
        brKv1_3 = 0;
        brKv1_4 = 0;
        localStorage.setItem("brKv1_1", brKv1_1);
        localStorage.setItem("brKv1_2", brKv1_2);
        localStorage.setItem("brKv1_3", brKv1_3);
        localStorage.setItem("brKv1_4", brKv1_4);
    } else {
        if (localStorage.getItem("flagIgrac") == 2) {
            document.getElementById("igrac1Naslov").innerHTML = "Igrac 2: " + localStorage.getItem("igrac2");
            document.getElementById("igrac1Naslov").style.color = "red";
            document.getElementById("slikaKv1").innerHTML = '<img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" >';
            document.getElementById("slikaKv2").innerHTML = '<img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" > <img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" >';
            document.getElementById("slikaKv3").innerHTML = '<img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" > <img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" > <img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" >';
            document.getElementById("slikaKv4").innerHTML = '<img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" > <img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" > <img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" > <img src="/static/chat/battleship-assets/crveni_kvadrat.jpg" >';

            brKv2_1 = 0;
            brKv2_2 = 0;
            brKv2_3 = 0;
            brKv2_4 = 0;

            localStorage.setItem("brKv2_1", brKv2_1);
            localStorage.setItem("brKv2_2", brKv2_2);
            localStorage.setItem("brKv2_3", brKv2_3);
            localStorage.setItem("brKv2_4", brKv2_4);
        }
    }

    flagIgrac = localStorage.getItem("flagIgrac");
    brKv1 = 4;
    brKv2 = 3;
    brKv3 = 2;
    brKv4 = 1;


}

function fjaInit() {
    document.getElementById('myform').style.display = 'none'
    document.addEventListener("mousedown", fjaMouseDown());
    document.addEventListener("mouseup", fjaMouseUp());
}


var pocX;
var pocY;

function fjaMouseDown(x, y) {

    pocX = x;
    pocY = y;
}

function fjaMouseUp(x, y) {
    // alert("("+pocX+","+pocY+"):"+"("+x+","+y+")");
    let flag;
    if (pocY == y) {
        let razX;
        if (pocX > x) {
            razX = pocX - x;
            razX++;
            if ((razX == 1 && brKv1 == 0) || (razX == 2 && brKv2 == 0) || (razX == 3 && brKv3 == 0) || (razX == 4 && brKv4 == 0) || (razX > 4)) { }
            else {
                for (let i = x; i <= pocX; i++) {
                    if (document.getElementById(i + "," + y).style.backgroundColor == "blue" || document.getElementById(i + "," + y).style.backgroundColor == "grey" || document.getElementById(i + "," + y).style.backgroundColor == "red") {
                        flag = 1;
                    }
                }
                if (flag != 1) {
                    for (let i = x - 1; i <= pocX + 1; i++) {
                        for (let j = y - 1; j <= y + 1; j++) {
                            if (i >= 0 && i < 10 && j >= 0 && j < 10)
                                document.getElementById(i + "," + j).style.backgroundColor = "grey";
                        }
                    }
                    for (let i = x; i <= pocX; i++) {
                        if (flagIgrac == 1) {
                            localStorage.setItem("1(" + i + "," + y + ")", "true");
                            document.getElementById(i + "," + y).style.backgroundColor = "blue";
                        }
                        else {
                            localStorage.setItem("2(" + i + "," + y + ")", "true");
                            document.getElementById(i + "," + y).style.backgroundColor = "red";
                        }
                    }
                }

            }
        } else {
            razX = x - pocX;
            razX++;
            if ((razX == 1 && brKv1 == 0) || (razX == 2 && brKv2 == 0) || (razX == 3 && brKv3 == 0) || (razX == 4 && brKv4 == 0) || (razX > 4)) { }
            else {
                for (let i = pocX; i <= x; i++) {
                    if (document.getElementById(i + "," + y).style.backgroundColor == "blue" || document.getElementById(i + "," + y).style.backgroundColor == "grey" || document.getElementById(i + "," + y).style.backgroundColor == "red") {
                        flag = 1;
                    }
                }
                if (flag != 1) {
                    for (let i = pocX - 1; i <= x + 1; i++) {
                        for (let j = y - 1; j <= y + 1; j++) {
                            if (i >= 0 && i < 10 && j >= 0 && j < 10)
                                document.getElementById(i + "," + j).style.backgroundColor = "grey";
                        }
                    }
                    for (let i = pocX; i <= x; i++) {
                        if (flagIgrac == 1) {
                            localStorage.setItem("1(" + i + "," + y + ")", "true");
                            document.getElementById(i + "," + y).style.backgroundColor = "blue";
                        }
                        else {
                            localStorage.setItem("2(" + i + "," + y + ")", "true");
                            document.getElementById(i + "," + y).style.backgroundColor = "red";
                        }
                    }
                }
            }
        }
        if (razX != null && flag != 1) {
            if (razX == 1 && brKv1 != 0) {
                brKv1--;
                if (localStorage.getItem("flagIgrac") == 1) {
                    brKv1_1++;
                    localStorage.setItem("brKv1_1", brKv1_1);
                }
                else {
                    brKv2_1++
                    localStorage.setItem("brKv2_1", brKv2_1)
                }
                document.getElementById("kv1").innerHTML = "x" + brKv1;
            }
            if (razX == 2 && brKv2 != 0) {
                brKv2--;
                if (localStorage.getItem("flagIgrac") == 1) {
                    brKv1_2++;
                    localStorage.setItem("brKv1_2", brKv1_2);
                }
                else {
                    brKv2_2++
                    localStorage.setItem("brKv2_2", brKv2_2)
                }
                document.getElementById("kv2").innerHTML = "x" + brKv2;
            }
            if (razX == 3 && brKv3 != 0) {
                brKv3--;
                if (localStorage.getItem("flagIgrac") == 1) {
                    brKv1_3++;
                    localStorage.setItem("brKv1_3", brKv1_3);
                }
                else {
                    brKv2_3++
                    localStorage.setItem("brKv2_3", brKv2_3)
                }
                document.getElementById("kv3").innerHTML = "x" + brKv3;
            }
            if (razX == 4 && brKv4 != 0) {
                brKv4--;
                if (localStorage.getItem("flagIgrac") == 1) {
                    brKv1_4++;
                    localStorage.setItem("brKv1_4", brKv1_4);
                }
                else {
                    brKv2_4++
                    localStorage.setItem("brKv2_4", brKv2_4)
                }
                document.getElementById("kv4").innerHTML = "x" + brKv4;
            }
        }
    } else {
        if (pocX == x) {
            let razY;
            if (pocY > y) {
                razY = pocY - y;
                razY++;
                if ((razY == 1 && brKv1 == 0) || (razY == 2 && brKv2 == 0) || (razY == 3 && brKv3 == 0) || (razY == 4 && brKv4 == 0) || (razY > 4)) { }
                else {
                    for (let i = y; i <= pocY; i++) {
                        if (document.getElementById(x + "," + i).style.backgroundColor == "blue" || document.getElementById(x + "," + i).style.backgroundColor == "grey" || document.getElementById(x + "," + i).style.backgroundColor == "red") {
                            flag = 1;
                        }
                    }
                    if (flag != 1) {
                        for (let i = x - 1; i <= x + 1; i++) {
                            for (let j = y - 1; j <= pocY + 1; j++) {
                                if (i >= 0 && i < 10 && j >= 0 && j < 10)
                                    document.getElementById(i + "," + j).style.backgroundColor = "grey";
                            }
                        }
                        for (let i = y; i <= pocY; i++) {
                            if (flagIgrac == 1) {
                                localStorage.setItem("1(" + x + "," + i + ")", "true");
                                document.getElementById(x + "," + i).style.backgroundColor = "blue";
                            }
                            else {
                                localStorage.setItem("2(" + x + "," + i + ")", "true");
                                document.getElementById(x + "," + i).style.backgroundColor = "red";
                            }
                        }
                    }
                }
            } else {
                razY = y - pocY;
                razY++;
                if ((razY == 1 && brKv1 == 0) || (razY == 2 && brKv2 == 0) || (razY == 3 && brKv3 == 0) || (razY == 4 && brKv4 == 0) || (razY > 4)) { }
                else {
                    for (let i = pocY; i <= y; i++) {
                        if (document.getElementById(x + "," + i).style.backgroundColor == "blue" || document.getElementById(x + "," + i).style.backgroundColor == "grey" || document.getElementById(x + "," + i).style.backgroundColor == "red") {
                            flag = 1;
                        }
                    }
                    if (flag != 1) {
                        for (let i = x - 1; i <= x + 1; i++) {
                            for (let j = pocY - 1; j <= y + 1; j++) {
                                if (i >= 0 && i < 10 && j >= 0 && j < 10)
                                    document.getElementById(i + "," + j).style.backgroundColor = "grey";
                            }
                        }
                        for (let i = pocY; i <= y; i++) {
                            if (flagIgrac == 1) {
                                localStorage.setItem("1(" + x + "," + i + ")", "true");
                                document.getElementById(x + "," + i).style.backgroundColor = "blue";
                            }
                            else {
                                localStorage.setItem("2(" + x + "," + i + ")", "true");
                                document.getElementById(x + "," + i).style.backgroundColor = "red";
                            }
                        }
                    }
                }
            }
            if (razY != null && flag != 1) {
                if (razY == 1 && brKv1 != 0) {
                    brKv1--;
                    if (localStorage.getItem("flagIgrac") == 1) {
                        brKv1_1++;
                        localStorage.setItem("brKv1_1", brKv1_1);
                    }
                    else {
                        brKv2_1++
                        localStorage.setItem("brKv2_1", brKv2_1)
                    }
                    document.getElementById("kv1").innerHTML = "x" + brKv1;
                }
                if (razY == 2 && brKv2 != 0) {
                    brKv2--;
                    if (localStorage.getItem("flagIgrac") == 1) {
                        brKv1_2++;
                        localStorage.setItem("brKv1_2", brKv1_2);
                    }
                    else {
                        brKv2_2++
                        localStorage.setItem("brKv2_2", brKv2_2)
                    }
                    document.getElementById("kv2").innerHTML = "x" + brKv2;
                }
                if (razY == 3 && brKv3 != 0) {
                    brKv3--;
                    if (localStorage.getItem("flagIgrac") == 1) {
                        brKv1_3++;
                        localStorage.setItem("brKv1_3", brKv1_3);
                    }
                    else {
                        brKv2_3++
                        localStorage.setItem("brKv2_3", brKv2_3)
                    }
                    document.getElementById("kv3").innerHTML = "x" + brKv3;
                }
                if (razY == 4 && brKv4 != 0) {
                    brKv4--;
                    if (localStorage.getItem("flagIgrac") == 1) {
                        brKv1_4++;
                        localStorage.setItem("brKv1_4", brKv1_4);
                    }
                    else {
                        brKv2_4++
                        localStorage.setItem("brKv2_4", brKv2_4)
                    }
                    document.getElementById("kv4").innerHTML = "x" + brKv4;
                }
            }
        }
    }
    pocX = null;
    pocY = null;
    x = null;
    y = null;
}

var windGame;



function getElemFromStorage(){

    var values = {},
    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
        if (keys[i][1] == "("){
            values[keys[i]] = localStorage.getItem(keys[i])
    
        } else if (keys[i].substring(0, 4) == "brKv"){
            values[keys[i]] = localStorage.getItem(keys[i])
        }
    }
    return values
}

function setObjectToStorage(obj){
    keys = Object.keys(obj)
    i = keys.length;
    while ( i-- ) {
        localStorage.setItem(keys[i], obj[keys[i]])
    }

}



function otvoriNovProzor() {
        localStorage.setItem("flagIgrac", 2);
        
        const ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
        const chatSocket = new WebSocket(
            ws_scheme
            + window.location.host
            + '/ws/chat/'
            + localStorage.getItem('channel_name')
            + '/'
        );
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };



        document.getElementById('zavrsio').innerHTML = 'Cekamo drugog igraca'

        if(localStorage.getItem('real_player') === "1"){

            var player1Set = false

            chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data.player)
                console.log(e.data)
                if(data.player === "2") {
                    player1Set = true
                    if (data.is_set === true){
                        console.log('success')
                        setObjectToStorage(data.message)
                        clearInterval(intervalId1)
                        windSetup = window.open("/chat/og/game/", "_self");
                    } 
                }
                
            };


            var intervalId1 = setInterval(()=>{
                const shipData = getElemFromStorage()
                console.log(shipData)
                chatSocket.send(JSON.stringify({
                    'message': shipData,
                    'player': localStorage.getItem('real_player'),
                    'is_set' : player1Set,
                }));
            }, 5000)
        } else {

            var player2Set = false

            chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data);
                console.log(data.player)
                console.log(e.data)
                if(data.player === "1") {
                    player2Set = true
                    if (true){
                        console.log('success')
                        setObjectToStorage(data.message)
                        clearInterval(intervalId2)
                        chatSocket.send(JSON.stringify({
                            'message': getElemFromStorage(),
                            'player': localStorage.getItem('real_player'),
                            'is_set' : player2Set
                        }));
                        windSetup = window.open("/chat/og/game/", "_self");
                    } 

                }
            };
            


            var intervalId2 = setInterval(()=>{
                const shipData = getElemFromStorage()
                console.log(shipData)
                chatSocket.send(JSON.stringify({
                    'message': shipData,
                    'player': localStorage.getItem('real_player'),
                    'is_set' : player2Set
                }));
            }, 6000)
        }










}

function fjaGame() {

    const ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
    window.chatSocket = new WebSocket(
        ws_scheme
        + window.location.host
        + '/ws/chat/'
        + localStorage.getItem('channel_name')
        + '/'
    );

    window.chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data.player)
        console.log(e.data)
        if(data.player !== localStorage.getItem('real_player')) {
            console.log('success')
            const res = data.message.split(",")
            proveri(res[0],res[1],res[2], 1)
        }
        
    };

    if( localStorage.getItem('real_player') == "1"){
        naPotezuIgrac1()
    } else {
        naPotezuIgrac2()
    }

    if (localStorage.getItem("flagIgrac") == 1) {
        document.getElementById("gameIgrac1").innerHTML = "Na potezu:" + localStorage.getItem("igrac1");
        // naPotezuIgrac1();
    }
    else document.getElementById("gameIgrac1").innerHTML = localStorage.getItem("igrac1");
    document.getElementById("gameIgrac1").style.color = "blue";
    if (localStorage.getItem("flagIgrac") == 2) {
        document.getElementById("gameIgrac2").innerHTML = "Na potezu:" + localStorage.getItem("igrac2");
        // naPotezuIgrac2();
    }
    else document.getElementById("gameIgrac2").innerHTML = localStorage.getItem("igrac2");
    document.getElementById("gameIgrac2").style.color = "red";
}


function proveri(x, y, t, player=null) {
    console.log(window.chatSocket)
    if(player == null){
        chatSocket.send(JSON.stringify({
            'message': x+","+y+","+t,
            'player': localStorage.getItem('real_player'),
            'is_set' : false
        }));
    }
    if (localStorage.getItem("flagIgrac") == 2 && t == 1) {
        if (localStorage.getItem("1(" + x + "," + y + ")") != "pogodjen" && localStorage.getItem("1(" + x + "," + y + ")") != "promasaj") {
            if (localStorage.getItem("1(" + x + "," + y + ")") == "true") {
                document.getElementById("1(" + x + "," + y + ")").style.backgroundColor = "green";
                let z = document.getElementById("audioBomb");
                localStorage.setItem('was_hit', true)
                z.play();
                localStorage.setItem("flagIgrac", 2);
                localStorage.setItem("1(" + x + "," + y + ")", "pogodjen");
                proveriBrodIgraca1(x, y);
                proveriIgraca1();
                handleSendMove(x+","+y+","+t, true)
                //localStorage.removeItem("1("+x+","+y+")");
            } else {
                document.getElementById("1(" + x + "," + y + ")").style.backgroundColor = "grey";
                let k = document.getElementById("audioWater");
                localStorage.setItem('was_hit', false)
                k.play();
                localStorage.setItem("flagIgrac", 1);
                document.getElementById("gameIgrac1").innerHTML = "Na potezu:" + localStorage.getItem("igrac1");
                document.getElementById("gameIgrac2").innerHTML = localStorage.getItem("igrac2");
                localStorage.setItem("1(" + x + "," + y + ")", "promasaj");
                // naPotezuIgrac1();
                //localStorage.removeItem("1("+x+","+y+")");
            }
        }
    } else {
        if (localStorage.getItem("flagIgrac") == 1 && t == 2) {
            if (localStorage.getItem("2(" + x + "," + y + ")") != "pogodjen" && localStorage.getItem("2(" + x + "," + y + ")") != "promasaj") {
                if (localStorage.getItem("2(" + x + "," + y + ")") == "true") {
                    document.getElementById("2(" + x + "," + y + ")").style.backgroundColor = "green";
                    localStorage.setItem('was_hit', true)
                    let z = document.getElementById("audioBomb");
                    z.play();
                    localStorage.setItem("flagIgrac", 1);
                    localStorage.setItem("2(" + x + "," + y + ")", "pogodjen");
                    proveriBrodIgraca2(x, y);
                    proveriIgraca2();
                    handleSendMove(x+","+y+","+t, true)
                    //localStorage.removeItem("2("+x+","+y+")");
                } else {
                    document.getElementById("2(" + x + "," + y + ")").style.backgroundColor = "grey";
                    let k = document.getElementById("audioWater");
                    localStorage.setItem('was_hit', false)
                    k.play();
                    localStorage.setItem("flagIgrac", 2);
                    document.getElementById("gameIgrac2").innerHTML = "Na potezu:" + localStorage.getItem("igrac2");
                    document.getElementById("gameIgrac1").innerHTML = localStorage.getItem("igrac1");
                    localStorage.setItem("2(" + x + "," + y + ")", "promasaj");
                    // naPotezuIgrac2();
                    //localStorage.removeItem("2("+x+","+y+")");
                }
            }
        }
    }
}


function naPotezuIgrac1() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (document.getElementById("2(" + i + "," + j + ")").style.backgroundColor == "red") {
                document.getElementById("2(" + i + "," + j + ")").style.backgroundColor = "white";
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (localStorage.getItem("1(" + i + "," + j + ")") == "true") {
                document.getElementById("1(" + i + "," + j + ")").style.backgroundColor = "blue";
            }
        }
    }
}

function naPotezuIgrac2() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (document.getElementById("1(" + i + "," + j + ")").style.backgroundColor == "blue") {
                document.getElementById("1(" + i + "," + j + ")").style.backgroundColor = "white";
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (localStorage.getItem("2(" + i + "," + j + ")") == "true") {
                document.getElementById("2(" + i + "," + j + ")").style.backgroundColor = "red";
            }
        }
    }
}

function proveriIgraca1() {
    let g;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (localStorage.getItem("1(" + i + "," + j + ")") == "true") {
                g = 1;
            }
        }
    }
    if (g != 1) {
        alert("Igrac 2: " + localStorage.getItem("igrac2") + " je pobednik!!! Brodovi koji su mu ostali:    1polje: " + localStorage.getItem("brKv2_1") + ", 2polja: " + localStorage.getItem("brKv2_2") +
            ", 3polja: " + localStorage.getItem("brKv2_3") + ", 4polje: " + localStorage.getItem("brKv2_4"));
        window.open("/chat/og/", "_self");
    }
    g = null;
}

function proveriIgraca2() {
    let g;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (localStorage.getItem("2(" + i + "," + j + ")") == "true") {
                g = 1;
            }
        }
    }
    if (g != 1) {
        alert("Igrac 1: " + localStorage.getItem("igrac1") + " je pobednik!!! Brodovi koji su mu ostali:    1polje: " + localStorage.getItem("brKv1_1") + ", 2polja: " + localStorage.getItem("brKv1_2") +
            ", 3polja: " + localStorage.getItem("brKv1_3") + ", 4polje: " + localStorage.getItem("brKv1_4"));
        window.open("/chat/og/", "_self");
    }
    g = null;
}
var nijePot = null;
function proveriBrodIgraca1(x, y) {
    if (localStorage.getItem("1(" + (x - 1) + "," + y + ")") == "pogodjen" || localStorage.getItem("1(" + (x + 1) + "," + y + ")") == "pogodjen") {
        idiLevoPaRadi1(x, y);
    } else {
        if (localStorage.getItem("1(" + x + "," + (y - 1) + ")") == "pogodjen" || localStorage.getItem("1(" + x + "," + (y + 1) + ")") == "pogodjen")
            idiGorePaRadi1(x, y);
        else {
            if (localStorage.getItem("1(" + (x - 1) + "," + y + ")") != "true" && localStorage.getItem("1(" + (x - 1) + "," + y + ")") != "pogodjen" && localStorage.getItem("1(" + (x + 1) + "," + y + ")") != "true" && localStorage.getItem("1(" + (x + 1) + "," + y + ")") != "pogodjen" && localStorage.getItem("1(" + x + "," + (y - 1) + ")") != "true" && localStorage.getItem("1(" + x + "," + (y - 1) + ")") != "pogodjen" && localStorage.getItem("1(" + x + "," + (y + 1) + ")") != "true" && localStorage.getItem("1(" + x + "," + (y + 1) + ")") != "pogodjen") {
                document.getElementById("1(" + x + "," + y + ")").style.backgroundColor = "yellow";
                let pom = localStorage.getItem("brKv1_1") - 1;
                localStorage.setItem("brKv1_1", pom);
            }
        }
    }
}

function proveriBrodIgraca2(x, y) {
    if (localStorage.getItem("2(" + (x - 1) + "," + y + ")") == "pogodjen" || localStorage.getItem("2(" + (x + 1) + "," + y + ")") == "pogodjen") {
        idiLevoPaRadi2(x, y);
    } else {
        if (localStorage.getItem("2(" + x + "," + (y - 1) + ")") == "pogodjen" || localStorage.getItem("2(" + x + "," + (y + 1) + ")") == "pogodjen")
            idiGorePaRadi2(x, y);
        else {
            if (localStorage.getItem("2(" + (x - 1) + "," + y + ")") != "true" && localStorage.getItem("2(" + (x - 1) + "," + y + ")") != "pogodjen" && localStorage.getItem("2(" + (x + 1) + "," + y + ")") != "true" && localStorage.getItem("2(" + (x + 1) + "," + y + ")") != "pogodjen" && localStorage.getItem("2(" + x + "," + (y - 1) + ")") != "true" && localStorage.getItem("2(" + x + "," + (y - 1) + ")") != "pogodjen" && localStorage.getItem("2(" + x + "," + (y + 1) + ")") != "true" && localStorage.getItem("2(" + x + "," + (y + 1) + ")") != "pogodjen") {
                document.getElementById("2(" + x + "," + y + ")").style.backgroundColor = "yellow";
                let pom = localStorage.getItem("brKv2_1") - 1;
                localStorage.setItem("brKv2_1", pom);
            }
        }
    }
}

function idiGorePaRadi1(x, y) {
    let j;
    while (localStorage.getItem("1(" + x + "," + y + ")") == "pogodjen") {
        y--;
    }
    if (localStorage.getItem("1(" + x + "," + y + ")") == "true") {
        nijePot = 1;
    } else {
        y++;
        j = y;
        while (localStorage.getItem("1(" + x + "," + y + ")") == "pogodjen") {
            y++;
        }
        if (localStorage.getItem("1(" + x + "," + y + ")") == "true") {
            nijePot = 1;
        } else {
            for (let i = j; i < y; i++) {
                document.getElementById("1(" + x + "," + i + ")").style.backgroundColor = "yellow";
            }
            console.log(y - j);
            let pom;
            if ((y - j) == 1) {
                pom = localStorage.getItem("brKv1_1") - 1;
                localStorage.setItem("brKv1_1", pom);
            } else {
                if ((y - j) == 2) {
                    pom = localStorage.getItem("brKv1_2") - 1;
                    localStorage.setItem("brKv1_2", pom);
                } else {
                    if ((y - j) == 3) {
                        pom = localStorage.getItem("brKv1_3") - 1;
                        localStorage.setItem("brKv1_3", pom);
                    } else {
                        if ((y - j) == 4) {
                            pom = localStorage.getItem("brKv1_4") - 1;
                            localStorage.setItem("brKv1_4", pom);
                        }
                    }
                }
            }
        }
    }
    nijePot = null;
}

function idiLevoPaRadi1(x, y) {
    let j;
    while (localStorage.getItem("1(" + x + "," + y + ")") == "pogodjen") {
        x--;
    }
    if (localStorage.getItem("1(" + x + "," + y + ")") == "true") {
        nijePot = 1;
    } else {
        x++;
        j = x;
        while (localStorage.getItem("1(" + x + "," + y + ")") == "pogodjen") {
            x++;
        }
        if (localStorage.getItem("1(" + x + "," + y + ")") == "true") {
            nijePot = 1;
        } else {
            for (let i = j; i < x; i++) {
                document.getElementById("1(" + i + "," + y + ")").style.backgroundColor = "yellow";
            }
            console.log(x - j);
            let pom;
            if ((x - j) == 1) {
                pom = localStorage.getItem("brKv1_1") - 1;
                localStorage.setItem("brKv1_1", pom);
            } else {
                if ((x - j) == 2) {
                    pom = localStorage.getItem("brKv1_2") - 1;
                    localStorage.setItem("brKv1_2", pom);
                } else {
                    if ((x - j) == 3) {
                        pom = localStorage.getItem("brKv1_3") - 1;
                        localStorage.setItem("brKv1_3", pom);
                    } else {
                        if ((x - j) == 4) {
                            pom = localStorage.getItem("brKv1_4") - 1;
                            localStorage.setItem("brKv1_4", pom);
                        }
                    }
                }
            }
        }
    }
    nijePot = null;
}
function idiGorePaRadi2(x, y) {
    let j;
    while (localStorage.getItem("2(" + x + "," + y + ")") == "pogodjen") {
        y--;
    }
    if (localStorage.getItem("2(" + x + "," + y + ")") == "true") {
        nijePot = 1;
    } else {
        y++;
        j = y;
        while (localStorage.getItem("2(" + x + "," + y + ")") == "pogodjen") {
            y++;
        }
        if (localStorage.getItem("2(" + x + "," + y + ")") == "true") {
            nijePot = 1;
        } else {
            for (let i = j; i < y; i++) {
                document.getElementById("2(" + x + "," + i + ")").style.backgroundColor = "yellow";
            }
            console.log(y - j);
            let pom;
            if ((y - j) == 1) {
                pom = localStorage.getItem("brKv2_1") - 1;
                localStorage.setItem("brKv2_1", pom);
            } else {
                if ((y - j) == 2) {
                    pom = localStorage.getItem("brKv2_2") - 1;
                    localStorage.setItem("brKv2_2", pom);
                } else {
                    if ((y - j) == 3) {
                        pom = localStorage.getItem("brKv2_3") - 1;
                        localStorage.setItem("brKv2_3", pom);
                    } else {
                        if ((y - j) == 4) {
                            pom = localStorage.getItem("brKv2_4") - 1;
                            localStorage.setItem("brKv2_4", pom);
                        }
                    }
                }
            }
        }
    }
    nijePot = null;
}

function idiLevoPaRadi2(x, y) {
    let j;
    while (localStorage.getItem("2(" + x + "," + y + ")") == "pogodjen") {
        x--;
    }
    if (localStorage.getItem("2(" + x + "," + y + ")") == "true") {
        nijePot = 1;
    } else {
        x++;
        j = x;
        while (localStorage.getItem("2(" + x + "," + y + ")") == "pogodjen") {
            x++;
        }
        if (localStorage.getItem("2(" + x + "," + y + ")") == "true") {
            nijePot = 1;
        } else {
            for (let i = j; i < x; i++) {
                document.getElementById("2(" + i + "," + y + ")").style.backgroundColor = "yellow";
            }
            console.log(x - j);
            let pom;
            if ((x - j) == 1) {
                pom = localStorage.getItem("brKv2_1") - 1;
                localStorage.setItem("brKv2_1", pom);
            } else {
                if ((x - j) == 2) {
                    pom = localStorage.getItem("brKv2_2") - 1;
                    localStorage.setItem("brKv2_2", pom);
                } else {
                    if ((x - j) == 3) {
                        pom = localStorage.getItem("brKv2_3") - 1;
                        localStorage.setItem("brKv2_3", pom);
                    } else {
                        if ((x - j) == 4) {
                            pom = localStorage.getItem("brKv2_4") - 1;
                            localStorage.setItem("brKv2_4", pom);
                        }
                    }
                }
            }
        }
    }
    nijePot = null;
}

