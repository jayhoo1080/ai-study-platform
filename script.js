function scrollToRecommend() {
  document.getElementById("recommend").scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const subject = card.childNodes[0].nodeValue.trim();
    document.getElementById("subject").value = subject;
    scrollToRecommend();
  });
});

function recommend() {
  const subject = document.getElementById("subject").value;
  const grade = parseInt(document.getElementById("grade").value);
  const weakness = document.querySelector('input[name="weakness"]:checked');

  if (!grade || !weakness) {
    alert("등급과 약점을 선택하세요.");
    return;
  }

  let strategy = "";
  let platform = "";

  if (grade <= 2) {
    strategy = "킬러 대비 + 실전 모의고사 반복";
    platform = "심화 강좌 + 실전 N제";
  } else if (grade <= 4) {
    strategy = "개념 정리 + 기출 분석";
    platform = "기본 개념 강좌 + 자이스토리";
  } else {
    strategy = "개념 반복 + 유형 정복";
    platform = "개념 강의 + 기본 문제집";
  }

  document.getElementById("result").innerHTML =
    `<b>${subject}</b><br>
     현재 등급: ${grade}등급<br>
     약점: ${weakness.value}<br><br>
     📌 추천 전략: ${strategy}<br>
     📚 추천 학습 구성: ${platform}<br>
     🔗 추천 플랫폼: EBS / 메가스터디 / 대성마이맥`;

  document.getElementById("result").classList.remove("hidden");
}

function
