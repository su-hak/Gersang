// 드롭 다운 메뉴 선택 시 이미지,이름,테이블등 출력
window.addEventListener("load", function () {
    let selectInchant = document.getElementById("selectInchant");
    let sec2 = document.getElementById("sec2");
    let tables2 = sec2.querySelectorAll("table");
    let images2 = sec2.querySelectorAll("#inchantImageWrapper img");


    function hideAllInchant(elements) {
        elements.forEach(el => {
            el.style.display = "none"
            removeAltText(el);
        });
    }

    function removeAltText(element) {
        let altTextElement = element.parentNode.querySelector(".image-alt-text");
        if (altTextElement) {
            altTextElement.remove();
        }
    }

    function showElementChant(id) {
        let element = document.getElementById(id);

        if (element) {
            element.style.display = "block";
            let altValue = element.getAttribute("alt");

            // 이미지 아래 이름
            let altTextElement = document.createElement("div");
            altTextElement.className = "image-alt-text";
            altTextElement.textContent = altValue;

            // 이미지 요소의 부모 요소에 새로운 요소 추가
            element.parentNode.appendChild(altTextElement);
        }
    }

    hideAllInchant(tables2);
    hideAllInchant(images2);
    showElementChant("inchantDefault-img");

    selectInchant.addEventListener("change", function() {
        hideAllInchant(tables2);
        hideAllInchant(images2);
        showElementChant(selectInchant.value);
        showElementChant(selectInchant.value + "-img");
    });

    selectInchant.value = "inchantDefault";
    showElementChant("inchantDefault");
});

// function calculateExpPerHour() {
//     var timeByGoldResult = $('#timeByGoldResult');
//
//
//
//     // 시간 당 수익 계산 .replace(/[^0-9]/g, '') -> 문자열 제거/ .replace(/,/g, '') -> 숫자제거
//     var goldPerHour = parseInt($('#totalGoldResult').text().replace(/[^0-9]/g, '').replace(/,/g, '')) / (timeDiff / 60);
//     console.log(goldPerHour, '나누기 전 ')
//
//     resultExpPerHour.text("💡 시간 당 " + Math.round(expPerHour).toLocaleString() + "exp 획득");
//     timeByGoldResult.text("💡 시간 당 " + Math.round(goldPerHour).toLocaleString() + "원 획득");
// }

// 아이템 값 계산 목록
function inchantItem(inchantId, priceClass, quantityClass, resultClass) {
    let priceElement = document.querySelector('.' + priceClass);
    let price;

    // 가격 정보가 텍스트인 경우와 input 필드인 경우를 구분
    if (priceElement.tagName.toLowerCase() === 'input') {
        // 콤마 제거 후 숫자로 변환, 없으면 0
        price = priceElement.value ? parseInt(priceElement.value.replace(/,/g, ''), 10) : 0;
    }

    
    let quantity = document.querySelector('.' + quantityClass);
    let resultElement = document.querySelector('.' + resultClass); // 요소 선택
    if (resultElement) { // 요소가 존재하는지 확인
        // 결과 계산 후 출력
        let result = price * quantity;
        resultElement.innerText = "💰 : " + result.toLocaleString(); // 결과에 콤마 추가
        return result; // 계산된 결과 반환
    } else {
        console.error("결과 요소를 찾을 수 없습니다."); // 오류 처리
        return null;
    }
    // 결과 계산 후 출력
    // let result = price * quantity;
    // document.querySelector('.' + itemResultClass).innerText = "💰 : " + result.toLocaleString(); // 결과에 콤마 추가
    // return result; // 계산된 결과 반환
}

/*function exp(){
    var sExp = parseInt($('#startExp').val().replace(/,/g, '')); // 계산을 수행하기 전에 콤마를 제거
    var eExp = parseInt($('#endExp').val().replace(/,/g, ''));
    var resultExp = $('#resultExp');

    var result = eExp - sExp;
    // console.log(result,'result');
    resultExp.text("총 " + result.toLocaleString()+  "exp");

}*/

$('#inchantSubmitBtn').click(function (){

    var selectedInchant = document.getElementById('selectInchant').value;
    var inchantTotalGold = 0; // 총 수익 초기 값으로 변수 선언

    for (var i = 0; i < 15; i++) {
        inchantItem('price' + i, 'quantity' + i, 'itemResult' + i);
        // inchantTotalGold += inchantItem(selectedInchant,'price' + i, 'Quan' + i, 'itemResult' + i);
    }
    document.getElementById('inchantTotalGoldResult').innerText = "💡 총 " + inchantTotalGold.toLocaleString() + "원 획득"; // 결과에 콤마 추가

    calculateExpPerHour();
})
