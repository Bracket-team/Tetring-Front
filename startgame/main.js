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
shuffleArray(pieces);

//나중에 추가해줘야 할 것 1. 유물 목록들 2. 블록들 3. 머니레벨 4. 머니
let moneyLevel = 3; //머니 레벨
let money = 21;
acquireArtifact(23);
console.log(artifacts);

function update(time = 0) {
  draw();
  requestAnimationFrame(update);
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
loadNewBlock();
updateScore();
update();
