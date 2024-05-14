const colors = {
  1: "#00ffff", // I 블록, 하늘색
  2: "#0000ff", // J 블록, 파란색
  3: "#ff7f00", // L 블록, 귤색
  4: "#ffff00", // O 블록, 노란색
  5: "#00ff00", // S 블록, 연두색
  6: "#800080", // T 블록, 자주색
  7: "#ff0000", // Z 블록, 빨간색
  8: "#bcbcbc", // 회색 블록
};

function drawGrid(context, canvas, lineWidth, style) {
  context.strokeStyle = style; // 격자의 색상과 투명도 설정
  context.beginPath(); // 선 그리기 시작을 알림
  context.lineWidth = lineWidth; // 선의 두께 설정

  // 캔버스의 세로선 그리기
  for (let x = 1; x < canvas.width / scale; x += 1) {
    context.moveTo(x, 0); // 선의 시작점 설정
    context.lineTo(x, canvas.height / scale); // 선의 끝점 설정
  }

  // 캔버스의 가로선 그리기
  for (let y = 1; y < canvas.height / scale; y += 1) {
    context.moveTo(0, y); // 선의 시작점 설정
    context.lineTo(canvas.width / scale, y); // 선의 끝점 설정
  }

  context.stroke(); // 설정한 경로에 따라 선 그리기
}

function drawHold() {
  // Hold 캔버스 클리어
  holdContext.clearRect(0, 0, holdCanvas.width, holdCanvas.height);

  // Hold 영역의 배경 그리기 (예시 위치와 크기)
  holdContext.fillStyle = "#7f7f7f";
  holdContext.fillRect(0, 0, 4, 4); // 적절한 위치와 크기로 조정 필요

  // Hold 영역에 블록이 있으면 그리기
  if (hold) {
    // Hold 블록 그리기 로직
    hold.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          holdContext.fillStyle = colors[value];
          holdContext.fillRect(
            x + (2 - Math.floor(row.length / 2)),
            y + (2 - Math.floor(hold.length / 2)),
            1,
            1
          );
        }
      });
    });
  }

  drawGrid(holdContext, holdCanvas, 0.03, "rgba(0, 0, 0, 0.5)");
}

function drawNext() {
  // Next 캔버스 클리어
  nextContext.clearRect(0, 0, nextContext.width, nextContext.height);

  nextContext.fillStyle = "#7f7f7f";
  nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

  const nextThreePieces = pieces.slice(-3).reverse();

  nextThreePieces.forEach((piece, index) => {
    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          nextContext.fillStyle = colors[value];
          nextContext.fillRect(
            x + (2 - Math.floor(row.length / 2)),
            y + (2 - Math.floor(piece.length / 2)) + index * 4,
            1,
            1
          ); // 각 블록을 세로로 4칸 간격으로 배치
        }
      });
    });
  });

  drawGrid(nextContext, nextCanvas, 0.03, "rgba(0, 0, 0, 0.5)");
}

//offset은 왼쪽 위 좌표, 그림을 그리는 함수
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1); //(x, y, width, height)
        //픽셀 비율을 20배로 했으므로 20pxX20px 크기의 사각형임
      }
    });
  });
}

function draw() {
  context.fillStyle = "#7f7f7f";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(area, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.pos);
  drawGrid(context, canvas, 0.03, "rgba(0, 0, 0, 0.5)");
  drawHold();
  drawNext();
}

const scale = 40; // 캔버스의 비율 조정 40배
const holdCanvas = document.getElementById("hold");
const holdContext = holdCanvas.getContext("2d");
holdContext.scale(scale, scale);

const canvas = document.getElementById("tetris");
//2D 그래픽을 그리기 위한 컨텍스트 가져오기
const context = canvas.getContext("2d");
context.scale(scale, scale);
//현재 블록의 위치, 블록의 모양의 행렬, 플레이어의 점수

const nextCanvas = document.getElementById("next");
const nextContext = nextCanvas.getContext("2d");
nextContext.scale(scale, scale);
