const letter = document.querySelectorAll('.bingo-letter');
const table = document.querySelector('.bingo-table');
const winningPositions = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
]
let arr = Array.apply(null,{length: 26}).map(Number.call, Number);
function OpenPopUp(){
    let popUp = document.querySelector('.pop-up');
    popUp.classList.add('open-popup');
}
arr.shift();
shuffle(arr);

function shuffle(arr){
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex--;
        [arr[currentIndex],arr[randomIndex]] = [arr[randomIndex],arr[currentIndex]];
    }
    return arr;
}

let iterator = 0;

for(i=0; i<5; i++){
    let tr = document.createElement("tr");
    table.appendChild(tr);

  for(j=0; j<5; j++){
    let td= document.createElement("td");
    td.id = arr[iterator].toString();
    td.style.height="20%"
    td.style.width="20%"
    td.classList.add("main-table-cell")

    let div = document.createElement("div");
    div.classList.add("cellFormat")
    div.textContent = arr[iterator].toString();
    td.appendChild(div);
    tr.appendChild(td);
    iterator++;
    }  
}
const cell = document.querySelectorAll(".main-table-cell");
let winningIterator = 0
cell.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.add("strickout");

        if(winMatch()){
            letter[winningIterator].classList.add("show-bingo");

            winningIterator++;
            if(winningIterator === 5){
                OpenPopUp()
            }
        }
    })   
})

function winMatch(){
    const cell = document.querySelectorAll(".main-table-cell");
    return winningPositions.some(combination => {
        let iter = 0;
        combination.forEach(index => {   
          if(cell[index].classList.contains("strickout")) iter++;
        })
        if(iter === 5){
            let indexWin = winningPositions.indexOf(combination);
            winningPositions.splice(indexWin, 1);
        }
        return combination.every(index =>{
            return cell[index].classList.contains("strickout");
        })
    })
}
function closepopup(){
      location.reload();
}

