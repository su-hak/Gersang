// 드롭 다운 메뉴 선택 시 이미지,이름,테이블등 출력
window.addEventListener("load", function () {
    let selectEnchant = document.getElementById("selectEnchant");
    let sec2 = document.getElementById("sec2");
    let tables2 = sec2.querySelectorAll("table");
    let images2 = sec2.querySelectorAll("#enchantImageWrapper img");
    let enchantDiv = document.querySelector("#enchantBox");


    function hideAllEnchant(elements) {
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

    /*var wrapper = document.getElementById('enchantImageWrapper');
    var newDiv = document.createElement('div');
    newDiv.className = 'imageBorder';
    wrapper.appendChild(newDiv);*/

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


    hideAllEnchant(tables2);
    hideAllEnchant(images2);
    enchantDiv.style.display = "none";
    showElementChant("enchantDefault-img");
    selectEnchant.addEventListener("change", function () {
        hideAllEnchant(tables2);
        hideAllEnchant(images2);
        if (selectEnchant.value !== "default") {
            enchantDiv.style.display = "block";
        } else {
            enchantDiv.style.display = "none";
        }

        showElementChant(selectEnchant.value);
        showElementChant(selectEnchant.value + "-img");
    });


    selectEnchant.value = "enchantDefault";
    showElementChant("enchantDefault");
});


// 계산 함수
function enchantItem(enchantPriceClass, enchantQuanClass, enchantResultClass) {
    let total = 0;
    $("." + enchantPriceClass).each(function (index) {
// let price = $(this).val() ? parseInt($(this).val().replace(/,/g, ''), 10) : 0;
        let price = 0;
        if ($(this).is('input')) {
            price = $(this).val() ? parseInt($(this).val().replace(/,/g, ''), 10) : 0;
        } else {
            price = $(this).text() ? parseInt($(this).text().replace("💰 : ", "").replace(/,/g, ''), 10) : 0;
        }
        let quantity = $("." + enchantQuanClass).eq(index).text();
        quantity = quantity.replace('개', ''); // 수량에서 '개'를 제거
        let result = price * quantity;

        if (!isNaN(result)) { // 결과가 숫자인 경우에만 출력
            $("." + enchantResultClass).eq(index).text("💰 :" + result.toLocaleString());
            total += result;
        }
    });
    return total;
}

$('#enchantSubmitBtn').click(function () {
    var enchantTotalGold = 0;
    /*    var selectedEnchant = document.getElementById('selectEnchant').value;*/

    /*var enchantRows = document.querySelectorAll('#' + selectedEnchant + ' tr');*/

    for (var i = 0; i < 10; i++) {
        enchantTotalGold += enchantItem('enchantPrice' + (i-1), 'enchantQuan' + (i-1), 'enchantResult' + (i-1));
    }
    document.getElementById('enchantTotalGoldResult').innerText = "💡 주술 비용으로 총 " + enchantTotalGold.toLocaleString() + "원 발생 하였습니다.";

});