"use strict";

const multiChoice = document.getElementsByClassName("multi-choice");
const textArea = document.querySelector("textarea");
const form = document.querySelector("form");
const select = document.querySelector("select");
const correctOption = document.getElementById("correctOption");
const quizSubjectContainer = document.getElementById("quizSubjectContainer");
const questionProgressP = document.querySelector("#question-container p");
const questionTextH1 = document.querySelector("#question-container h1");
const optionsContainer = document.querySelector("#options-container");
const contentConatiner = document.querySelector(".content");

// const iconObj = {html: "fa fa-html", css: "fa fa-css"}

let quizzes=localStorage.getItem("quizzes") ? JSON.parse(localStorage.getItem("quizzes")) :{
  html:[],
  css:[],
  javascript:[]
}

// adding a question
if(form){
  form.onsubmit =(event)=>{
    event.preventDefault();

    const questionObj ={
      id:new Date().getTime,
      question:textArea.value,
      options: Array.from(multiChoice).map(choice =>choice.value),
      correctOption: correctOption.value
    }

    quizzes[select.value].push(questionObj);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("New Question Added successfully!");
    form.reset();
  }
}

//displaying of question type(subject)
for(const key in quizzes){

  const div = document.createElement("div");
  div.className = "option";

  const i = document.createElement("i");
  // i.className = iconObj[key];
  i.className = "fa fa-code";

  const text = document.createTextNode(key.toUpperCase());

  div.append(i,text);
  quizSubjectContainer &&  quizSubjectContainer.appendChild(div)
}


if (quizSubjectContainer) {
  quizSubjectContainer.onclick = (e) => {
    if (e.target.className === "option") {
      location.href = `quizquestion.html?type=${e.target.innerText.toLowerCase()}`;
    }
  }
}

let type = location.search.split("?").find((val) => val.startsWith("type="));

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

function displayCurrentQuestion () {

  questionProgressP.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}.`;
  questionTextH1.innerHTML = questions[currentQuestionIndex].question;

  const optionsIdentifier = ['A', 'B', 'C', 'D'];

  optionsContainer.innerHTML = "";

  questions[currentQuestionIndex].options.forEach((option, index) => {
  const div = document.createElement("div");
  div.className = "option";

    const span = document.createElement("span");
    span.innerHTML = optionsIdentifier[index];
    const optionText = document.createTextNode(option.toUpperCase());

    div.append(span, optionText);
    optionsContainer.appendChild(div);
  })
  }
 


if (type) {
  type = type.split("=")[1];
  questions = quizzes[type];

  // if(quizzes.length === 0){
  //   contentConatiner.innerHTML = `<h1>You dont have a question </h1>`;
  //   contentConatiner.style.color = 'white' ;
  //   contentConatiner.style.fontSize = "50px";
  
  //   const button = document.createElement("button");
  //   button.innerText ="click to add";
  //   button.style.color = "red";
  //   button.style.display = "block";
  //   button.style.padding= "6px";
  //   contentConatiner.appendChild(button);
  
  //   button.onclick = function(){
  //   location.href = "createquestion.html";
  //   }
  
  // } else{ 
    displayCurrentQuestion();
 
}


 optionsContainer.onclick = (e) => {
  if (e.target.className === "option") {

    if (currentQuestionIndex <= questions.length){
      const userAnswer = e.target.innerText.slice(1);
      if (userAnswer === questions[currentQuestionIndex].correctOption.toUpperCase()) {
        score += 1;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex += 1;

      displayCurrentQuestion();
    } else {
    
      contentConatiner.innerHTML = `<h1> <p>You finished the quiz:</p>Your Score is ${score} out of ${questions.length}</h1>`;
      contentConatiner.style.color = "white";
      contentConatiner.style.fontSize = "30px";

    }
  }
}




