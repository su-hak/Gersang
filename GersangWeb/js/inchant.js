window.addEventListener("load", function () {
    let selectInchant = document.getElementById("selectInchant");
    let sec2 = document.getElementById("sec2");
    let tables2 = sec2.querySelectorAll("table");
    let images2 = sec2.querySelectorAll("#inchantImageWrapper img");


    function hideAllInchant(elements) {
        elements.forEach(el => el.style.display = "none");
    }

    function showElementChant(id) {
        let element = document.getElementById(id);
        if (element) {
            element.style.display = "block";
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