import {ReplaceCards,checkSet,state,newGame ,numberOfSets,drawASet,draw3cards,findMode} from "./state.js";
import {renderPreviousMove, render ,RenderMessage} from "./render.js";
import {StartingButtons} from "./startingPage.js";
import { Player } from "./state/field.js";

const game = document.querySelector("#game");
const gameButton=document.querySelector("#game-button");
const playerTurn=document.querySelector("#player");
const score =document.querySelector("#score");
const DoneSetPlayerButton=document.querySelector("#DoneButton");
const gamePage=document.querySelector("#gamePage");
const startingPage=document.querySelector("#startingPage");
const prevCards=document.querySelector("#prevCards");
const hintButton=document.querySelector("#hint");
const findSetButton=document.querySelector("#showSet");
const drawCardsButton=document.querySelector("#drawCards");
const QuitMenuButton=document.querySelector("#Quit");
const gameOver=document.querySelector("#gameOver");
const timer=document.querySelector("#timer");
const pad2 = num => num.toString().padStart(2, '0');


  var SelectedCards=[]; 
  var PlayerCounter=0;
  var counter = 10;
  var update_timer;
  function resetTimer()
  {
    counter=10;
    clearInterval(update_timer);
    update_timer=setInterval(countDown,1000);
  }
  function countDown(){
  
    counter--
    if (counter === 0) {
      resetTimer();
      if(findMode()==="COMPETATIVE"){
        updateScore(-1);
            }
      
      
    }
  
    var time = pad2(counter)  ;
   
    timer.innerHTML = time;

    timer.style.color = "blue";
   
  }
  



function handleMainMenuButtonClick()
{
  startingPage.style.display="block";
  gamePage.style.display="none";
  gameOver.style.display="none";
  clearInterval(update_timer);
  
}
QuitMenuButton.addEventListener("click",handleMainMenuButtonClick);
document.querySelector("#backQuit").addEventListener("click",handleMainMenuButtonClick);

function changeVisibility(card)
{

  for (let i=0;i<state.board.length;i++)
  {
    for(let j=0;j<state.board[i].length;j++)
    {
      
      if(state.board[i][j]===card)
      {
      
          state.board[i][j].isVisible=true;
      }
    }
  }
}
function handlefindSetbuttonClick()
{
  //flagToFindSet=true;
 
  const drawnCards=drawASet(state.board.flat());
  if(drawnCards.length>0){
  for(const card of drawnCards)
  {
   changeVisibility(card);
  }

  }
  else{
    RenderMessage("No Set To  Find on Board");
  }
  updateScore(-3);
  game.innerHTML = render(state); 
  
}
findSetButton.addEventListener("click",handlefindSetbuttonClick);

function putNewCards()
{
  clearSelection(state.board);
  const newRow=draw3cards(state.board);
  for(let i=0;i<newRow.length;i++){
    state.board[i].push(newRow[i]);
  }
  game.innerHTML=render(state);

}
function handleDrawCardsButton()
{
  const count=numberOfSets(state.board.flat());
 if(count===0 && (state.board[0].length*state.board.length)<=16){
  putNewCards();
  }
 else{
  RenderMessage(`Enough Card on Board to find Set`);
 }
}
drawCardsButton.addEventListener("click",handleDrawCardsButton);
 //playerSetCounter=0;

 const setButton=document.querySelector("#set-Button");
 function SetButtonListener()
{
  playerSetCounter=0;
  const  setBody=document.querySelector("#set-Down");
  //var  br=document.createElement("br");
  setBody.classList.toggle("textHide");
  
  var something=document.querySelector("#setPlayer-body");
  


  var v=(something.childNodes);
  state.noOfPlayer=v[1].value;
  //console.log(state.noOfPlayer);
  const dataList=document.getElementById("setPlayersData");
  dataList.innerHTML=`<div id="PlayerName">Input Players name and Number id below:</div>  `;
  for(let i=0;i<state.noOfPlayer;i++){
  dataList.innerHTML+=`
    <input type="text" style="height:15px;width:150px;font-size:14pt;" placeholder="Name of Player"></input>
   <br><br>`;
   // <input type="number" placeholder="123"></input>
  } 
}
setButton.addEventListener("click",SetButtonListener);

function handleDoneSetPlayerButtonClick()
{
  const playerDataName=document.querySelectorAll('#setPlayersData input[type="text"]');
  //const playerDataNumber=document.querySelectorAll('#setPlayersData input[type="number"]');
  state.players=[];
  for (let i=0;i<state.noOfPlayer;i++)
  {
    //console.log(playerDataName[i].value);
    state.players.push(new Player(playerDataName[i].value));
  }
  if(state.players!==0)
  {
  state.arePlayersSet=true;
 // console.log(state.players);
  document.querySelector("#set-Down").classList.toggle("textHide");
  document.querySelector("#setPlayer-body").classList.toggle("textHide");
  }
  
}
DoneSetPlayerButton.addEventListener("click",handleDoneSetPlayerButtonClick);

function handleHintButton()
{
  const cards = state.board.flat();
  const count=numberOfSets(cards);
  updateScore(-1);
  //console.log("there are  in button now "+  count);
 // console.log("ther are  ",cards)
  RenderMessage(`There are  number of sets ${count}`);
  
}
hintButton.addEventListener("click",handleHintButton);


function updateDeckCount()
{
  const deckCount= document.querySelector("#deck-count");
  if(state.limitPerGame<0){
    deckCount.innerHTML=0;
  }
  else{
  deckCount.innerHTML=state.limitPerGame;
  }
}



function GameOverPopUp()
{

    alert("GAME OVER");
    let finalScores="";
    //var fso = new ActiveXObject("Scripting.FileSystemObject");
    //var fh = fso.OpenTextFile("data.txt", 8, false, 0);
    //fh.WriteLine("SCORES ARE STORED HERE");
    for(const player of state.players)
    {
    //  fh.WriteLine(`${player.name}: ${player.score}+ '\n'` );
      finalScores+=`<div><strong>${player.name} : ${player.score}</strong></div>`
    }
  //  fh.Close();
  
    document.querySelector("#lastScore span").innerHTML=finalScores;
    
    gameOver.style.visibility="visible";
    gameOver.style.display="Block";
    gamePage.style.display="None";
  
  
}

function clickPlayerButton()
{
  //console.log(this);
  //console.log("I M CLICK ON PLAYERS BTTON");
  if(state.players.length===1)
  {
    state.selectedIndex=0;
  }
  else{
  for(let i=0;i<state.players.length;i++)
  {
    if(state.players[i].name===this.textContent)
    {
      state.selectedIndex=i;
      break;
    }
  }
  } 
  // if(!state.playersTurn[state.selectedIndex])
  // {
  //   RenderMessage("Not your Turn.");
  // }
  playerTurn.innerHTML=`<span>${state.players[state.selectedIndex].name}</span>`;
  score.innerText=`${state.players[state.selectedIndex].score}`;
    
}

function updatePlayersList()
{
  const playerList=document.querySelector("#playersList");
  playerList.innerHTML="";
  for(let i=0;i<state.noOfPlayer;i++)
  {
    playerList.innerHTML+=`<button id="Pbutton${i}">${state.players[i].name}</button>`
  }
}
function handleNewGameClick() {
  

//setInterval(showTime(), 1000); 


  
  startingPage.style.display="none";
  gamePage.style.display="block";

    newGame(3, 4,3); // Change the state
    updateDeckCount();
    gameOver.style.display="none";
    game.innerHTML = render(state); // Rerender the state
    updateDeckCount();
    //console.log(playerTurn);
   // console.log(state.players);
    updatePlayersList();
    
    for(let i=0;i<state.noOfPlayer;i++)
    {
      document.querySelector(`#Pbutton${i}`).addEventListener("click",clickPlayerButton);
    }
    if(state.players.length===1)
    {
      clickPlayerButton();
    }
    RenderMessage("");
    PlayerCounter=0;
    score.innerText=0;
    
    prevCards.innerHTML="";
   // playerTurn.innerHTML="";
   
    
    timer.style.color = "black";
    timer.innerHTML = "00";
    resetTimer();
    //update_timer(); 
    // console.dir(state);
    
  }

gameButton.addEventListener("click", handleNewGameClick);
document.querySelector("#restart-game").addEventListener("click",handleNewGameClick);
//delegate function
function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);

    if (this.contains(targetElement)) {
      handler.call(targetElement, event);
    }
  });
}
StartingButtons();


function handleFieldClick() {


  
    const clikedCard = this.innerHTML;
    console.log(this);
    const td = this;
    const tr = td.parentNode;
    const y = td.cellIndex;
    const x = tr.rowIndex;
    state.board[x][y].isSelected=!state.board[x][y].isSelected;
    console.log(state.board[x][y]);
    SelectedCards=popUnSelectedCards(SelectedCards); 

    
    game.innerHTML = render(state);
   // console.log(SelectedCards);
    pushSelectedCards(state.board);
  
    var message=`${isSetSelected(SelectedCards)?`${checkSet(SelectedCards)?"ITS SET.":"ITS NOT SET."}`:"Set Not Selected."}`;
    RenderMessage(message);
    //console.log(PlayerCounter);
    //console.log(state.players.length);
   
    if(isSetSelected(SelectedCards))
    {
       
      resetTimer();
      if(PlayerCounter<state.players.length-1)
      {
        PlayerCounter+=1;
      }else{  
        PlayerCounter=0;
      }
    
        //var error= document.querySelector('div');
      //  console.log("in isset selected ");
      //  printSelectedCards(SelectedCards);
     
     // game.appendChild(`<div> ${checkSet(SelectedCards)?"SET FOUND":"ITS NOT SET"}</div>`);
       
       var prevCard=document.querySelector("#prevCards");
        prevCard.innerHTML=renderPreviousMove(SelectedCards);
        
     ///  prevMove.innerHTML(prevCard);
       
      if(checkSet(SelectedCards)){
        //console.log(score.innerText);
        
        updateScore(1);
        game.innerHTML = render(state); 
        ReplaceCards(state.board);
        updateDeckCount();
        
       
      }
      else{
        updateScore(-1);
      }
      // game.append(error);
       clearSelection(state.board);
       clearShowSet(state.board);
       clearArray(SelectedCards);
      
     
      //console.log("ITS IN INDEX>JS "+ SelectedCards);
      
      // //state.playersTurn[selectedIndex]=false;
      // if(selectedIndex+1<state.playersTurn.length)
      //   state.playersTurn[selectedIndex+1]=true;
      // else{
      //   state.playersTurn[0]=true;
      // }
    }
 
    
    
    //game.innerHTML = render(state);
    
    if(numberOfSets(state.board.flat())===0 && (state.board[0].length*state.board.length)<=16  && findMode()==="COMPETATIVE")
    {
     putNewCards();
     }
    
    if(state.limitPerGame<= 0 && numberOfSets(state.board.flat())<=0)
    {
   
        // // Get the modal
        // var modal = document.getElementById("myModal");

        // // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];

        // // When the user clicks on the button, open the modal
        // btn.onclick = function() {
        //   modal.style.display = "block";
        // }

        // // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //   modal.style.display = "none";
        // }

        // // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //   if (event.target == modal) {
        //     modal.style.display = "none";
        //   }
        // } 
            GameOverPopUp();
            
          //alert("GAME OVER YOU DUFFER");
    }
}
 function printSelectedCards(cards)
 {
   //console.log("printing cards");
   for(let i=0;i<cards.length;++i)
   {
     console.log(cards[i]);
   }
}
  function isSetSelected(selectedCards)
  {
      ///console.log(SelectedCards);
return selectedCards.length===3  ;
}
function pushSelectedCards(cards)
{
  for(let i=0;i<cards.length;i++){

  for(let j=0;j<cards[i].length;j++){
  if(!SelectedCards.includes(cards[i][j]))
  { 
    if(cards[i][j].isSelected)
      SelectedCards.push(cards[i][j]);
  }
    }
    }
}
function popUnSelectedCards(cards)
{
  let array=[];
  for(let i=0;i<cards.length;i++)
  {
   // console.log("is it selected ? ",cards[i].isSelected);
    if(cards[i].isSelected)
    {
    //  console.log('then are u pushing in ?');
      array.push(cards[i]);
    }
  }
 // console.log(array);
  return array; 
}
function clearShowSet(board)
{
  for(let i=0;i<board.length;i++){
       
    for(let j=0;j<board[i].length;j++)
    {
          if(board[i][j].isVisible){
              board[i][j].isVisible=false;
              //board[i][j].isVisible=false;
  
          }
  }
    }
}
function clearSelection(board)
{

  for(let i=0;i<board.length;i++){
       
  for(let j=0;j<board[i].length;j++)
  {
        if(board[i][j].isSelected){
            board[i][j].isSelected=false;
            //board[i][j].isVisible=false;

        }
}
  }
};
function clearArray(array) {
    while (array.length) {
    
      array.pop();
    }
  };
function updateScore(value){
    state.players[state.selectedIndex].score+=value;
    
    score.innerText=state.players[state.selectedIndex].score;
  
  
  };



  delegate(game, "click", "td", handleFieldClick);
  