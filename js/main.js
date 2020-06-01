'use strict';


var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var isGameOn = false;
var gIsFirstClick = true;
var gNextNum = 1;
var gStartTime;
var gIntervalId;





function init() {
    var nums = shuffle(gNums);
    renderTable(nums);
}

function shuffle(nums) {
    for (var i = nums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return (nums)
}

// function renderTable(nums) {
//     var copyOfNums = nums.slice();
//     var shuffledNums = shuffle(copyOfNums);
//     var strHTML = '';
//     for (var i = 0; i < Math.sqrt(gNums.length); i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < Math.sqrt(nums.length); j++) {
//             var cell = shuffledNums.pop();
//             console.log(cell)
//             strHTML += `<td data-num="${cell}" 
//             onclick="cellClicked(this,${cell})">${cell}</td>`

//         }
//         strHTML += '</tr>';
//     }
//     var elTbody = document.querySelector('.nums-table');
//     elTbody.innerHTML = strHTML;
// }

function renderTable(nums) {
    // update the Model:
    var copyOfNums = nums.slice();
    var len = copyOfNums.length;
    var shuffeldNums = shuffle(copyOfNums);
    var strHTML = '';
    for (var i = 0; i < 4; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < 4; j++) {
            var cell = shuffeldNums.pop();
            strHTML += `<td data-num="${cell}" onclick="cellClicked(this,${cell},${len})">${cell}</td>`
        }
        strHTML += '</tr>';
    }
    // update the Dom:
    var elTbody = document.querySelector('.nums-table');
    elTbody.innerHTML = strHTML;
}


function cellClicked(elCell, cell, len) {
    if (gIsFirstClick) {
        gIsFirstClick = false;
        gStartTime = Date.now();
        gIntervalId = setInterval(getGameTime, 10);
    }
    if (cell === 1) {
        isGameOn = true;
        console.log('is game on: ', isGameOn);
    }
    if (cell === gNextNum) {
        elCell.style.backgroundColor = "pink";
        gNextNum++
        if (cell === len) {
            isGameOn = false;
            console.log('is game on: ', isGameOn);
            clearInterval(gIntervalId);
        }
    } else return
}
function getGameTime() {
    var currTime = Date.now()
    var timePass = (currTime - gStartTime) / 1000
    document.querySelector('.stopwatch').innerText = timePass;
}




