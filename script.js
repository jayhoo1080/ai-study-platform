const subjectData = {
  "수학": {
    teachers: [
      { name: "현우진", link: "https://www.megastudy.net" },
      { name: "한석원", link: "https://www.mimacstudy.com" }
    ],
    books: ["자이스토리 수학", "마더텅 수학", "쎈 수학"]
  },
  "영어": {
    teachers: [
      { name: "조정식", link: "https://www.megastudy.net" },
      { name: "이명학", link: "https://www.mimacstudy.com" }
    ],
    books: ["자이스토리 영어", "수능특강 영어"]
  },
  "국어": {
    teachers: [
      { name: "김동욱", link: "https://www.megastudy.net" },
      { name: "유대종", link: "https://www.mimacstudy.com" }
    ],
    books: ["마더텅 국어", "수능특강 국어"]
  },
  "과학탐구": {
    teachers: [
      { name: "배기범", link: "https://www.megastudy.net" },
      { name: "한종철", link: "https://www.mimacstudy.com" }
    ],
    books: ["자이스토리 과탐", "완자 과학"]
  },
  "사회탐구": {
    teachers: [
      { name: "이기상", link: "https://www.mimacstudy.com" },
      { name: "임정환", link: "https://www.megastudy.net" }
    ],
    books: ["자이스토리 사탐", "수능특강 사탐"]
  },
  "한국사": {
    teachers: [
      { name: "최태성", link: "https://www.ebsi.co.kr" }
    ],
    books: ["수능특강 한국사"]
  }
};

let teacherRatings = {};

function loadSubject(subject) {
  document.getElementById("subject").value = subject;
  scrollToRecommend();
  recommend();
}

function scrollToRecommend() {
  document.getElementById("recommend").scrollIntoView({ behavior: "smooth" });
}

function recommend() {
  const subject = document.getElementById("subject").value;
  const grade = parseInt(document.getElementById("grade").value) || 3;
  const weakness = document.querySelector('input[name="weakness"]:checked');

  let strategy = "";
  if (grade <= 2) strategy = "킬러 대비 + 실전 모의고사 반복";
  else if (grade <= 4) strategy = "개념 정리 + 기출 분석";
  else strategy = "개념 반복 + 유형 정복";

  const data = subjectData[subject];
  if (!data) return;

  let teacherHTML = data.teachers.map(t => {
    if (!teacherRatings[t.name]) teacherRatings[t.name] = [];

    let avg = teacherRatings[t.name].length
      ? (teacherRatings[t.name].reduce((a,b)=>a+b,0) / teacherRatings[t.name].length).toFixed(1)
      : "평가 없음";

    return `
      <div style="background:white;padding:15px;border-radius:15px;margin:15px 0;
                  box-shadow:0 6px 20px rgba(0,0,0,0.05);">

        <b style="font-size:16px;">👨‍🏫 ${t.name} 강사</b>

        <div style="margin-top:8px;font-size:13px;">
          ⭐ 평균 평점: ${avg}
        </div>

        <div style="margin-top:10px;">
          <a href="${t.link}" target="_blank"
             style="padding:8px 14px;background:#6c63ff;
                    color:white;border-radius:10px;
                    text-decoration:none;font-size:13px;">
            강의 보러가기
          </a>
        </div>

        <div style="margin-top:10px;">
          <input type="number" min="1" max="5"
                 id="rating-${t.name}"
                 placeholder="1~5점"
                 style="width:60px;padding:5px;border-radius:8px;border:1px solid #ddd;">
          <button onclick="rateTeacher('${t.name}')"
                  style="padding:5px 10px;border:none;border-radius:8px;
                         background:#444;color:white;cursor:pointer;">
            평가
          </button>
        </div>
      </div>
    `;
  }).join("");

  let bookHTML = data.books.map(b =>
    `<li style="margin:5px 0;">📘 ${b}</li>`
  ).join("");

  document.getElementById("result").innerHTML =
    `<h3>${subject} 분석 결과</h3>
     📌 추천 전략: ${strategy}<br><br>

     <h4>🔥 추천 강사</h4>
     ${teacherHTML}

     <h4>📚 추천 문제집</h4>
     <ul>${bookHTML}</ul>
    `;

  document.getElementById("result").classList.remove("hidden");
}

function rateTeacher(name) {
  const value = parseInt(document.getElementById(`rating-${name}`).value);
  if (!value || value < 1 || value > 5) {
    alert("1~5 사이 점수를 입력하세요.");
    return;
  }

  teacherRatings[name].push(value);
  recommend();
}
