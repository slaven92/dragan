(this["webpackJsonpkviz-web"]=this["webpackJsonpkviz-web"]||[]).push([[0],{13:function(e,a,t){e.exports=t(25)},18:function(e,a,t){},19:function(e,a,t){},25:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(10),s=t.n(c),l=(t(18),t(8)),o=t(2);t(19);var i=function(e){var a=e.username?e.username:"Anonimus",t=!!e.isLogedIn&&e.isLogedIn,n=t?"Odjavi se":"Prijavi se";return!0===t?r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand-lg  navbar-dark bg-primary"},r.a.createElement("a",{className:"navbar-brand"},a),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item active"},r.a.createElement("a",{className:"nav-link",href:"#"},n,r.a.createElement("span",{className:"sr-only"},"(current)"))),r.a.createElement("li",{className:"nav-item active"},r.a.createElement("a",{className:"nav-link",href:"#"},"Kreiraj pitanje",r.a.createElement("span",{className:"sr-only"},"(current)"))))))):r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand-lg  navbar-dark bg-primary"},r.a.createElement("a",{className:"navbar-brand"},a),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item active"},r.a.createElement("a",{className:"nav-link",href:"#"},n,r.a.createElement("span",{className:"sr-only"},"(current)")))))))},m=t(6),u=t(11),v=t(12);function d(e){var a=Object(n.useState)(!1),t=Object(o.a)(a,2),c=t[0],s=t[1],l=Object(n.useState)(""),i=Object(o.a)(l,2),m=i[0],u=i[1];return Object(n.useEffect)((function(){var a;a=e.answers,E("POST","/submit/",(function(e,a){s(!0),u(e.result)}),a)}),[e.answers]),!0===c?r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-sx"},r.a.createElement("div",{className:"card"},r.a.createElement("img",{className:"card-img-top",src:"http://127.0.0.1:8000/static/kviz/".concat(m,".jpeg"),alt:"Responsive"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},m),r.a.createElement("p",{className:"card-text"},"Ovo je jedan od mnogih verzija Dragana."),r.a.createElement("a",{href:"/",onClick:function(){return e.onClick()},className:"btn btn-primary"},"Pocni opet"))))):r.a.createElement("div",null,"Loading")}function b(e){var a=e.question?e.question.question_text:"",t=e.question?e.question.choice_set:[],n=e.question?e.question.creator:"",c=e.question?e.question.votes:0;return r.a.createElement("div",null,r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-sm"},r.a.createElement("div",{className:"border"},r.a.createElement("div",{className:"border my-3"},r.a.createElement("p",{className:"h1 text-center"},a)),r.a.createElement("div",{className:"border mt-3"},r.a.createElement(p,{answers:t,onClick:e.onClick}))))),r.a.createElement("div",{className:"row justify-content-between"},r.a.createElement("div",{className:"col-auto"},r.a.createElement("p",null," Pitanje postavio: ",n)),r.a.createElement("div",{className:"col-md-2 col-3"},r.a.createElement("button",{className:"btn btn-dark btn-block"},r.a.createElement(m.a,{icon:u.a})," ",r.a.createElement("span",{className:"badge badge-primary"},c)))))}function p(e){return e.answers.map((function(a,t){return r.a.createElement("div",{className:"mx-auto m-6 border",key:t},r.a.createElement("button",{type:"button",className:"btn btn-outline-primary btn-lg btn-block",onClick:function(){return e.onClick(a.choice_text)}},a.choice_text,"(",a.votes,r.a.createElement(m.a,{icon:v.a}),")"))}))}function E(e,a,t,n){var r;n&&(r=JSON.stringify(n));var c=new XMLHttpRequest,s="http://127.0.0.1:8000/api".concat(a);c.responseType="json",c.open(e,s);var l=function(e){var a=null;if(document.cookie&&""!==document.cookie)for(var t=document.cookie.split(";"),n=0;n<t.length;n++){var r=t[n].trim();if(r.substring(0,e.length+1)===e+"="){a=decodeURIComponent(r.substring(e.length+1));break}}return a}("csrftoken");c.setRequestHeader("Content-Type","application/json"),l&&(c.setRequestHeader("HTTP_X_REQUEST_WITH","XMLHttpRequest"),c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("X-CSRFToken",l)),c.onload=function(){t(c.response,c.status)},c.onerror=function(e){console.log(e),t({message:"Ne radi"},400)},c.send(r)}var g=function(){var e=Object(n.useState)([]),a=Object(o.a)(e,2),t=a[0],c=a[1],s=Object(n.useState)(!1),m=Object(o.a)(s,2),u=m[0],v=m[1],p=Object(n.useState)(!1),g=Object(o.a)(p,2),N=g[0],f=g[1],j=Object(n.useState)(0),k=Object(o.a)(j,2),h=k[0],O=k[1],y=Object(n.useState)([]),q=Object(o.a)(y,2),w=q[0],S=q[1],C=Object(n.useState)(!1),x=Object(o.a)(C,2),R=x[0],T=x[1],H=Object(n.useState)("Anonimus"),L=Object(o.a)(H,2),_=L[0],I=L[1];return Object(n.useEffect)((function(){!1===N&&(E("GET","/questions/",(function(e,a){c(Object(l.a)(e)),f(!0)})),function(e){E("GET","/isLogedIn/",e)}((function(e,a){200===a&&(T(!0),I(e.username))})))}),[N]),!0===N?!0===u?r.a.createElement("div",{className:"mx-auto"},r.a.createElement(i,null),r.a.createElement(d,{answers:w,onClick:function(){!0===N&&(f(!1),O(0))}})):r.a.createElement("div",null,r.a.createElement(i,{username:_,isLogedIn:R}),r.a.createElement(b,{question:t[h],onClick:function(e){var a=Object(l.a)(w),n={answer:e,question:t[h].question_text};a.push(n),S(a),O(h+1),h===t.length-1&&v(!0)}})):r.a.createElement("div",null,r.a.createElement(i,null),"Loading")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.c7885757.chunk.js.map