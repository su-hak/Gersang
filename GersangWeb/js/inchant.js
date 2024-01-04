window.onload = function() {
    let selectInchant = document.getElementById("selectInchant");
    let tables = document.querySelectorAll("table");
    let images = document.querySelectorAll("#imageWrapper img");
    let divs = document.querySelector("#exp");

    function hideAll(elements) {
        elements.forEach(el => el.style.display = "none");
    }

    function showElement(id) {
        let element = document.getElementById(id);
        if (element) {
            element.style.display = "block";
        }
    }

    hideAll(tables);
    hideAll(images);
    divs.style.display = "none";
    showElement("default");

    selectInchant.addEventListener("change", function() {
        hideAll(tables);
        hideAll(images);
        if (selectInchant.value !== "default") {
            divs.style.display = "block";
        } else {
            divs.style.display = "none";
        }
        showElement(selectInchant.value);
        showElement(selectInchant.value + "-img");
    });

    selectInchant.value = "default";
    showElement("default");
}
