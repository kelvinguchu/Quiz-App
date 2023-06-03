// Create an array of objects with questions and answers
let questions = [
    {
      question: "Which one of the following is not used to declare a constant in JavaScript?",
      answers: [
        {
          text: "this",
          correct: true
        },
        {
          text: "const",
          correct: false
        },
        {
          text: "let",
          correct: false
        },
        {
          text: "var",
          correct: false
        }
      ]
    },
    {
      question: "Which keyword is used to reference an object in its scope?",
      answers: [
        {
          text: "this",
          correct: true
        },
        {
          text: "const",
          correct: false
        }
      ]
    },
    {
      question: "What is the result of the following expression? 5 + '5'",
      answers: [
        {
          text: "10",
          correct: false
        },
        {
          text: "undefined",
          correct: false
        },
        {
          text: "25",
          correct: false
        },
        {
          text: "55",
          correct: true
        }
      ]
    },
    {
      question: "Which array method is used to remove the last element from an array?",
      answers: [
        {
          text: "shift()",
          correct: false
        },
        {
          text: "slice()",
          correct: false
        },
        {
          text: "pop()",
          correct: true
        },
        {
          text: "push()",
          correct: false
        }
      ]
    },
    {
      question: "What does the 'typeof' operator return for an array?",
      answers: [
        {
          text: "array",
          correct: false
        },
        {
          text: "object",
          correct: true
        },
        {
          text: "undefined",
          correct: false
        },
        {
          text: "string",
          correct: false
        }
      ]
    }
  ];
  
  //Get DOM element for the quiz
  const quiz = document.getElementById("quiz");

  //Initialize the counters
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 50;
  let timer;
  
  document.getElementById("start").addEventListener('click', startQuiz);
  
    /**
     * Clears quiz element and displays current question with answer options and a Next button
     */
    function showQuestion() {
        quiz.innerHTML = "";
    
        // Get current question
        const currentQuestion = questions[currentQuestionIndex];
    
        // Display current question
        const questionElement = document.createElement("h3");
        questionElement.textContent = currentQuestion.question;
        quiz.appendChild(questionElement);
    
        // Display answer options
        const answers = currentQuestion.answers;
        for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
    
        // Display checkbox for answer option
        const inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.name = "answer";
        inputElement.value = answer.text;
        quiz.appendChild(inputElement);
    
        // Display label for answer option
        const labelElement = document.createElement("label");
        labelElement.textContent = answer.text;
        quiz.appendChild(labelElement);
    
        // Display line break between answer options
        quiz.appendChild(document.createElement("br"));
        }
    
        // Display Next button
        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.innerHTML = "Next";
        nextButton.addEventListener("click", nextQuestion);
        quiz.appendChild(nextButton);
    }
  
  
    /**
     * Starts the quiz and sets a timer for each question.
     * Disables the "Start" button and shows the first question.
     */
    function startQuiz() {
        // Disable the "Start" button to prevent multiple clicks
        document.getElementById("start").disabled = true;
    
        // Set a timer to count down the time left for each question
        timer = setInterval(function() {
        timeLeft--;
        document.getElementById("time").textContent = "Time Left: " + timeLeft + " seconds";
    
        // If the time runs out, end the quiz
        if (timeLeft === 0) {
            clearInterval(timer);
            endQuiz();
        }
        }, 1000);
    
        // Show the first question
        showQuestion();
    }
    
  
    /**
     * Checks if a radio button is selected and updates the score and time left accordingly
     */
    function checkAnswer() {
        // Get the selected answer
        const selectedAnswer = document.querySelector("input[name='answer']:checked");
    
        // If no answer is selected, exit the function
        if (!selectedAnswer) {
        console.log("No answer selected");
        return;
        }
    
        // Get the value of the selected answer and the current question
        const selectedAnswerValue = selectedAnswer.value;
        const currentQuestion = questions[currentQuestionIndex];
    
        // If the selected answer is correct, update the score and log "Correct!"
        if (selectedAnswerValue === currentQuestion.answers.find(answer => answer.correct).text) {
        console.log("Correct!");
        score++;
        } else { // If the selected answer is incorrect, update the time left and log "Incorrect!"
        console.log("Incorrect!");
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
            clearInterval(timer);
            endQuiz();
        }
        }
    }
  
  
/**
 * Advances to the next question in the quiz.
 * If there are no more questions, ends the quiz and stops the timer.
 */
function nextQuestion() {
    // Check the current answer before advancing
    checkAnswer();
  
    // If there are more questions, show the next one
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } 
    // Otherwise, end the quiz and stop the timer
    else {
      clearInterval(timer);
      endQuiz();
    }
  }
  
// This function ends the quiz and displays the score and a message based on the percentage of correct answers.
function endQuiz() {
    quiz.innerHTML = "";
  
    const scorePercentage = (score / questions.length) * 100;
    let message = "";
    if (scorePercentage === 100) {
      message = "Congratulations! You scored full marks!";
    } else if (scorePercentage >= 80) {
      message = "Well done! You scored a high mark.";
    } else if (scorePercentage >= 50) {
      message = "Good job! You passed the quiz.";
    } else {
      message = "You can do better. Keep learning!";
    }
  
    // Create and append score element
    const scoreElement = document.createElement("h3");
    scoreElement.textContent = "Your Score: " + score + "/" + questions.length;
    quiz.appendChild(scoreElement);
  
    // Create and append message element
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    quiz.appendChild(messageElement);
  
    // Remove all buttons from quiz and add restart button
    quiz.querySelectorAll("button").forEach(button => button.remove());
    const restartButton = document.createElement("button");
    restartButton.textContent = "Redo Quiz";
    restartButton.addEventListener("click",  startQuiz);

    quiz.appendChild(restartButton);
  
    // Save score
    saveScore(score);

  }  

/**
 * Saves the given score to local storage
 * @param {number} score - The score to save
 */
function saveScore(score) {
    // Get the current highscores from local storage, or create an empty array if there are none
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Add the new score to the highscores array
    highscores.push(score);
  
    // Save the updated highscores array back to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
  
  
/**
 * Displays the highscores in the quiz section
 */
function displayHighscores() {
    // Get the highscores from local storage or use an empty array if there are none
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    // Sort the highscores in descending order
    highscores.sort((a, b) => b - a);
  
    // Clear the quiz section and center the content
    quiz.innerHTML = "";
  
    // Create a div element to hold the highscores
    const highscoresElement = document.createElement("div");
    highscoresElement.innerHTML = "<h2>Highscores</h2>";
  
    // Create an ordered list element to hold the highscore list
    const highscoresList = document.createElement("ol");
    highscoresList.style.alignContent = "left";
  
    // Loop through each highscore and create a list item element to display it
    highscores.forEach((score, index) => {
      const listItem = document.createElement("li");
      // Display the score with its rank (1st, 2nd, 3rd, etc.)
      listItem.textContent = `Score ${index + 1}: ${score}`;
      // Align the text to the left
      listItem.style.textAlign = "left";
      highscoresList.appendChild(listItem);
    });
  
    // Add the list of highscores to the highscores element
    highscoresElement.appendChild(highscoresList);
  
    // Create a button element to go back to the start screen
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", function() {
      window.location.href = "index.html";
    });
    backButton.style.marginLeft = "25%";
  
    // Add the back button to the highscores element
    highscoresElement.appendChild(backButton);
  
    // Add the highscores element to the quiz section
    quiz.appendChild(highscoresElement);

  }
  
  document.getElementById("highscore").addEventListener("click", displayHighscores);