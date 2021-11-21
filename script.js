const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-question')

// Event Listeners
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

// Created variables to mix the questions around so you would not have questions in the same order. 
// Created variable to initialize the index of each question
let shuffledQuestions, currentQuestionIndex

//Function to display the Start screen and accumulates the index of the first question to be random.
function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=> Math.random() - .5 )
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    nextQuestion()

}
// Function that introduces another function to reset after each question
function nextQuestion () {
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])


}
//Function to display the questions
function displayQuestion (question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)


    })
}

function resetState() {
    clearStatusClass(document.body) 
    nextButton.classList.add('hide')
    while (answerButtonEl.firstChild){
        answerButtonEl.removeChild(answerButtonEl.firstChild)
    }

}

//Function for when you select an answer 
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length >currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else { 
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        
    }
    
}
//Conditional Statement for clearStatusClass
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

//Clearing elements for the setStatusClass
function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Questions 
const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            {text:'strings', correct: false},
            {text:'booleans', correct: false},
            {text:'alerts', correct: true},
            {text:'numbers', correct: false}  
        ]
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answers: [
            {text:'quotes', correct: false},
            {text:'curly brackets', correct: false},
            {text:'square brackets', correct: false},
            {text:'parentheses', correct: true}  
        ]
    },    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
            {text:' numbers and strings', correct: false},
            {text:'other arrays', correct: false},
            {text:' booleans ', correct: false},
            {text:' all of the above', correct: true}  
        ]
    },    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers: [
            {text:'quotes', correct: true},
            {text:'commas', correct: false},
            {text:'curly brackets', correct: false},
            {text:'parentheses', correct: false}  
        ]
    },    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            {text:'JavaScript', correct: false},
            {text:'console.log ', correct: true},
            {text:'terminal / bash', correct: false},
            {text:'for loops', correct: false}  
        ]
    },

]