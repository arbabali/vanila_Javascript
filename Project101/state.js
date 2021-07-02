import { RenderMessage } from "./render.js";
import { Player ,Card } from "./state/field.js";

export const state = {
  board: [] ,// Matrix of Cards
  players: [], // array of Players
  playersTurn:[],
  CardsDeck:[],
  noOfPlayer:1,
  minRange:0,
  maxRange:80,
  limitPerGame:81,
  arePlayersSet:false,
  selectedIndex:0

};
//___________________________________________________________________________________________________///////////////////
export function Timer(fn, t) {
  var timerObj = setInterval(fn, t);

  this.stop = function() {
      if (timerObj) {
          clearInterval(timerObj);
          timerObj = null;
      }
      return this;
  }

  // start timer using current settings (if it's not already running)
  this.start = function() {
      if (!timerObj) {
          this.stop();
          timerObj = setInterval(fn, t);
      }
      return this;
  }

  // start with new or original interval, stop current interval
  this.reset = function(newT = t) {
      t = newT;
      return this.stop().start();
  }
}
//___________________________________________________________________________________________________/////////////
//UTILITY ARRAY
const CardAddEasy=['blank.png', 'green_D_F_1.png', 'green_D_F_2.png', 'green_D_F_3.png',
 'green_O_F_1.png', 'green_O_F_2.png', 'green_O_F_3.png', 'green_SP_F_1.png', 'green_SP_F_2.png',
  'green_SP_F_3.png', 'purple_D_F_1.png', 'purple_D_F_2.png', 'purple_D_F_3.png', 'purple_O_F_1.png', 
  'purple_O_F_2.png', 'purple_O_F_3.png', 'purple_SP_F_1.png', 'purple_SP_F_2.png', 'purple_SP_F_3.png',
   'red_D_F_1.png', 'red_D_F_2.png', 'red_D_F_3.png',
 'red_O_F_1.png', 'red_O_F_2.png', 'red_O_F_3.png', 'red_SP_F_1.png', 'red_SP_F_2.png', 'red_SP_F_3.png']
const CardAddHard=['green_D_E_1.png', 'green_D_E_2.png', 'green_D_E_3.png',
 'green_D_F_1.png', 'green_D_F_2.png', 'green_D_F_3.png', 'green_D_S_1.png',
  'green_D_S_2.png', 'green_D_S_3.png', 'green_O_E_1.png', 'green_O_E_2.png',
   'green_O_E_3.png', 'green_O_F_1.png', 'green_O_F_2.png', 'green_O_F_3.png',
   'green_O_S_1.png', 'green_O_S_2.png', 'green_O_S_3.png', 'green_SP_E_1.png',
    'green_SP_E_2.png', 'green_SP_E_3.png', 'green_SP_F_1.png', 'green_SP_F_2.png',
     'green_SP_F_3.png', 'green_SP_S_1.png', 'green_SP_S_2.png', 'green_SP_S_3.png',
      'purple_D_E_1.png', 'purple_D_E_2.png', 'purple_D_E_3.png', 'purple_D_F_1.png',
       'purple_D_F_2.png', 'purple_D_F_3.png', 'purple_D_S_1.png', 'purple_D_S_2.png', 
       'purple_D_S_3.png', 'purple_O_E_1.png', 'purple_O_E_2.png', 'purple_O_E_3.png', 
       'purple_O_F_1.png', 'purple_O_F_2.png', 'purple_O_F_3.png', 'purple_O_S_1.png', 
       'purple_O_S_2.png', 'purple_O_S_3.png', 'purple_SP_E_1.png', 'purple_SP_E_2.png', 
       'purple_SP_E_3.png', 'purple_SP_F_1.png', 'purple_SP_F_2.png', 'purple_SP_F_3.png', 
       'purple_SP_S_1.png', 'purple_SP_S_2.png', 'purple_SP_S_3.png', 'red_D_E_1.png', 
       'red_D_E_2.png', 'red_D_E_3.png', 'red_D_F_1.png', 'red_D_F_2.png', 'red_D_F_3.png',
        'red_D_S_1.png', 'red_D_S_2.png', 'red_D_S_3.png', 'red_O_E_1.png', 'red_O_E_2.png', 
        'red_O_E_3.png', 'red_O_F_1.png', 'red_O_F_2.png', 'red_O_F_3.png', 'red_O_S_1.png',
         'red_O_S_2.png', 'red_O_S_3.png', 'red_SP_E_1.png', 'red_SP_E_2.png', 'red_SP_E_3.png',
          'red_SP_F_1.png', 'red_SP_F_2.png', 'red_SP_F_3.png', 'red_SP_S_1.png', 'red_SP_S_2.png', 
          'red_SP_S_3.png']


//console.log(CardAdd.length);
function randomInteger(min,max) {

    var result = Math.ceil(Math.random() * (max-min)) + min;

   // console.log(result);

    return result;

}
export function findMode()
{
  const options = document.querySelectorAll('input[name="mchoice"]');
  for(const opt of options)
  {
    if(opt.checked)
    {
        return (opt.value);
    }
  }
  return "PRACTICE";
}

function changeMode()
{
  console.log(findMode());
  if(findMode()==="COMPETATIVE")
  {
    if(!state.arePlayersSet){
        state.players=[];
        state.noOfPlayer=10;
       }
    document.querySelector("#hint").style.display="none";
     document.querySelector("#showSet").style.display="none";
    document.querySelector("#hint").style.display="none";
    document.querySelector("#drawCards").style.display="none";
     document.querySelector("#timer").style.display="inline";
  }
  else{
    if(!state.arePlayersSet){
      state.players=[];
      state.noOfPlayer=1;
    }
    document.querySelector("#hint").style.display="inline";
    document.querySelector("#showSet").style.display="inline";
   document.querySelector("#hint").style.display="inline";
    document.querySelector("#drawCards").style.display="inline";
    document.querySelector("#timer").style.display="none";
  }
}
function findDificulty()
{
  const options = document.querySelectorAll('input[name="dchoice"]');
  for(const opt of options)
  {
    if(opt.checked)
    {
        return (opt.value);
    }
  }
  return "ADVANCE";
} 

// Initalite the state for a new game
function initBoard(x,y)
{
  for (let i = 0; i < x; i++) {
    let row = [];
    for (let j = 0; j < y; j++) {
      state.limitPerGame--;
      row.push(new Card());
    }
    state.board.push(row);
  }
}
function initPlayers()
{
  //console.log("in intiPlayerFuncton:",state.players);
  if(!state.arePlayersSet){
    state.players=[];
    //state.playersTurn=[];
  for(let i=0;i<state.noOfPlayer;++i)
  {
    //console.log(" am i adding new players"); 
    state.players.push(new Player(`Player${i+1}`,i));
    //state.playersTurn.push(false);
  }
 // state.playersTurn[0]=true;
  }
}
function initRange()
{
  if(findDificulty()==="EASY")
  {
    state.minRange=0;
    state.maxRange=26;
    state.limitPerGame=27-21;
    console.log("DIFFICULTY: EASY");
  }
  else if(findDificulty()==="HARD")
  {
     state.minRange=0;
     state.maxRange=53;
     state.limitPerGame=54-21;
     console.log("DIFFICULTY: HARD");
  }
  else {
    state.minRange=0;
    state.maxRange=80 ;
    state.limitPerGame=81-21;
    console.log("DIFFUCLTY : ADVANCE");
  }
 
}
export function newGame(row,col) {
  
 //console.log("players before new game: ",state.players);
 //console.log("Player no : "+ state.noOfPlayer );

  state.board = [];
  state.CardsDeck=[];
  state.limitPerGame=27;
  state.selectedIndex=0;
 // state.minRange=0;
 // state.maxRange=80;
  changeMode();
  getcardDeck();
  //console.log(state.noOfPlayer);
  // Initalize the board with empty fields
  initBoard(row,col);
  //Initlize the Players 
  initPlayers();

 // console.log("After Intilizations : ",state.players);
  //Generate a random coordinate for random cards
  initRange();
  shufflCards(row,col);
  }
//A deck of 27 cards consists of cards using a permutation of the three card 
export function getcardDeck()
{
  for(let i=0;i<27;i++)
  {
    var cardinex=randomInteger(state.minRange,state.maxRange);
    state.CardsDeck.push(cardinex);
  }
  console.log(state.CardsDeck);
}
function shufflCards(x,y)
{
  for(let i=0;i<x;i++){
    for(let j=0;j<y;j++){
      var cardinex=randomInteger(state.minRange,state.maxRange);
      fillCard(state.board[i][j],i,j,cardinex);
   
      
    }
  }
  console.log("SHUFFLES DECK:",state.board);
}
function fillCard(card,row,col,cardinex)
{
    let cardsAddArray;
    let pathOfCard;
        if(cardinex>-1){
        card.posX=row;
        card.posY=col;
        
        if(findDificulty()==="EASY"){
          cardsAddArray=CardAddEasy;
          pathOfCard=`./state/cards/Easy/${CardAddEasy[cardinex]}`;
        }
        else
        { 
          cardsAddArray=CardAddHard;
          pathOfCard=`./state/cards/Hard/${CardAddHard[cardinex]}`;  
              }
        card.img=pathOfCard;
        card.name=`${cardsAddArray[cardinex]}`;
        card.color=getColor(cardsAddArray[cardinex]);
        card.number=getNumber(cardsAddArray[cardinex]);
        card.shading=getShading(cardsAddArray[cardinex]);
        card.shape=getShape(cardsAddArray[cardinex]);
        }
        else{
          card.posX=-1;
          card.posY=-1;
          card.name=`blank`;
          card.img=`./state/cards/blank.png`;
          card.color="white";
          card.number="-1";
          card.shading="none";
          card.shape="none";
        }
     
}
function getColor(nameString)
{
  if(nameString.includes("green"))
    return "green";
  if(nameString.includes("red"))
    return "red";
  else if (nameString.includes("purple")){
    return "purple";
  }
  return "white";
}
function getNumber(nameString)
{
  if(nameString.includes("_1"))
    return "1";
  if(nameString.includes("_2"))
    return "2";
  return "3"; 
}
function getShape(nameString)
{
  if(nameString.includes("_O_"))
    return "oval";
 else if(nameString.includes("_SP_"))
    return "squiggle";
  else if(nameString.includes("_D_")){
    return "diamond";
  }
  return "None"; 
}
function getShading(nameString)
{
  if(nameString.includes("_S_"))
    return "striped";
  else if(nameString.includes("_F_"))
    return "solid";
  else if(nameString.includes("_E_")){
    return "outlined"; 
  }
  return "None";
}

function printSelectedCards(cards)
 {
 //  console.log("printing cards");
   for(let i=0;i<cards.length;++i)
   {
 //    console.log(cards[i]);
   }
 }
export function checkSet(Cards){
  var error="";
 // console.log("checking the set");
  printSelectedCards(Cards);
  if(checkColor(Cards)) {
   // console.log("color  same");  
    if(checkShape(Cards)) {
      
   // console.log("shape  same");  
      if(checkShading(Cards)) {
        
   // console.log("shading  same");  
        if(checkNumber(Cards)) {
          
  //  console.log("number  same");  
            //error+=ANSWER.CORRECT;
            return true;
        }//else {error+=ANSWER.NUMBER}
      } //else { error+=ANSWER.shading}
    } ///else{error+=(ANSWER.SHAPE)}
  }//else{error+=(ANSWER.COLOR)}
  
  return false;;
};
function checkColor(cards) {
//  console.log("do i even come here ");
  if(cards[0].color==="white" || cards[1].color==="white" || cards[2].color==="white" )
      {return false;
      }
  if (cards[0].color===cards[1].color && cards[0].color===cards[2].color && cards[1].color===cards[2].color) {
  //  console.log("color is same");
    return true;
  } else if (cards[0].color!==cards[1].color && cards[0].color!==cards[2].color && cards[1].color!==cards[2].color) {
    return true;
  } else {
    return false;
  }
};
function checkShape(cards) {

  if(cards[0].shape==="none" || cards[1].shape==="none" || cards[2].shape==="none" )
  {
    return false;
  }
  if(cards[0].shape===cards[1].shape && cards[0].shape===cards[2].shape && cards[1].shape===cards[2].shape) {
   // console.log("shape is same");
    return true;
  } else if(cards[0].shape!==cards[1].shape && cards[0].shape!==cards[2].shape && cards[1].shape!==cards[2].shape) {
    return true;
  } else {
    return false;
  }
};
function checkShading(cards) {
  if(cards[0].shading==="none" || cards[1].shading==="none" || cards[2].shading==="none" )
      {return false;
      }
  if(cards[0].shading===cards[1].shading && cards[0].shading===cards[2].shading && cards[1].shading===cards[2].shading) {
   // console.log("shading is same");
    return true;
  } else if(cards[0].shading!==cards[1].shading && cards[0].shading!==cards[2].shading && cards[1].shading!==cards[2].shading) {
    return true;
  } else {
    return false;
  }
};

function checkNumber(cards) {
  if(cards[0].number===-1 || cards[1].number===-1 || cards[2].number===-1 )
  {return false;
  }
  if(cards[0].number===cards[1].number && cards[0].number===cards[2].number && cards[1].number===cards[2].number) {
   // console.log("Number is same");
    return true;
  } else if(cards[0].number!==cards[1].number && cards[0].number!==cards[2].number && cards[1].number!==cards[2].number) {
    return true;
  } else {
    return false;
  }
};
 function changeSelectedCards(cards)
{

  for (let i=0;i<cards.length;i++)
  { 
    for(let j=0;j<cards[i].length;j++)
     
      if(cards[i][j].isSelected)
      {
       
        if(state.limitPerGame>=0){
        var cardinex=randomInteger(state.minRange,state.maxRange);
        fillCard(cards[i][j],i,j,cardinex);
        state.limitPerGame--;
        }
        else{
          fillCard(cards[i][j],i,j,-1);
        }

      }
      
    }
  

}
export function ReplaceCards(cards){

        changeSelectedCards(cards);
       
}

 export function numberOfSets (cards) {
 // console.log(cards);
  var count=0;
  var q=0;
  while(cards.length-q >= 3) {
   const  card1=cards[q]; 
    for(let i=q+1;i<cards.length-1;i++) {
     const  card2=cards[i];
      for(let r=i+1;r<cards.length;r++) {
       const  card3=cards[r];
        if  (checkSet([card1, card2, card3])) {
          count++;
        }
      } 
    }
    q+=1;
  }
  //console.log("HOW MANY :",count);
  return(count);
};

export function draw3cards()
{
  var newCards=[];
  for(let k=0;k<3;k++){
    state.limitPerGame--;
  if(state.limitPerGame>=0){
  const cardinex=randomInteger(state.minRange,state.maxRange);
  newCards.push(new Card());
 // console.log("state len",state.board.length);
  fillCard(newCards[k],state.board.length,k,cardinex)
  }
  else{
    RenderMessage("No More Cards in Deck");
  }

  }
 // console.log(newCards)
  return newCards;
}
export function drawASet (cards) {
  var q=0;
  while(cards.length-q >= 3) {
    const card1=cards[q]; 
    for(let i=q+1;i<cards.length-1;i++) { 
     const  card2=cards[i];
      for(let r=i+1;r<cards.length;r++) {
       const  card3=cards[r];
        if  (checkSet([card1, card2, card3])) {
          return [card1, card2, card3];
        }
      } 
    }
    q+=1;
  }
  return([]);
};
