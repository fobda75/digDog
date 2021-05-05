const num_bones = 5;
let squareCount=1;
let bonesArray = [];
$(".container").css("width",`${num_bones*130}px`)
$(document).ready(function () {
    for (let gridRow = 1; gridRow<=num_bones; gridRow++){

        let yardRow =$("<div>").addClass("row");
        $("#yard").append(yardRow);

        bonesArray.push();
        bonesArray[gridRow-1] =[];

        for(let gridCol=1; gridCol<=num_bones; gridCol++){
            let yardCol = $("<div>").addClass("col");
            yardRow.append(yardCol);

            bonesArray[gridRow-1].push();
            bonesArray[gridRow-1][gridCol-1]=false;

            let yardGrid = $("<span>").addClass("key");
            yardCol.append(yardGrid);

            yardGrid.css("background-color", "#1c4a2e");
            yardGrid.css("color", "#AA0000");
            yardGrid.text(squareCount);
            squareCount++;
            yardGrid.attr("id", `${gridRow}-${gridCol}`);
            yardGrid.click(squareClicked);
            yardGrid.data("row",gridRow);
            yardGrid.data("col",gridCol);
        }
    }
    let boneCount = num_bones;
    let buryRow;
    let buryCol;
    while (boneCount>0){
        buryRow = Math.floor(Math.random()*num_bones);
        buryCol = Math.floor(Math.random()*num_bones);
        if (bonesArray[buryRow][buryCol] === false){
            bonesArray[buryRow][buryCol] = true;
            boneCount--;
        }
    }
    $("#boneCount").text(num_bones)
})



function squareClicked() {
    let square = $(this);
    square.css("background-color", "#5b3003");
    square.css("color","#e5cfcf");
    $(this).off("click");
    if(bonesArray[square.data("row")-1][square.data("col")-1] === true){
        let bc = parseInt($("#boneCount").text());
        bc--;
        $("#boneCount").text(bc);
        if (parseInt($("#boneCount").text())===0){
            disableGrid();
        }
        let br = $("<br>");
        square.append(br);
        let boneImage = $("<img>");
        square.append(boneImage);
        boneImage.attr("src","dogbone.png");
        boneImage.attr("height", "70px");
        boneImage.attr("width", "70px");
    }
    let minIncrease = 100/(Math.pow(num_bones,2));
    let maxIncrease = 400/(Math.pow(num_bones,2));
    let increaseRange = maxIncrease - minIncrease;
    let dangerIncrease = Math.floor((Math.random()*increaseRange)+minIncrease)
    let dangerLevel = parseInt($("#dangerCount").text());
    dangerLevel += dangerIncrease;
    if (dangerLevel>100){
        dangerLevel=100;
    }
    if (parseInt($("#boneCount").text())===0){
        $("#winOrLose").text("YOU WIN!")
        $("#endgameMessage").text(`Who's a good dog? You are! You have found all ${num_bones} of 
            your bones before being chased out of the yard.`);
    }
    else if (dangerLevel===100){
        disableGrid();
        $("#winOrLose").text("YOU HAVE LOST!")
        $("#endgameMessage").text(`Shoo Dog! Get out of my yard! You have made the human angry 
            and he has chased you out of the yard. You only found ${num_bones-parseInt($("#boneCount").text())} 
            of your bones. You lost the other ${$("#boneCount").text()} bones.`);
    }
    $("#redBox").css("width",`${dangerLevel*2}px`);
    $("#greenBox").css("width",`${200-(dangerLevel*2)}px`);
    $("#dangerCount").text(dangerLevel);
    if (dangerLevel >= 85){
        $(".dangerContainer").css("color","red");
    }
    else if (dangerLevel >= 70){
        $(".dangerContainer").css("color","orange");
    }
    else if (dangerLevel >= 55){
        $(".dangerContainer").css("color","yellow");
    }
}

function disableGrid() {
    for (let row=1; row<=num_bones; row++){
        for (let col=1; col<=num_bones;col++){
            $(`#${row}-${col}`).off("click")
        }
    }

}