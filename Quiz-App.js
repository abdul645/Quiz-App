//defining array, containing object
const questions=[
    {
        question: "Which is the largest animal in the world",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },

    {
        question: "Which is the Smallest Country in the world",
        answer: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },

    {
        question: "Which is the largest desert in the world",
        answer: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },

    {
        question: "Which is the Smallest Continent in the world",
        answer: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: " What is the name of the weak zone of the earth’s crust?",
        answer: [
            {text: "Seismic", correct: true},
            {text: "Cosmic", correct: false},
            {text: "Formic", correct: false},
            {text: "Anaemic", correct: false},
        ]
    },
    {
        question: "Where was India’s first national Museum opened?",
        answer: [
            {text: "Delhi", correct: false},
            {text: "Hyderabad", correct: false},
            {text: "Rajasthan", correct: false},
            {text: "Mumbai", correct: true},
        ]
    }
    ,
    {
        question: "In 2019, Which popular singer was awarded the Bharat Ratna award?",
        answer: [
            {text: "Lata Mangeshkar", correct: false},
            {text: "Asha Bhosle", correct: false},
            {text: "Bhupen Hazarika", correct: true},
            {text: "Manna Dey", correct: false},
        ]
    } ,
    {
        question: "The world’s nation 5G mobile network was launched by which country?",
        answer: [
            {text: "Japan", correct: false},
            {text: "Asia", correct: false},
            {text: "South Korea", correct: true},
            {text: "Malaysia", correct: false},
        ]
    } ,
    {
        question: " The green planet in the solar system is?",
        answer: [
            {text: "Mars", correct: false},
            {text: "Uranus", correct: true},
            {text: "Venus", correct: false},
            {text: "Earth", correct: false},
        ]
    },
    {
        question: "What is the reason behind the Bats flying in the dark?",
        answer: [
            {text: "they produce high pitched sounds called ultrasonics", correct: true},
            {text: "the light startles them", correct: false},
            {text: "they have a perfect vision in the dark", correct: false},
            {text: "none of the above", correct: false},
        ]
    } 
    

];

const questionElement= document.querySelector('#question');
const answerBtn= document.querySelector('#answer-button');
const nextBtn= document.querySelector('#next-btn');

let CurrentQuestionIndex = 0;
let Score = 0;

function StartQuiz(){
    CurrentQuestionIndex = 0;
    Score = 0;
    nextBtn.innerHTML = "Next";
    ShowQuestion(); //calling ShowQuestion() to display the first question.
}

function ShowQuestion(){
    resetState(); //calling function 
    let CurrentQuestion=questions[CurrentQuestionIndex];
    let questionNo = CurrentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + " . " + CurrentQuestion.question; // displaying ques number and question 


    // adding options
    CurrentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button); //displaying options


        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



// hiding previous option that we write in html code
// resetState() function hides the "Next" button and removes any previously displayed answer buttons.
function resetState(){
    nextBtn.style.display="none";
    // JavaScript loop that removes all child elements from an HTML element represented by the answerBtn variable.
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


// selectAnswer(e) function is called when the user selects an answer. 
// It checks if the selected answer is correct, adds appropriate CSS classes for styling, and updates the user's score.
//  It also disables all answer buttons to prevent multiple selections.
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect= selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        Score++;
    }
    else{
        selectedBtn.classList.add("inCorrect")
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct"); //when this line of code is executed, it adds the "correct" CSS class to the button. 
        }
        button.disabled=true; //making all button disabled after selecting one option
    });
    nextBtn.style.display="block"; // displaying button that was hide
}

// showScore() function displays the user's final score and allows them to play again 
// by changing the text of the "Next" button.
function showScore(){
    resetState();
    questionElement.innerHTML= `you scored ${Score} out of ${questions.length}!`;
    nextBtn.innerHTML="play again";
    nextBtn.style.display="block";
}

function handleNextButton(){
    CurrentQuestionIndex++;
    if(CurrentQuestionIndex < questions.length){
        ShowQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(CurrentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        StartQuiz();
    }
});

StartQuiz();