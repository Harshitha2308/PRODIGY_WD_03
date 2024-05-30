window.addEventListener("DOMContentLoaded",()=>{
    const tiles=Array.from(document.querySelectorAll(".tile"));
    const playerDisplay=document.querySelector(".display-player");
    const resetButton=document.querySelector("#reset");
    const announcer=document.querySelector(".announcer");

    let board=["","","","","","","","",""];
    let currentPlayer="X";
    let isGameActive=true;

    const playerX_won="player_X_won";
    const playerO_won="player_O_won";
    const tie="Tie";

    const winningConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function handleResultValidation(){
        let roundWon=false;
        for(let i=0;i<=7;i++){
            const winningCondition=winningConditions[i];
            const a=board[winningCondition[0]];
            const b=board[winningCondition[1]];
            const c=board[winningCondition[2]];
            if (a===""||b===""||c===""){
                continue;

            }
            if (a===b && b===c){
                roundWon=true;
                break;

            }
        }
        if (roundWon){
            announce(currentPlayer==="X"?playerX_won:playerO_won);
            isGameActive=false;
            return;
        }
        if (!board.includes(""))
            announce(tie);
    }

    const announce=(type)=>{
        switch(type){
            case playerO_won:
                announcer.innerHTML='player <span class="playerO">O</span> won';
                break;
            case playerX_won:
                announcer.innerHTML='player <span class="playerX">X</span> won';
                break;
            case tie:
                announcer.innerHTML="tie";

        }
        announcer.classList.remove('hide');
    };
    const isValidAction=(tile)=>{
        if(tile.innerText==="X"||tile.innerText==="O"){
            return false;
        }
        return true;

    };

    const updateBoard=(index)=>{
        board[index]=currentPlayer;
    }

    const changePlayer=()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer=currentPlayer==="X"?"O":"X";
        playerDisplay.innerText=currentPlayer;
        playerDisplay.classList.add(`Player${currentPlayer}`);

    }

    const userAction=(tile,index)=>{
        if(isValidAction(tile)&& isGameActive){
            tile.innerText=currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard=()=>{
        board=["","","","","","","","",""];
        isGameActive=true;
        announcer.classList.add("hide");

        if(currentPlayer==="O"){
            changePlayer();
        }
        tiles.forEach(tile=>{
            tile.innerText="";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        });
    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener("click",()=>userAction(tile,index));
    });
    resetButton.addEventListener("click",resetBoard);
});

