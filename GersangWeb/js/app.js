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

// 총 경험치 획득 량
function exp(){
  var sExp = parseInt($('#startExp').val().replace(/,/g, '')); // 계산을 수행하기 전에 콤마를 제거
  var eExp = parseInt($('#endExp').val().replace(/,/g, ''));
  var resultExp = $('#resultExp');

  var result = eExp - sExp;
  // console.log(result,'result');
  resultExp.text("총 " + result.toLocaleString()+  "exp");

}

// 소요 시간 계산
function time() {
  var sHour = parseInt($('#startHour').val());
  var sMin = parseInt($('#startMin').val());
  var eHour = parseInt($('#endHour').val());
  var eMin = parseInt($('#endMin').val());
  var resultTime = $('#resultTime');

  // 시간을 Date 객체로 변환
  var startTime = sHour * 60 + sMin;
  var endTime = eHour * 60 + eMin;

  // 걸린 시간 계산 (단위 밀리초)
  var timeDiff = endTime - startTime;

  // 걸린 시간을 시간과 분으로 분리
  var hours = Math.floor(timeDiff / 60);
  var minutes = timeDiff % 60;

  resultTime.text("총 " + hours.toString() + "시간 " + minutes.toString() + "분 소요.");
}

// 시간당 경험치 및 골드 구하기
function calculateExpPerHour() {
  var startExp = parseInt($('#startExp').val().replace(/,/g, ''));
  var endExp = parseInt($('#endExp').val().replace(/,/g, ''));
  var startHour = parseInt($('#startHour').val());
  var startMinute = parseInt($('#startMin').val());
  var endHour = parseInt($('#endHour').val());
  var endMinute = parseInt($('#endMin').val());
  var resultExpPerHour = $('#resultExpPerHour');
  var timeByGoldResult = $('#timeByGoldResult');

  // 시작 시간과 끝난 시간을 분 단위로 변환
  var startTime = startHour * 60 + startMinute;
  var endTime = endHour * 60 + endMinute;

  // 걸린 시간 계산 (분 단위)
  var timeDiff = endTime - startTime;

  // 총 획득 exp 계산
  var totalExp = endExp - startExp;

  // 시간 당 exp 계산
  var expPerHour = totalExp / (timeDiff / 60);

  // 시간 당 수익 계산 .replace(/[^0-9]/g, '') -> 문자열 제거/ .replace(/,/g, '') -> 숫자제거
  var goldPerHour = parseInt($('#totalGoldResult').text().replace(/[^0-9]/g, '').replace(/,/g, '')) / (timeDiff / 60);
  console.log(goldPerHour, '나누기 전 ')

  resultExpPerHour.text("💡 시간 당 " + Math.round(expPerHour).toLocaleString() + "exp 획득");
  timeByGoldResult.text("💡 시간 당 " + Math.round(goldPerHour).toLocaleString() + "원 획득");
}

// 아이템 값 계산 목록
function item(monsterId, priceClass, startQuanClass, endQuanClass, resultClass) {
  var priceElement = document.querySelector(`#${monsterId} .${priceClass}`);
  var price;

  // 가격 정보가 텍스트인 경우와 input 필드인 경우를 구분
  if (priceElement.tagName.toLowerCase() === 'input') {
    // 콤마 제거 후 숫자로 변환, 없으면 0
    price = priceElement.value ? parseInt(priceElement.value.replace(/,/g, ''), 10) : 0;
  } else {
    var priceText = priceElement.innerText;
    price = priceText.replace("가격 : ", "").replace(",", ""); // 가격에서 문자 제거
    price = price ? parseInt(price, 10): 0; // 숫자로 변환
  }

  var startQuantity = document.querySelector(`#${monsterId} .${startQuanClass}`).value; // 수량 값 가져오기
  var endQuantity = document.querySelector(`#${monsterId} .${endQuanClass}`).value; // 수량 값 가져오기

  var quantity = endQuantity - startQuantity;

  // 결과 계산 후 출력
  var result = price * quantity;
  document.querySelector(`#${monsterId} .${resultClass}`).innerText = "💰 : " + result.toLocaleString(); // 결과에 콤마 추가

  return result; // 계산된 결과 반환
}


// function item(priceClass, startQuanClass, endQuanClass, resultClass) {
//
//   var priceElement = document.getElementsByClassName(priceClass);
//   var price;
//
//   // 가격 정보가 텍스트인 경우와 input 필드인 경우를 구분
//   if (priceElement.tagName.toLowerCase() === 'input') {
//     // 콤마 제거 후 숫자로 변환, 없으면 0
//     price = priceElement.value ? parseInt(priceElement.value.replace(/,/g, ''), 10) : 0;
//   } else {
//     price = priceElement.innerText;
//     price = price.replace("가격 : ", "").replace(",", ""); // 가격에서 문자 제거
//     price = price ? parseInt(price, 10): 0; // 숫자로 변환
//   }
//
//   var startQuantity = document.getElementsByClassName(startQuanClass).value; // 수량 값 가져오기
//   var endQuantity = document.getElementsByClassName(endQuanClass).value; // 수량 값 가져오기
//
//   var quantity = endQuantity - startQuantity;
//
//   // 결과 계산 후 출력
//   var result = price * quantity;
//   document.getElementsByClassName(resultClass).innerText = "💰 : " + result.toLocaleString(); // 결과에 콤마 추가
//
//   return result; // 계산된 결과 반환
// }

// input입력 시 숫자 천 단위로 ','표시
$('input').on('input', function(e) {
  // 숫자만 입력받도록 필터링
  var nonDigit = /[^0-9]/g;
  var value = e.target.value.replace(nonDigit, '');

  // 천 단위로 콤마 추가
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  e.target.value = value;
});

window.onload = function() {
  let selectMonster = document.getElementById("selectMonster");
  let tables = document.querySelectorAll("table");
  let images = document.querySelectorAll("#imageWrapper img");
  let divs = document.querySelector("#exp");

  function hideAll(elements) {
    elements.forEach(el => el.style.display = "none");
  }

  function showElement(id) {
    let element = document.getElementById(id);
    if (element) element.style.display = "block";
  }

  hideAll(tables);
  hideAll(images);
  divs.style.display = "none";
  showElement("default-img");

  selectMonster.addEventListener("change", function() {
    hideAll(tables);
    hideAll(images);
    if (selectMonster.value !== "default") {
      divs.style.display = "block";
    } else {
      divs.style.display = "none";
    }
    showElement(selectMonster.value);
    showElement(selectMonster.value + "-img");
  });

  selectMonster.value = "default";
  showElement("default");
};

// 계산하기 클릭 이벤트
$('#submitBtn').click(function (){
  exp();
  time();
  var selectedMonster = document.getElementById('selectMonster').value;
  var totalGold = 0; // 총 수익 초기 값으로 변수 선언

  for (var i = 0; i < 15; i++) {
    // item('price' + i, 'startQuan' + i, 'endQuan' + i, 'itemResult' + i);
    totalGold += item(selectedMonster,'price' + i, 'startQuan' + i, 'endQuan' + i, 'itemResult' + i);
  }
  document.getElementById('totalGoldResult').innerText = "💡 총 " + totalGold.toLocaleString() + "원 획득"; // 결과에 콤마 추가

  calculateExpPerHour();
})

