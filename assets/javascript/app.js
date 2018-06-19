
//Questions
var questions = [{
    question: "Which is the largest state in the U.S.?",
    answers: ["California", "Alaska", "Texas", "New Mexico"],
    correctAnswer: "Alaska"
},
{
    question: "Which River in the Unite States is the longest?",
    answers: ["Colorado River", "Mississippi River", "Missouri River", "Yukon River"],
    correctAnswer: "Missouri River"
},
{
    question: "Where is Mount Rushmore National Park?",
    answers: ["Montana", "Wyoming", "Nebraska", "South Dakota"],
    correctAnswer: "South Dakota"
},
{
    question: "Death Valley is located in what U.S. state?",
    answers: ["Texas", "California", "Arizona", "Nevada"],
    correctAnswer: "California"
},
{
    question: "Which state is the smallest?",
    answers: ["Delaware", "Rhode Island", "Connecticut", "Long Island"],
    correctAnswer: "Rhode Island"
},
{
    question: "Which body of water does NOT touch any part of the United States?",
    answers: ["Gulf of Calfornia", "Lake Huron", "Chukchi Sea", "Bering Sea"],
    correctAnswer: "Gulf of Calfornia"
},
{
    question: "What city is nicknamed 'THE BIG APPLE'",
    answers: ["Los Angeles", "New York", "Toronto", "Boston"],
    correctAnswer: "New York"
},
{
    question: "Select Pennsylvania's capital.",
    answers: ["Philadelphia", "Pittsburg", "Lancaster", "Harrisburg"],
    correctAnswer: "Harrisburg"
},
{
    question: "How many US states border Mexico?",
    answers: ["2", "3", "4", "5"],
    correctAnswer: "4"
},
{
    question: "Where is Sin City?",
    answers: ["New York City", "Las Vegas", "Los Angeles", "Dallas"],
    correctAnswer: "Las Vegas"
}];

//Global Variable

var result = $("#pend-box");
var countStartNumber = 15;


var game = {
  questions:questions,
  currentQuestion:0,
  counter:15,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    result.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        result.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    result.html('<h2>Out of Time!</h2>');
    result.append('<h3>The correct answer is: ' + questions[this.currentQuestion].correctAnswer);
    result.append(questions[this.currentQuestion]);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 1000);
    } else {
      setTimeout(game.nextQuestion, 1000);
    }
  },

  results: function() {
    clearInterval(timer);

    result.html('<h2>Lets see how you\'ve done</h2>');
    $('#counter-number').html(game.counter);
    result.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    result.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    result.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    result.append('<br><button id="start-over">Start Over?</button>');
  },

  clicked: function(event) {
    clearInterval(timer);

    if ($(event.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    result.html('<h2>Incorrect!</h2>');
    result.append('<h3>The correct answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    result.append(questions[game.currentQuestion]);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 1000);
    } else {
      setTimeout(game.nextQuestion, 1000);
    }
  },

  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    result.html('<h2>Correct!</h2>');
    result.append(questions[game.currentQuestion]);

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 1000);
    } else {
      setTimeout(game.nextQuestion, 1000);
    }
  },

  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};



//Click events

$(document).on('click', '#start-over', function(event) {
  game.reset();
});

$(document).on('click', '.answer-button', function(event) {
  game.clicked(event);
});

$(document).on('click', '#start', function(event) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">15</span> Seconds</h2>');
  game.loadQuestion();
});