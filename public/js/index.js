let switchTax = document.getElementById("flexSwitchCheckReverse");

switchTax.addEventListener("click", () => {
    let basePrices = document.getElementsByClassName("basePrice");
    let gstPrices = document.getElementsByClassName("gstPrice");

    for (let i = 0; i < basePrices.length; i++) {
        if (basePrices[i].style.display !== "none") {
            basePrices[i].style.display = "none";
            gstPrices[i].style.display = "inline";
        } else {
            basePrices[i].style.display = "inline";
            gstPrices[i].style.display = "none";
        }
    }
});
