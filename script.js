const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    const gameBoard = ["", "", "", "", "", "", "", "", ""]
    const newArr = []
    let count = 1;
    const marked = {X: [], O: []}


    gameBoard.filter((item, index)=> newArr.push(index))
    const renderContents = ()=>{
        for(let i=0; i< gameBoard.length; i++){
            const mark = document.createElement("div")
            mark.setAttribute("data-index", newArr[i])
            mark.textContent = gameBoard[i]; 
            gameDisplay.appendChild(mark)
        }
    }
    const clickEvent = ()=>{ 
        gameDisplay.addEventListener("click", (event)=>{
           if(!gameBoard[event.target.dataset.index]){
            getPlayerMark(event)
            renderContents()
            position(event)
           } else {
             false;
           }
           checkWinner()
        })
    }
    function getPlayerMark(event){
        if(count % 2 !== 0){
            firstPlayer.setPlayerMark(event)
            count++
        } else if(count % 2 === 0){
            secondPlayer.setPlayerMark(event)
            count++
        }
    }
    const position=(event)=>{
       count % 2 === 0 ?  marked.X.push(event.target.dataset.index)
       : marked.O.push(event.target.dataset.index)
    }
   
    function checkWinner(){
        for(const prop in marked){
            let spots = marked[prop].sort()
            for(let spot of spots){
                let i = spots.indexOf(spot)
              if((+spots[i - 1] == 4 && (+spots[i - 2] + 4 == spot && +spots[i - 1] + 2 == spot))||
                 (+spots[i - 1] == 4 &&(+spots[i - 2] + 8 == spot && +spots[i - 1] + 4 == spot))){

                    alert(`${prop} is the winner`)

              }else if(((spot == 2 || spot == 5 || spot == 8) && 
                        (+spots[i - 2] + 2 == spot && +spots[i - 1] + 1 == spot)) ||
                        (+spots[i - 2] + 6 == spot && +spots[i - 1] + 3 == spot)){

              alert(`${prop} is the winner`)

        }
            }
        }
    }

    renderContents()
    clickEvent()
    return{gameBoard, gameDisplay}
})();
const Player = (mark)=>{
    const setPlayerMark = (event)=>{
        while(GameBoard.gameDisplay.firstChild){
            GameBoard.gameDisplay.removeChild(GameBoard.gameDisplay.firstChild)}
        GameBoard.gameBoard[event.target.dataset.index] = mark
    }
    return{setPlayerMark}

}

const firstPlayer = Player("X")
const secondPlayer = Player("O")

const Game =()=>{

}