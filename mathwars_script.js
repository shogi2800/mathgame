let numArray = []; //数字を格納する配列
let operatorArray = []; //演算子に対応する数値を格納する配列
let operatorStringArray = []; //演算子を格納する配列
let formulaString=""; //文字列の数式
let answer; //計算問題の正答
let answer2; //計算問題の正答
let score = 0; //スコア
let formulaLength; //数式中の数字の数。
let countdownTime = 3;
let gameTime = 10;
let gameInterval;
let formulaLengthRange; // 数式の長さの範囲を格納する変数
let tmp_difficulty;
let userAnswer = '';


function setFormulaLength(range) { // 数式中の数字の数を決定する
  formulaLength = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function makeNumber() { // 数式中の数字を決定する
  for (let i = 0; i < formulaLength; i++) {
    numArray[i]=Math.floor(Math.random() * 9 + 1);
  }
}

function makeQuestion() {
  operatorArray[formulaLength-1] = 10;
  operatorStringArray[formulaLength-1] = "";

  for (let i = 0; i < formulaLength-1; i++) {
    operatorArray[i] = Math.floor(Math.random() * 4); // 0: 足し算, 1: 引き算, 2: 掛け算
    switch (operatorArray[i]) {
      case 0:
        operatorStringArray[i] = "+";
        break;
      case 1:
        operatorStringArray[i] = "-";
        break;
      case 2:
        operatorStringArray[i] = "*";
        break;
      case 3:
        operatorStringArray[i] = "/";
        break;
    }
  }
  while(true){
    makeNumber(); //もし答えが小数になる場合は、もう一度数字を決定する

    for (let i = 0; i < formulaLength; i++) {
      formulaString += numArray[i] + operatorStringArray[i];//文字列の数式を生成
    }
    
    answer = new Function(`return ${formulaString}`)(); //文字列の数式を計算できる実際の数式に変換し、計算してもらう
    if(Number.isInteger(answer) === true){ //答えが整数の場合は、計算問題を表示する
      break;
    }else{
      formulaString="";
    }
  }
}

function displayQuestion() {
  document.getElementById("question").innerHTML = formulaString + " = ?";
}

function enterNumber(num) {
  userAnswer += num;
  document.getElementById("answer").value=userAnswer;
}

// function eraseLastCharacter() {
//   if (currentAnswer.length > 0) {
//     currentAnswer = currentAnswer.slice(0, -1);
//     updateAnswerDisplay();
//   }
// }

function checkAnswer() {
  // let userAnswer = parseInt(document.getElementById("answer").value);
  userAnswer=parseInt(userAnswer);
  if (userAnswer === answer) {
    score++;
  } else {
    score--;
  }
  document.getElementById("score").innerHTML = "スコア: " + score;
  init();
}

function startGame(difficulty) {
  document.getElementById("title").style.display = "none";
  document.getElementById("difficultyButtons").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("answer").disabled = true;
  tmp_difficulty = difficulty;
  if (difficulty === 'easy') {
    gameTime = 10;
    formulaLengthRange = {min: 2, max: 3};
  } else if (difficulty === 'hard') {
    gameTime = 10;
    formulaLengthRange = {min: 3, max: 4};
  }
  countdown(countdownTime);
}

function countdown(timeLeft) {
  if (timeLeft > 0) {
    document.getElementById("countdown").innerHTML = timeLeft;
    setTimeout(function() {
      countdown(timeLeft - 1);
    }, 1000);
  } else {
    document.getElementById("countdown").innerHTML = "";
    document.getElementById("answer").disabled = false;
    document.getElementById("answer").focus();
    init();
    gameCountdown(gameTime);
  }
}

function gameCountdown(timeLeft) {
  if (timeLeft > 0) {
    document.getElementById("gameTimer").innerHTML = timeLeft + "秒";
    gameInterval = setTimeout(function() {
      gameCountdown(timeLeft - 1);
    }, 1000);
  } else {
    document.getElementById("gameTimer").innerHTML = "";
    endGame();
  }
}

function shareScoreOnTwitter() {
  const text = encodeURIComponent("私の最終スコアは " + score + " です！ #計算問題ゲーム");
  const url = "https://twitter.com/intent/tweet?text=" + text;
  window.open(url, "_blank");
}

function endGame() {
  clearTimeout(gameInterval);
  document.getElementById("game").style.display = "none";
  document.getElementById("finalScore").innerHTML = "最終スコア: " + score;
  document.getElementById("finalScore").style.display = "block";
  document.getElementById("shareBtn").style.display = "block"; // この行を追加
  document.getElementById("playAgainBtn").style.display = "block";
  document.getElementById("backToTheBeginningBtn").style.display = "block";
}

function displayDifficultyButtons() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("difficultyButtons").style.display = "block";
}

function init() {
  formulaString = "";
  setFormulaLength(formulaLengthRange);
  makeQuestion();
  displayQuestion();
  document.getElementById("answer").value = "";
  userAnswer='';
}

function playAgain() {
  document.getElementById("title").style.display = "block";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("finalScore").style.display = "none";
  document.getElementById("backToTheBeginningBtn").style.display = "none";
  score = 0;
  document.getElementById("score").innerHTML = "スコア: " + score;
  document.getElementById("question").innerHTML = "";
  document.getElementById("answer").value = "";
  document.getElementById("shareBtn").style.display = "none";
  document.getElementById("playAgainBtn").style.display = "none";
  startGame(tmp_difficulty);
}

function backToTheBeginning() {
  document.getElementById("title").style.display = "block";
  document.getElementById("startBtn").style.display = "block";
  document.getElementById("finalScore").style.display = "none";
  document.getElementById("backToTheBeginningBtn").style.display = "none";
  score = 0;
  document.getElementById("score").innerHTML = "スコア: " + score;
  document.getElementById("question").innerHTML = "";
  document.getElementById("answer").value = "";
  document.getElementById("shareBtn").style.display = "none";
  document.getElementById("playAgainBtn").style.display = "none";
}