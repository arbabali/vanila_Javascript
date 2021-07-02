//const cardArray=[ ];

//for(let i=0;i<80;i++)
//{
//    cardArray.push({name:`${i}`,img:`cards/${i}.png`})
//}
//cardArray.sort(()=>0.5-Math.random());
//The goal of the game is to find SETs of three cards from the twelve cards placed on the desk. All cards have four properties:

  //  SHAPE: oval, squiggle, diamond
   // COLOR: red, green, purlple
   // NUMBER: 1,2, or 3 shapes
    //SHADING: solid, striped or outlined shapes (only used in the subtasks for bonus points)
//ENUM LIKE DAT STRUCTURES 

export class Card{
     name="";
     img="cards/";
    posX=0;
    posY=0;
    color;
    number;
    shading;
    shape;
     isSelected=false;
     isVisible=false;
    
}
export class Player{
     name="player";
     score=0;
     //number=0;

     constructor(name){
          this.name=name;
          //this.number=numer;
          this.score=0;
     }
}