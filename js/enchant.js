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
function enchantItem(enchantId, priceClass, quanClass, resultClass) {


    var enchantPriceElement = document.querySelector(`#${enchantId} .${priceClass}`);

    var price = 0;
    if (enchantPriceElement.tagName.toLowerCase() === 'input') {
        price = enchantPriceElement.value ? parseInt(enchantPriceElement.value.replace(/,/g, ''), 10) : 0;
    } else {
        var priceText = enchantPriceElement.innerText;
        price = priceText.replace("💰 : ", "").replace(/,/g, "");
        price = price ? parseInt(price, 10): 0;
    }

    var quantity = document.querySelector(`#${enchantId} .${quanClass}`).innerText;
    quantity = quantity.replace('개', '');
    quantity = quantity ? parseInt(quantity, 10): 0;

    var result = price * quantity;
    document.querySelector(`#${enchantId} .${resultClass}`).innerText = "💰 :" + result.toLocaleString();

    return result;
}

$(document).ready()
{
    $('#enchantSubmitBtn').click(function () {
        var selectedEnchant = document.getElementById('selectEnchant').value;

        var enchantRows = document.querySelectorAll('#' + selectedEnchant + ' tr');

        var enchantTotalGold = 0;
        for (var i = 1; i < enchantRows.length; i++) {
            enchantTotalGold += enchantItem(selectedEnchant, 'enchantPrice' + (i - 1), 'enchantQuan' + (i - 1), 'enchantResult' + (i - 1));
        }
        document.getElementById('enchantTotalGoldResult').innerText = "💡 주술 비용으로 총 " + enchantTotalGold.toLocaleString() + "원 발생 하였습니다.";
    });
}