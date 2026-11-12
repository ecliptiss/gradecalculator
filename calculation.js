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

function autoCalculate() {
    // grab the input, split it, grab the category and grades
    return;
}