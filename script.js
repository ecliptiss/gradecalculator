function sleep(ms) {
    // copied from stackoverflow
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    }

    document.getElementById("auto").style.display = "none";
    document.getElementById("manual").style.display = "none";
    document.getElementById("calculation").style.display = "block";
    document.getElementById("back2").onclick = () => back(origin);
}

function addGrade(object) {
    let parentDiv = object.parentElement;

    let grade = document.createElement("div");
    grade.style.display = "flex";
    grade.style.justifyContent = "center";
    grade.style.gap = "0.3vw";
    grade.style.marginBottom = "6px";

    let gradeField = document.createElement("input");
    gradeField.className = "grades";
    gradeField.type = "number";
    gradeField.step = "0.01";
    gradeField.max = 200;
    gradeField.min = 0;
    gradeField.style.height = "15px";
    gradeField.style.width = "42px";
    grade.append(gradeField);

    let weighting = document.createElement("select");
    weighting.className = "numberGrades";
    grade.append(weighting);
    for (let i = 1; i < 6; i++) {
        let option = document.createElement("option");
        option.text = "x" + i;
        weighting.appendChild(option);
    }

    let cancel = document.createElement("button");
    cancel.innerHTML = "X";
    cancel.onclick = function () {
        grade.remove();
        let heading = parentDiv.querySelector("h4").innerHTML;
        parentDiv.querySelector("h4").innerHTML = heading.substring(0, heading.indexOf(" ")) + " (" + parentDiv.querySelectorAll("div").length + ")";
    };
    grade.append(cancel);

    parentDiv.insertBefore(grade, object);

    // edit heading
    let heading = parentDiv.querySelector("h4").innerHTML;
    parentDiv.querySelector("h4").innerHTML = heading.substring(0, heading.indexOf(" ")) + " (" + parentDiv.querySelectorAll("div").length + ")";
}

function viewGrades(cate) {
    let elem = document.getElementById(`${cate}-grades`);
    elem.style.display = (elem.style.display == "none" ? "block" : "none")
}

function averageDiv(ele) {
    // for manual calculations only
    // additional accounts for weighting > 1
    let total = 0, additional = 0, list = [];
    for (let i of ele.querySelectorAll("div")) {
        for (let j = 0; j < parseInt(i.querySelector("select").value.substring(1)); j++) {
            b = parseFloat(i.querySelector("input").value)
            total += b;
            list.push(b);
            if (j > 0) {
                additional++;
            }
        }
    }
    return [total / (ele.querySelectorAll("div").length + additional), list];
}

function manualCalculate() {
    let prepares = document.getElementById("prepares");
    let rehearses = document.getElementById("rehearses");
    let performs = document.getElementById("performs");

    let [prepareAvg, prepareList] = averageDiv(prepares);
    let [rehearseAvg, rehearseList] = averageDiv(rehearses);
    let [performAvg, performList] = averageDiv(performs);

    let averages = [prepareAvg, rehearseAvg, performAvg];
    let weights = [0.2, 0.3, 0.5];
    let num = 0, den = 0;

    for (let i = 0; i < 3; i++) {
        if (!isNaN(averages[i])) {
            num += averages[i] * weights[i];
            den += weights[i];
        }
    }

    let grade = num / den;

    document.getElementById("prepare-avg").innerHTML = "Prepare Average:" + "<br />" + "<b>" + (!isNaN(prepareAvg) ? prepareAvg.toFixed(3) : "None") + "</b>";
    document.getElementById("prepare-grades").innerHTML = prepareList.join(", ");
    document.getElementById("rehearse-avg").innerHTML = "Rehearse Average:" + "<br />" + "<b>" + (!isNaN(rehearseAvg) ? rehearseAvg.toFixed(3) : "None") + "</b>";
    document.getElementById("rehearse-grades").innerHTML = rehearseList.join(", ");
    document.getElementById("perform-avg").innerHTML = "Perform Average:" + "<br />" + "<b>" + (!isNaN(performAvg) ? performAvg.toFixed(3) : "None") + "</b>";
    document.getElementById("perform-grades").innerHTML = performList.join(", ");
    document.getElementById("final-grade").innerHTML = "<b>" + "Your grade is a " + grade.toFixed(3) + ", which rounds to a " + Math.round(grade) + ".";
}