/*window.onload = function() {
  $("#stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
*/  


(function() {
  const myQuestions = [
    {
      question: "A purpose built capital is one that has been built because it's previous capital may have become too overpopulated, it's location deemed it vulnerable to attack, among other reasons. Which of the following capitals was NOT purpose built?",
      answers: {
        a: "Washington DC",
        b: "Brasilia",
        c: "Mexico City",
        d: "Ottawa"
      },
      correctAnswer: "c"
    },
    {
      question: "The capital of Peru, Lima, is considered the driest city on earth with just 2.29 mm of rain per annum. Which capital city is located at the worrld's highest elevation? Hint: It's at 3,650 metres (11,975ft) above sea level.",
      answers: {
        a: "Toronto, Canada",
        b: "Santiago, Chile",
        c: "La Paz, Bolivia"
      },
      correctAnswer: "c"
    },
    {
      question: "This city is capital to the eighth largest country in the world. It is located on the northeastern edge of a flat plain known as The Pampa.",
      answers: {
        a: "Caracas",
        b: "Massachusetts",
        c: "Guatemala City",
        d: "Buenos Aires"
      },
      correctAnswer: "d"
    },
    {
      question: "Which is the southernmost city in the world?",
      answers: {
        a: "Barrow",
        b: "Ushuaia",
        c: "Antarctica"
      },
      correctAnswer: "b"
    },
    {
      question: "This capital city is surrounded by mountains and is one of the oldest metropolises in the western hemisphere. It is built on a former lake bed at an elevation of over 7,300 feet.",
      answers: {
        a: "Miami",
        b: "Salt Lake City",
        c: "Mexico City"
      },
      correctAnswer: "c"
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
