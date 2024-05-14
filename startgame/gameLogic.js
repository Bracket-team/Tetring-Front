//0으로 채워진 전체 게임판 생성 12 x 20 크기
function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

//area라는 게임화면 배열에 블록을 합침
function mergeMatrix(area, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        area[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

//충돌 체크
function collide(area, player) {
  const m = player.matrix;
  const o = player.pos;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (
        m[y][x] !== 0 &&
        (area[y + o.y] && area[y + o.y][x + o.x]) !== 0 //area[y + o.y] 체크 이유?
      ) {
        return true;
      }
    }
  }
  return false;
}

//줄 제거
function sweep() {
  let lineClearCount = 0;
  outer: for (let y = area.length - 1; y > 0; --y) {
    let bonusPoints = 0;
    for (let x = 0; x < area[y].length; ++x) {
      if (area[y][x] === 0) {
        continue outer;
      }

      if (
        checkArtifact(1) &&
        (area[y][x] === 1 || area[y][x] === 4 || checkArtifact(16))
      ) {
        bonusPoints++;
      }
      if (checkArtifact(2) && (area[y][x] === 6 || checkArtifact(16))) {
        bonusPoints += 1.5;
      }
      if (
        checkArtifact(12) &&
        (area[y][x] === 5 || area[y][x] === 7 || checkArtifact(16))
      ) {
        bonusPoints++;
      }
      if (
        checkArtifact(13) &&
        (area[y][x] === 2 || area[y][x] === 3 || checkArtifact(16))
      ) {
        bonusPoints++;
      }
    }
    const row = area.splice(y, 1)[0].fill(0);
    area.unshift(row);
    ++y;

    lineClearCount++;
    player.lineScore += bonusPoints;
  }

  if (lineClearCount > 0) {
    if (checkArtifact(3) && (lineClearCount === 1 || lineClearCount === 2)) {
      player.lineScore += countAcquiredArtifacts();
    }
    if (checkArtifact(6)) {
      player.lineScore += moneyLevel;
    }
    if (checkArtifact(8) && lineClearCount === 1) {
      player.lineScore += 2 * Math.floor(money / 10);
    }
    if (checkArtifact(14) && lineClearCount === 3) {
      player.lineScore += 20;
    }
    if (checkArtifact(15) && lineClearCount === 4) {
      player.lineScore += 40;
    }
    if (checkArtifact(17)) {
      player.comboScore += Math.floor(money / 15);
    }
    if (lineClearCount >= 2) {
      isDoubleUp = true;
    }

    // 라인 점수 계산
    switch (lineClearCount) {
      case 1:
        player.lineScore += 1;
        break;
      case 2:
        player.lineScore += 5;
        break;
      case 3:
        player.lineScore += 15;
        break;
      case 4:
        player.lineScore += 30;
        break;
    }

    // 콤보 점수 계산
    if (comboCount > 0) {
      if (checkArtifact(23)) {
        comboCount = 1;
        player.comboScore += 3;
      }
      player.comboScore += 5 * comboCount; // 첫 번째 줄 삭제 이후부터 콤보 점수 적용
    }
    comboCount++; // 줄을 삭제했으므로 콤보 카운트 증가
  } else {
    comboCount = 0; // 줄을 삭제하지 않았으므로 콤보 카운트 리셋
  }
}

//새로운 블록 생성
function loadNewBlock() {
  let piece = null;
  holdUsed = false; // 새 블록을 가져오므로 Hold 사용 가능 상태로 리셋
  // pieces 배열이 비어있다면, 게임을 초기화하거나, hold에 있는 블록을 사용
  if (pieces.length === 0) {
    if (hold == null) {
      gameOver(); // 게임 초기화 및 블록 모양 배열 재정의 및 섞기
      return;
    } else {
      piece = hold; // hold에 있는 블록을 깊은 복사로 가져옴
      holdUsed = true; // 마지막 블록일 경우 hold 기능 금지
      hold = null; // hold 초기화
    }
  }
  // pieces 배열이 비어있지 않은 경우, 또는 hold에서 깊은 복사된 블록이 없는 경우
  // pieces 배열에서 블록 모양을 pop()으로 꺼내옴
  if (!piece) {
    piece = pieces.pop(); // 배열에서 마지막 요소(블록 모양)를 제거하고 그 값을 반환
  }
  player.matrix = piece;
  //맨 위 중앙 위치로 조절
  player.pos.y = 0;
  player.pos.x =
    ((area[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
  //게임 종료될 경우
  if (collide(area, player)) {
    gameOver();
  }
}
