const GameBoard = (()=>{
    const gameDisplay = document.querySelector(".game-board")
    const gameBoard = ["X", "O", "X", "O", "X", "O", "O", "X", "O"]
    const newArr = []
    
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
            if(event.target.nodeName === "DIV"){
                console.log(event.target.dataset.index)

            }
        })

    }
    // function setPlayerMark(){
    //     for(let i=0; i< gameBoard.length; i++){
            
    //     }
    // }
    renderContents()
    clickEvent()
})();