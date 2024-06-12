const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
  lineScore: 1,
  comboScore: 1,
};

//12x20 칸 부여
const area = createMatrix(12, 20);
let isGameOver = false;
let hold = null; // 현재 hold 중인 블록을 저장할 변수
let holdUsed = false; // Hold 기능 사용 여부
let comboCount = 0; // 연속으로 줄을 삭제한 횟수
let blockPlacedCount = 0; // 블록을 놓은 횟수를 추적하는 변수
let breakBlockUses = 0;
let isDoubleUp = false;
let pieces = [];
initPieces();

//변수명 수정, 전역 변수 수정, 게임 재시작
let moneyLevel = 3; //머니 레벨
let money = 21;

let animationId;
let dropCounter = 0;
let dropInterval = 1500;
let lastTime = 0;

startGame();

function startGame() {
  loadNewBlock();
  updateScore();
  update();
}

function update(time = 0) {
  if(isGameOver) {
    cancelAnimationFrame(animationId);
    return;
  }

  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if(dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  animationId = requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
  if (isGameOver) {
    return;
  }

  if (event.keyCode === 37) {
    playerMove(-1); // Move left
  } else if (event.keyCode === 39) {
    playerMove(1); // Move right
  } else if (event.keyCode === 40) {
    playerDrop(); // Move down
  } else if (event.keyCode === 90) {
    playerRotate(-1); // Rotate counterclockwise
  } else if (event.keyCode === 88) {
    playerRotate(1); // Rotate clockwise
  } else if (event.keyCode === 32) {
    playerHardDrop(); // Hard Drop 실행
  } else if (event.key === "c" || event.key === "C") {
    playerHold();
  } else if ((event.key === "v" || event.key === "V") && breakBlockUses < 3) {
    if (checkArtifact(11)) {
      breakBlockUses++;
      loadNewBlock();
    }
  }
});
