let switchTax = document.getElementById("flexSwitchCheckReverse");
switchTax.addEventListener("click", () => {
    let GSTinfo = document.getElementsByClassName("GST");
    for (let info of GSTinfo) {
        if(info.style.display != "inline"){
            info.style.display = "inline";
        }else{
            info.style.display = "none";
        }
    }
});
