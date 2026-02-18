function showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function recommend() {
  const subject = document.getElementById("subject").value;
  const grade = parseInt(document.getElementById("grade").value);

  let strategy = "";
  if (grade <= 2) strategy = "심화 + 실전 모의고사 전략";
  else if (grade <= 4) strategy = "개념 + 기출 병행 전략";
  else strategy = "개념 반복 집중 전략";

  document.getElementById("analysis").innerHTML =
    `현재 등급: ${grade}등급<br>추천 전략: ${strategy}`;

  const lectures = {
    math: "메가스터디 수학 개념반",
    eng: "이투스 영어 독해반",
    kor: "대성마이맥 국어 기출반",
    sci: "메가스터디 탐구 개념반",
    soc: "이투스 사회탐구 정리반",
    history: "대성 한국사 개념완성"
  };

  const books = {
    math: "자이스토리 수학",
    eng: "수능특강 영어",
    kor: "마더텅 국어",
    sci: "자이스토리 탐구",
    soc: "수능완성 사회탐구",
    history: "수능특강 한국사"
  };

  document.getElementById("lecture-list").innerHTML =
    `<li>${lectures[subject]} → <a href="https://www.megastudy.net" target="_blank">공식 홈페이지로 이동</a></li>`;

  document.getElementById("book-list").innerHTML =
    `<li>${books[subject]}</li>`;

  document.getElementById("result").classList.remove("hidden");
}

function addPost() {
  const input = document.getElementById("post-input");
  const postList = document.getElementById("post-list");

  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    postList.appendChild(li);
    input.value = "";
  }
}
