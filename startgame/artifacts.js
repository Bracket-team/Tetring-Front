class Artifact {
  constructor(id, name, rarity, price, effect, coefficient) {
    this.id = id;
    this.name = name;
    this.rarity = rarity;
    this.price = price;
    this.effect = effect;
    this.coefficient = coefficient;
  }

  clone() {
    return new Artifact(
      this.id,
      this.name,
      this.rarity,
      this.price,
      this.effect,
      this.coefficient
    );
  }
}

const artifacts = [];

const availableArtifacts = [
  new Artifact(
    1,
    "노을 사진",
    "Normal",
    5,
    "하늘색, 노란색 블록 터트릴 때마다 +1 line score"
  ),
  new Artifact(
    2,
    "T블록",
    "Normal",
    5,
    "보라색 블록 터트릴 때마다 +1.5 line score"
  ),
  new Artifact(
    3,
    "보물 상자",
    "Normal",
    5,
    "싱글, 더블에 유물 개수 만큼 +line score를 더함"
  ),
  new Artifact(4, "리롤 블록", "Normal", 5, "리롤 비용 2$ 감소"),
  new Artifact(
    5,
    "재활용 블록",
    "Normal",
    3,
    "해당 유물을 획득할 시 블록 5개 추가"
  ),
  new Artifact(
    6,
    "돈 주머니",
    "Normal",
    5,
    "라인을 터트릴 때마다 머니 레벨만큼 line score +1추가"
  ),
  new Artifact(7, "초과 업무", "Normal", 5, "초과 점수 1000점 당 +1$"),
  new Artifact(
    8,
    "금 블록",
    "Normal",
    5,
    "가지고 있는 10$당 싱글 달성 시 +2 line score 점"
  ),
  new Artifact(9, "은색 반지", "Normal", 5, "스테이지에 실패할 경우 재도전"),
  new Artifact(
    10,
    "쿠폰 블록",
    "Normal",
    5,
    "매 상점을 들릴 때마다 리롤 1회 무료"
  ),
  new Artifact(11, "블록 망치", "Normal", 5, "3회 블록 추가 건너띄기"),
  new Artifact(
    12,
    "딸기",
    "Normal",
    5,
    "연두색, 빨간색 블록 터트릴 때마다 +1 line score"
  ),
  new Artifact(
    13,
    "썩은 귤",
    "Normal",
    5,
    "파란색, 귤색 블록 터트릴 때마다 +1 line score"
  ),
  new Artifact(14, "트리플 블록", "Normal", 5, "트리플 +20 line score"),
  new Artifact(15, "테트라 블록", "Normal", 5, "테트리스 +40 line score"),
  new Artifact(16, "화이트 블록", "Rare", 5, "모든 블록을 모든 색깔로 취급"),
  new Artifact(
    17,
    "다이아몬드",
    "Rare",
    5,
    "가지고 있는 15$당 라인 클리어 시 +1 combo score점"
  ),
  new Artifact(
    18,
    "수표 블록",
    "Rare",
    5,
    "가지고 있는 돈의 두 배 획득(최대 30$)"
  ),
  new Artifact(
    19,
    "흰색 해골",
    "Rare",
    5,
    "스테이지의 25%만 달성해도 다음 스테이지로 통과"
  ),
  new Artifact(
    20,
    "투자 블록",
    "Rare",
    5,
    "스테이지가 끝날 때마다 가지고 있는 4$ 당 +1$(최대 10$)"
  ),
  new Artifact(21, "클론", "Rare", 5, "가지고 있는 무작위 유물의 능력을 복사"),
  new Artifact(
    22,
    "심플 볼록",
    "Rare",
    5,
    "콤보 점수에 x1 배(더블 이상 없이 깬 스테이지 마다 +0.2 계수, 더블 이상 했을 시 초기화)",
    1
  ),
  new Artifact(
    23,
    "콤보 블록",
    "Rare",
    5,
    "콤보 최대 1로 제한, 1콤보 시 +3 combo score"
  ),
  new Artifact(
    24,
    "먹보 블록",
    "Rare",
    5,
    "최종 콤보 점수에 x1 배(블록 추가할 때마다 +0.1계수)"
  ),
  new Artifact(
    25,
    "파이브 블록",
    "Rare",
    5,
    "line score 500점 달성할 때마다 combo score x1.5"
  ),
  new Artifact(26, "블랭크 블록", "Ultra", 5, "한 줄에 9 칸만 채워져도 터짐"),
  new Artifact(27, "별", "Ultra", 5, "라인을 터트릴 때마다 +2 combo score"),
  new Artifact(
    28,
    "파괴 블록",
    "Ultra",
    5,
    "블록을 놓을 때마다 +7 line score (스테이지가 끝날 때마다 무작위 블록 유물 파괴한 후 +2 증가)"
  ),
  new Artifact(
    29,
    "우산 블록",
    "Ultra",
    5,
    "블록을 7번째 놓을 때마다 밑에서 블록이 올라옴"
  ),
  new Artifact(
    30,
    "컨테이너 블록",
    "Ultra",
    5,
    "트리플을 할 때마다 combo score에 x1.25 배"
  ),
];

function acquireArtifact(artifactId) {
  const artifact = availableArtifacts.find(
    (artifact) => artifact.id === artifactId
  );
  if (artifact && !artifacts.some((a) => a.id === artifactId)) {
    artifacts.push(artifact.clone());
  }
}

function getArtifactById(id) {
  return artifacts.find((artifact) => artifact.id === id);
}

// 유물의 보유 여부 확인 함수
function checkArtifact(artifactId) {
  return artifacts.some((artifact) => artifact.id === artifactId);
}

// 획득한 유물의 개수를 반환하는 함수
function countAcquiredArtifacts() {
  return artifacts.length;
}
