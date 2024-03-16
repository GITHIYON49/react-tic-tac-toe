import { useState } from "react";
function Squaer({value , onSquareClicked}){
     // const[value,setvalue] = useState(null);
 return <>
 <button className="square" onClick={onSquareClicked}>{value}</button>
 </>
}

function Board({xIsNext,square,onPlay}){

     function handleClick(i){
          // nextSquare[i]='X';
          if(square[i] || CalculateWinner(square)){
               return;
          }
          const nextSquare = square.slice();
          if(xIsNext){
               nextSquare[i]='X';
          }
          else{
               nextSquare[i]='O';
          }
          onPlay(nextSquare)
         }

         const winner = CalculateWinner(square);
     let status;
     if(winner){
          status = "winner"+winner

     }
     else{
          status = "Next Player:"+(xIsNext ? "X":"O")
     }

  return <>
<div className="status">{status}</div>
  <div className="board-row">
       <Squaer value={square[0]} onSquareClicked={()=>handleClick(0)}/>
       <Squaer value={square[1]} onSquareClicked={()=>handleClick(1)}/>
       <Squaer value={square[2]} onSquareClicked={()=>handleClick(2)}/>
  </div>

  <div className="board-row">
       <Squaer value={square[3]} onSquareClicked={()=>handleClick(3)}/>
       <Squaer value={square[4]} onSquareClicked={()=>handleClick(4)}/>
       <Squaer value={square[5]} onSquareClicked={()=>handleClick(5)}/>
  </div>

  <div className="board-row">
       <Squaer value={square[6]} onSquareClicked={()=>handleClick(6)}/>
       <Squaer value={square[7]} onSquareClicked={()=>handleClick(7)}/>
       <Squaer value={square[8]} onSquareClicked={()=>handleClick(8)}/>
  </div>



  </>
 
}

export default function Game(){
     const[history,sethistory] = useState([Array(9).fill(null)]);
     const[currentMove,setcurrentmove]=useState(0);
     const xIsNext = currentMove % 2 === 0;
     const currentSquare = history[currentMove]

     function handlePlay(nextSquare){
          const nextHistory = [...history.slice(0,currentMove+1),nextSquare]

sethistory(nextHistory);
setcurrentmove(nextHistory.length-1);
     }
     function jumpTo(nextMove){
setcurrentmove(nextMove)
     }
     const moves = history.map((square,move)=>{
          let description;
          if(move>0){
               description = "Game go to #"+move;
          }
          else{
               description = "Game got to start"
          }
          return(
               <li key={move}>
                    <button onClick={()=>jumpTo(move)}>{description}</button>
               </li>
          )
     })
     return <>
     <div className="game">
          <div className="game-board">
               <Board xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay}/>

          </div>
          <div className="game-info">
               <ol>{moves}</ol>

          </div>

     </div>
     </>
}

function CalculateWinner(square){
     const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
     for(var i=0; i<lines.length; i++){
          const[a,b,c]=lines[i];
          if(square[a] && square[a] === square[b] && square[a] === square[c]){
               return square[a];
          }
          
     }
     return null;

    }