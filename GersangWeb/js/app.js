// nav에서 클릭 한 계산기만 보이기
var links = document.querySelectorAll("a"); // 모든 <a> 태그 선택

links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작(페이지 이동)을 막음

    var targetId = link.getAttribute("href").substring(1); // 클릭한 링크의 href 속성 값에서 "#" 제거
    var targetSection = document.getElementById(targetId); // 클릭한 링크에 해당하는 <section> 요소 선택

    var sections = document.querySelectorAll("section.content"); // 모든 <section> 요소 선택
    sections.forEach(function (section) {
      if (section === targetSection) {
        section.style.display = "block"; // 클릭한 링크에 해당하는 <section> 요소는 보이도록 설정
      } else {
        section.style.display = "none"; // 나머지 <section> 요소는 숨김 처리
      }
    });
  });
});

// input입력 시 숫자 천 단위로 ','표시
$('input').on('input', function(e) {
  // 숫자만 입력받도록 필터링
  var nonDigit = /[^0-9]/g;
  var value = e.target.value.replace(nonDigit, '');

  // 천 단위로 콤마 추가
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  e.target.value = value;
});