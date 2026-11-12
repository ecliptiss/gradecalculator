function sleep(ms) {
    // copied from stackoverflow
    return new Promise(resolve => setTimeout(resolve, ms));
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