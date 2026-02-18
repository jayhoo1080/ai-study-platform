const teacherData = {
  "수학": ["현우진", "한석원", "정승제"],
  "영어": ["조정식", "이명학"],
  "국어": ["김동욱", "유대종"],
  "과학탐구": ["배기범", "한종철"],
  "사회탐구": ["이기상", "임정환"],
  "한국사": ["최태성"]
};

const platformLinks = {
  "EBS": "https://www.ebsi.co.kr",
  "메가스터디": "https://www.megastudy.net",
  "대성마이맥": "https://www.mimacstudy.com",
  "이투스": "https://www.etoos.com"
};

let teacherRatings = {};

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
  if (grade <= 2) strategy = "킬러 대비 + 실전 모의고사 반복";
  else if (grade <= 4) strategy = "개념 정리 + 기출 분석";
  else strategy = "개념 반복 + 유형 정복";

  let teachers = teacherData[subject] || [];

  let teacherHTML = teachers.map(t => {
    if (!teacherRatings[t]) teacherRatings[t] = [];

    let avg = teacherRatings[t].length
      ? (teacherRatings[t].reduce((a,b)=>a+b,0) / teacherRatings[t].length).toFixed(1)
      : "평가 없음";

    return `
      <div style="background:white;padding:15px;border-radius:15px;margin:12px 0;
                  box-shadow:0 6px 20px rgba(0,0,0,0.05);">

        <b onclick="searchTeacher('${t}')"
           style="cursor:pointer;color:#6c63ff;">
           👨‍🏫 ${t} 강사
        </b>

        <div style="margin-top:8px;font-size:13px;">
          ⭐ 평균 평점: ${avg}
        </div>

        <div style="margin-top:8px;">
          <input type="number" min="1" max="5" id="rating-${t}"
                 placeholder="1~5점"
                 style="width:60px;padding:5px;border-radius:8px;border:1px solid #ddd;">
          <button onclick="rateTeacher('${t}')"
                  style="padding:5px 10px;border:none;border-radius:8px;
                         background:#6c63ff;color:white;cursor:pointer;">
            평가
          </button>
        </div>
      </div>
    `;
  }).join("");

  let platformHTML = Object.keys(platformLinks).map(name =>
    `<a href="${platformLinks[name]}" target="_blank"
       style="display:inline-block;margin:8px 10px;padding:10px 18px;
       background:#6c63ff;color:white;border-radius:20px;
       text-decoration:none;font-size:14px;">
       ${name} 바로가기
     </a>`
  ).join("");

  document.getElementById("result").innerHTML =
    `<b>${subject}</b><br>
     현재 등급: ${grade}등급<br>
     약점: ${weakness.value}<br><br>
     📌 추천 전략: ${strategy}<br><br>

     <b>🔥 추천 강사</b><br>
     ${teacherHTML}

     <br><br>
     <b>🎓 인강 플랫폼 바로가기</b><br>
     ${platformHTML}
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

function searchTeacher(name) {
  const query = encodeURIComponent(name + " 강사");
  window.open("https://search.naver.com/search.naver?query=" + query, "_blank");
}

function addPost() {
  const input = document.getElementById("post-input");
  const list = document.getElementById("post-list");

  if (input.value !== "") {
    const li = document.createElement("li");
    li.innerHTML = input.value + 
    `<br><br>
     <button onclick="this.parentElement.remove()" 
     style="margin-top:10px;background:#eee;border:none;padding:5px 10px;border-radius:8px;cursor:pointer;">
     삭제</button>`;
    list.appendChild(li);
    input.value = "";
  }
}
