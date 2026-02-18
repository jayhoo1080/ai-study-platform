function scrollToRecommend() {
  document.getElementById("recommend").scrollIntoView({ behavior: "smooth" });
}

function recommend() {
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;

  let strategy = "";
  if (grade <= 2) strategy = "심화 + 실전 전략";
  else if (grade <= 4) strategy = "개념 + 기출 병행";
  else strategy = "개념 집중 반복";

  document.getElementById("result").innerHTML =
    `현재 등급: ${grade}등급<br>추천 전략: ${strategy}<br>
    추천 강의: 기본 개념 강좌<br>
    추천 문제집: 자이스토리 시리즈`;

  document.getElementById("result").classList.remove("hidden");
}

function addPost() {
  const input = document.getElementById("post-input");
  const list = document.getElementById("post-list");

  if (input.value !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);
    input.value = "";
  }
}
