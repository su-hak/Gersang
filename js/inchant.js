// 드롭 다운 메뉴 선택 시 이미지,이름,테이블등 출력
window.addEventListener("load", function () {
    let selectInchant = document.getElementById("selectInchant");
    let sec2 = document.getElementById("sec2");
    let tables2 = sec2.querySelectorAll("table");
    let images2 = sec2.querySelectorAll("#inchantImageWrapper img");
    let inchantDiv = document.querySelector("#inchantBox");

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
    inchantDiv.style.display = "none";
    showElementChant("inchantDefault-img");

    selectInchant.addEventListener("change", function() {
        hideAllInchant(tables2);
        hideAllInchant(images2);
        if (selectInchant.value !== "default") {
            inchantDiv.style.display = "block";
        } else {
            inchantDiv.style.display = "none";
        }
        showElementChant(selectInchant.value);
        showElementChant(selectInchant.value + "-img");
    });

    selectInchant.value = "inchantDefault";
    showElementChant("inchantDefault");
});

// 계산 함수
function inchantItem(inchantPriceClass, inchantQuanClass, inchantResultClass) {
    let total = 0;
    $("." + inchantPriceClass).each(function(index){
        let price = $(this).val() ? parseInt($(this).val().replace(/,/g, ''), 10) : 0;
        let quantity = $("." + inchantQuanClass).eq(index).text();
        quantity = quantity.replace('개', ''); // 수량에서 '개'를 제거
        let result = price * quantity;

        if(!isNaN(result)) { // 결과가 숫자인 경우에만 출력
            $("." + inchantResultClass).eq(index).text(result + '원');
            total += result;
        }
    });
    return total;
}

$('#inchantSubmitBtn').click(function () {
    var inchantTotalGold = 0;
    for (var i = 0; i < 10; i++) {
        inchantTotalGold += inchantItem('inchantPrice' + i, 'inchantQuan' + i, 'inchantResult' + i);
    }
    document.getElementById('inchantTotalGoldResult').innerText = "💡 주술 비용으로 총 "+ inchantTotalGold.toLocaleString() + "원 발생 하였습니다.";

});