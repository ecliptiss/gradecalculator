function changeImport(type) {
    document.getElementById("main").style.display = "none";
    document.getElementById(type).style.display = "block";
}

function backMain() {
    document.getElementById("main").style.display = "block";
    document.getElementById("auto").style.display = "none";
    document.getElementById("manual").style.display = "none";
}

function back(dest) {
    document.getElementById("auto").style.display = (dest == "auto" ? "block" : "none");
    document.getElementById("manual").style.display = (dest == "manual" ? "block" : "none");
    document.getElementById("calculation").style.display = "none";
}

async function validate(type) {
    if (type == "manual") {
        let items = Array.from(document.querySelectorAll("input"));
        if (items.length == 0) {
            document.getElementById("warning-m").innerHTML = "At least one grade is required for calculations.";
            document.getElementById("next-m").disabled = true;
            await sleep(3500);
            document.getElementById("warning-m").innerHTML = "";
            document.getElementById("next-m").disabled = false;
            return false;
        }
        let emptyInputs = items.filter(input => input.value === "");
        if (emptyInputs.length > 0) {
            document.getElementById("warning-m").innerHTML = "Please fill in all boxes for accurate calculations.";
            document.getElementById("next-m").disabled = true;
            await sleep(4000);
            document.getElementById("warning-m").innerHTML = "";
            document.getElementById("next-m").disabled = false;
            return false;
        }
        let values = items.filter(input => input.value !== "" && (input.value < 0 || input.value > 125)).map(input => input.value);
        if (values.length > 0) {
            document.getElementById("warning-m").innerHTML = "Please input reasonable grades between 0 and 125.";
            document.getElementById("next-m").disabled = true;
            await sleep(4000);
            document.getElementById("warning-m").innerHTML = "";
            document.getElementById("next-m").disabled = false;
            return false;
        }
    } else if (type == "auto") {
        let input = document.getElementById("grades-a");
        if (input.value == "") {
            document.getElementById("warning-a").innerHTML = "At least one grade is required for calculations.";
            document.getElementById("next-a").disabled = true;
            await sleep(4000);
            document.getElementById("warning-a").innerHTML = "";
            document.getElementById("next-a").disabled = false;
            return false;
        }
    }
    return true;
}

async function nextPage(origin) {
    let result = await validate(origin);
    if (!result) { return; }
    if (origin == "manual") {
        manualCalculate();
    } else if (origin == "auto") {
        autoCalculate();
    }

    document.getElementById("auto").style.display = "none";
    document.getElementById("manual").style.display = "none";
    document.getElementById("calculation").style.display = "block";
    document.getElementById("back2").onclick = () => back(origin);
}