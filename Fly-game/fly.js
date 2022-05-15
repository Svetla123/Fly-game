("use strict");
function initialization() {
  const flybtn = document.querySelector(".fly");
  const scoreBtn = document.getElementById("score");
  const timerBtn = document.getElementById("timer");
  const menu = document.querySelector(".menu");
  const boxShadow = document.querySelector(".box-shadow");
  const buttonStart = document.querySelector("#buttonStart");
  const buttonPlay = document.querySelector("#playAgain");

  //for moduls
  const overlay = document.querySelector(".overlay");
  const modalStart = document.querySelector("#modalStart");
  const modalFinish = document.querySelector("#modalFinish");

  //for time and flyes
  const inputTime = document.querySelector("#inputTime");
  const inputFlys = document.querySelector("#inputFlys");

  const displayScore = document.querySelector("#displayScore");
  const displayTimeS = document.querySelector("#displayTime");
  const displayFlys = document.querySelector("#displayFlys");
  const myFlys = document.getElementById("myFlys");

  //for starting game
  buttonStart.addEventListener("click", function () {
    numberSec = inputTime.value;
    numberFlys = inputFlys.value;
    if (numberSec < 1 || numberSec > 30) {
      alert("Seconds must be in range 1-30!");
      return;
    }
    if (numberFlys <= 0 || numberFlys > 10) {
      alert("You need at least 1 fly and no more than 10!");
      return;
    }

    closeModal(modalStart);
    startGame(numberSec, numberFlys);
  });

  //time
  function displayTime(sec) {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
      timerBtn.textContent = `${min}:${sec}`;
      if (time === 0) {
        clearInterval(timer);
        for (let i = 0; i < myFlys.length; i++) {
          myFlys[i].classList.remove("hidden");
        }
        endGame();
      }
      time--;
    };
    time = sec;
    tick();
    const timer = setInterval(tick, 1000);
  }

  function endGame() {
    openModal(modalFinish);
    displayScore.textContent = "Your score: " + scoreBtn.innerText;
    displayFlys.textContent = "Number of flys: " + numberFlys;
    displayTimeS.textContent = "Time: " + numberSec + " seconds";
    resetGame();
  }

  function resetGame() {
    allFlys.forEach((fly) => {
      fly.classList.add("hidden");
    });
    //delating flys
    allFlys.forEach((fly) => {
      fly.remove();
    });
    //setting on 30 s, but i maade it like user is defining inputs
    timerBtn.textContent = "30:00";
    scoreBtn.innerText = 0;
  }

  const openModal = function (modal) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = function (modal) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  function startGame(sec, flys) {
    menu.style.opacity = 0.3;
    boxShadow.style.opacity = 0.3;
    //creating flys
    for (let i = 0; i < flys; i++) {
      fly = document.createElement("div");
      fly.className = "fly hidden"; //hidden
      fly.id = i;
      myFlys.appendChild(fly);
    }
    allFlys = document.querySelectorAll(".fly");
    displayTime(sec);
    for (let i = 0; i < allFlys.length; i++) {
      item = allFlys[i];
      allFlys[i].style.left = Math.random() * (window.innerWidth - 50) + "px";
      allFlys[i].style.top = Math.random() * (window.innerHeight - 50) + "px";
      item.style.display = "block";
      item.classList.remove("hidden");
      allFlys.forEach((btn) => {
        btn.addEventListener("click", displeyScore);
      });
      changePosition();
    }
  }

  function displeyScore() {
    scoreBtn.innerText = parseInt(scoreBtn.textContent) + 1;
    changePosition();
  }

  function changePosition() {
    $(document).ready(function () {
      for (let i = 0; i < allFlys.length; i++) {
        allFlys[i].style.transform = "rotate(" + Math.random() * 360 + "deg)";
      }
      for (let i = 0; i < allFlys.length; i++) {
        animateDiv(`#${i}`);
      }
    });
  }

  function makeNewPosition() {
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh, nw];
  }

  function animateDiv(id) {
    var newq = makeNewPosition();
    $(id).animate({ top: newq[0], left: newq[1] }, 1500, function () {
      animateDiv(id);
    });
  }
  let numberSec = 0,
    numberFlys = 0,
    time = 0;
  let item, fly, allFlys;
  openModal(modalStart);
}
window.onload = initialization;
