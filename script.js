const matrix = [2, 2, 2, 2, 2, 2, 2, 2, 2];

const scenarious = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let hasGameWon = false;
let player = [
  {
    name: "",
    score: 0,
  },
  {
    name: "",
    score: 0,
  },
];

let count =0;

let isCircleNext = true;

const startbtnEl = document.querySelector(".start-btn");
const modelEl = document.querySelector(".model");
const player1El = document.querySelector(".person-name1");
const player2El = document.querySelector(".person-name2");
const submitbtnEL = document.querySelector(".submitbtn");
const player1infoEl = document.getElementById("player1name");
const player2infoEl = document.getElementById("player2name");
const player1scoreEl = document.getElementById("player1score");
const player2scoreEl = document.getElementById("player2score");
const form = document.querySelector(".model-form");
const gridEl = document.querySelectorAll(".grid-item");

const instructEl = document.getElementById("instructioninfo");

const checkToWin = () => {
  scenarious.map((scenario, Index) => {
    if (matrix[scenario[0]] != 2) {
      let first = matrix[scenario[0]];
      

      if (
        matrix[scenario[1]] === matrix[scenario[0]] &&
        matrix[scenario[2]] === matrix[scenario[1]]
      ) {
        hasGameWon === true;

        count++;

        if (first === 0) {
          instructEl.innerHTML = `${player[0]["name"]}'s won`;
          player[0]["score"] =count ;
          player1scoreEl.innerHTML =player[0]["score"] ;
          
        } else {
          instructEl.innerHTML = `${player[1]["name"]}'s won`;
          player[1]["score"] =count ;
          player2scoreEl.innerHTML =player[1]["score"] ;
        }

        resetGame();
      }
    }
    
  });
};

const addSquares = () => {
  if (hasGameWon) return;

  gridEl.forEach((el, Index) => {
    el.addEventListener("click", () => {
        console.log(Index);
      if (Index > 8) {

       
        

        hasGameWon === false;
        instructEl.innerHTML = "it's a tie";
        el.class = "grid-item";
      } else {
        if (isCircleNext) {
          el.classList.add("cross");
          instructEl.innerHTML = `${player[1]["name"]}'s turn`;
          matrix[Index] = 0;
          
        } else {
          el.classList.add("circle");
          instructEl.innerHTML = `${player[0]["name"]}'s turn`;
          matrix[Index] = 1;
          
        }
        isCircleNext = (!isCircleNext);
        checkToWin();
      }
    });
  });
};

const startGame = () => {
  startbtnEl.addEventListener("click", () => {
    modelEl.style.display = "flex";
  });
  player1El.addEventListener("change", (e) => {
    e.preventDefault();
    player[0].name = player1El.value;
  });

  player2El.addEventListener("change", (e) => {
    e.preventDefault();
    player[1].name = player2El.value;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modelEl.style.display = "none";
    player1infoEl.innerHTML = player[0].name;
    player1scoreEl.innerHTML = player[0].score;
    player2infoEl.innerHTML = player[1].name;
    player2scoreEl.innerHTML = player[1].score;
    player1El.value="";
    player2El.value="";

    startbtnEl.innerHTML = "Restart Gamey";

    instructEl.innerHTML = `${player[0]["name"]}'s turn`;

    addSquares();
  });
};

startGame();
