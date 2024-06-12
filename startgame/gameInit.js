function gameOver() {
  isGameOver = true;

  if (checkArtifact(22)) {
    let art = getArtifactById(22);
    if (isDoubleUp === true) {
      art.coefficient = 1;
      console.log(artifacts);
    } else {
      art.coefficient += 0.2;
    }
    player.comboScore *= art.coefficient;
  }

  if (checkArtifact(24)) {
    let art = getArtifactById(24);
    player.comboScore *= art.coefficient;
  }

  console.log(player.lineScore);
  console.log(player.comboScore);

  // 점수 표시 업데이트
  updateScore();
  updateFinalScore();

  // 이 밑에 있는 부분은 유물 효과로 게임을 다시 시작할 시 실행시키면 됨. 물론 위에 isGameOver는 true하면 안됨 if문으로 분기 나눠서 하면됨
  //   // 게임 보드를 0으로 초기화
  //   area.forEach((row) => row.fill(0));

  //   // 게임과 관련된 카운터들을 초기화
  //   blockPlacedCount = 0;
  //   comboCount = 0;
  //   breakBlockUses = 0;
  //   isDoubleUp = 0;

  //   // 플레이어 점수 초기화
  //   player.lineScore = 1;
  //   player.comboScore = 1;

  //   // 새 게임을 위한 블록 모양 초기화 및 섞기
  //   initPieces();
  //   shuffleArray(pieces);

  //   // Hold 기능 관련 변수 초기화
  //   holdUsed = false;
  //   hold = null;
}

/*
블록의 모양을 조정하는 부분
예를 들어
0000
0110
0011
0000
다음과 같은 모양이 있으면 정사각형으로 압축해서 표현함
110
011
000
*/
function trimAndSquareMatrix(matrix) {
  // 빈 가로줄 제거
  let trimmedMatrix = matrix.filter((row) => row.some((value) => value !== 0));

  // 빈 세로줄 제거
  let columnNotEmpty = Array.from(
    { length: trimmedMatrix[0].length },
    (_, colIndex) => trimmedMatrix.some((row) => row[colIndex] !== 0)
  );
  trimmedMatrix = trimmedMatrix.map((row) =>
    row.filter((_, colIndex) => columnNotEmpty[colIndex])
  );

  // 최대 길이 계산 (정사각형 조정을 위해)
  let maxLength = Math.max(
    ...trimmedMatrix.map((row) => row.length),
    trimmedMatrix.length
  );

  // 블록의 실제 높이 계산
  let actualHeight = trimmedMatrix.length;

  // 중앙에 블록을 위치시키기 위해 추가할 빈 줄의 수 계산
  let emptyRowsTop = Math.floor((maxLength - actualHeight) / 2);
  let emptyRowsBottom = maxLength - actualHeight - emptyRowsTop;

  // 상단의 빈 줄 추가
  for (let i = 0; i < emptyRowsTop; i++) {
    trimmedMatrix.unshift(new Array(maxLength).fill(0));
  }

  // 정사각형 조정 및 하단의 빈 줄 추가
  trimmedMatrix = trimmedMatrix.map((row) => {
    // 각 행을 maxLength만큼 채우고, 필요하면 0으로 채움
    while (row.length < maxLength) {
      row.push(0);
    }
    return row.slice(0, maxLength); // 혹시 모를 오버플로를 방지하기 위해 slice 사용
  });

  // 하단의 빈 줄 추가
  for (let i = 0; i < emptyRowsBottom; i++) {
    trimmedMatrix.push(new Array(maxLength).fill(0));
  }

  return trimmedMatrix;
}

function addPiece(newPiece) {
  // 블록을 다듬는 과정
  let trimmedAndSquaredPiece = trimAndSquareMatrix(deepCopyMatrix(newPiece));

  // 다듬어진 블록을 pieces 배열에 추가
  pieces.push(trimmedAndSquaredPiece);
}

function deepCopyMatrix(matrix) {
  return matrix.map((row) => row.slice());
}

/*
API 통신 부분
현재는 각 블록을 n개 씩 추가하지만 API를 통해서
플레이어가 가지고 있는 블록을 가져와서 추가해야 됨.
블록 형태 가지고 있을 필요 없음.
*/
function initPieces() {
  const basicBlock = [
    // I 블록
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    // J 블록
    
    [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 2, 2],
      [0, 0, 0, 0],
    ],
    // L 블록
    [
      [0, 0, 0, 0],
      [0, 0, 3, 0],
      [3, 3, 3, 0],
      [0, 0, 0, 0],
    ],
    // O 블록
    [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
    ],
    // S 블록
    [
      [0, 0, 0, 0],
      [0, 0, 5, 5],
      [0, 5, 5, 0],
      [0, 0, 0, 0],
    ],
    // T 블록
    [
      [0, 0, 0, 0],
      [0, 6, 0, 0],
      [6, 6, 6, 0],
      [0, 0, 0, 0],
    ],
    // Z 블록
    [
      [0, 0, 0, 0],
      [7, 7, 0, 0],
      [0, 7, 7, 0],
      [0, 0, 0, 0],
    ],
  ];
  for (let i = 0; i < basicBlock.length; i++) {
    for (let j = 0; j < 7; j++) {
      addPiece(basicBlock[i]);
    }
  }
  shuffleArray(pieces);
}

function updateScore() {
  document.getElementById("lineScore").innerText = player.lineScore;
  document.getElementById("comboScore").innerText = player.comboScore;
}

function updateFinalScore() {
  document.getElementById("finalScore").innerText = Math.floor(
    player.lineScore * player.comboScore
  );
}

/*
블록 순서 섞기
*/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
