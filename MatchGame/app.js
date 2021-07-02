
const cardArray=[
 
    {
        name:'fries',
        img:'images/fries.png'
    },
    {
        name:'fries',
        img:'images/fries.png'
    },
   
    {
        name:'chesseburger',
        img:'images/chesseburger.png'
    },
    {
        name:'chesseburger',
        img:'images/chesseburger.png'
    },
    {
        name:'hotdog',
        img:'images/hotdog.png'
    },
    {
        name:'hotdog',
        img:'images/hotdog.png'
    },
    {
        name:'ice-cream',
        img:'images/ice-cream.png'
    },
    {
        name:'ice-cream',
        img:'images/ice-cream.png'
    },
    {
        name:'milkshake',
        img:'images/milkshake.png'
    },
    {
        name:'milkshake',
        img:'images/milkshake.png'
    },
    {
        name:'pizza',
        img:'images/pizza.png'
    },
    {
        name:'pizza',
        img:'images/pizza.png'
    }
    
]

//Creat your boad
cardArray.sort(()=>0.5-Math.random());
 
//const grid=document.querySelector(".grid");
document.addEventListener('DOMContentLoaded',createBoard);

var cardsChosen=[];
var chardsChosenId=[];
var chardWon=[];
    
 //check for matches
 function checkForMatch()
 {
     

     var cards=document.querySelectorAll("img");
    console.log(cards);
    console.log(cardsChosenId);
     const optionOneId = chardsChosenId[0];
     const optionTwoId = chardsChosenId[1];
    console.log(optionOneId+optionTwoId);
    if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!')
      }
     if(cardsChosen[0]===cardsChosen[1])
     {
         alert("YOU FOUND A MATCH");
         cards[optionOneId].setAttribute('src','images/white.png');
         cards[optionTwoId].setAttribute('src','images/white.png');
         cards[optionOneId].removeEventListener('click', flipCard)
         cards[optionTwoId].removeEventListener('click', flipCard)
         cardsWon.push(cardsChosen)
         
     } else {
 
         cards[optionOneId].setAttribute('src','images/blank.png');
         cards[optionTwoId].setAttribute('src','images/blank.png');
         alert("Sorry , try again");
     }
 
     cardsChosen=[]
     chardsChosenId=[]
     resultDisplay.textContent=cardsWon.length;
     if(cardsWon.length===cardArray.length/2)
     {
         resultDisplay.textContent="CONGRATULATIONS ! YOU FOUND THEM ALL ";
         alert("YOU WON THE GAME");
     }
 }
 
 //filp card
     function filpCard()
     {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        chardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length ===2) {
          setTimeout(checkForMatch, 500)
        }
 
     }
  
function createBoard()
   {
    
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector("#result");
    console.log(grid);
       console.log("INVOKED ");
    for (let i=0;i<cardArray.length;i++)
    {
        var card=document.createElement('img');
           card.setAttribute('src','images/blank.png');
           card.setAttribute('data-id',i);
           card.addEventListener('click',filpCard);
           grid.appendChild(card);
    }  
   }
   
 
document.addEventListener('DOMContentLoaded',createBoard);
