function recommend() {
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;
  const problem = document.getElementById("problem").value;

  let message = "";

  if (grade >= 1 && grade <= 3) {
    message += "상위권입니다. 실전 문제 위주로 학습하세요. ";
  } else if (grade >= 4 && grade <= 6) {
    message += "중위권입니다. 개념 정리 후 문제 풀이를 반복하세요. ";
  } else {
    message += "기초부터 다시 정리하는 것이 좋습니다. ";
  }

  if (problem === "concept") {
    message += "개념 강의를 먼저 듣는 것을 추천합니다.";
  } else if (problem === "speed") {
    message += "시간을 재고 문제를 풀어보세요.";
  } else {
    message += "오답노트를 만들어 반복하세요.";
  }

  document.getElementById
