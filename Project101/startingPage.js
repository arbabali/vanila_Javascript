



 function setPlayerButtonListener()
{
    
const setPlayerBody=document.querySelector("#setPlayer-body");
 setPlayerBody.classList.toggle("textHide");
 
}
 function RulesButtonListener() {
   
    const ruleContent = document.querySelector("#textRules");
 // console.log(" im here ");
 ruleContent.classList.toggle("textHide");
} 

function openRulesWindow () {
  document.getElementById("rules-outer").style.display = "block";
  document.getElementById("rules-inner").style.display = "block";
};

 function ReadHereButtonListener()
{
    document.querySelector("#Textbody").classList.toggle("textHide");
    openRulesWindow ()
  }

 
function closeRulesWindow  () {
  document.getElementById("rules-outer").style.display = "none";
  document.getElementById("rules-inner").style.display = "none";
};

function creditsButtonHanndle()
{
  console.log(" im here");
  document.querySelector("#credit").classList.toggle("textHide");
 document.getElementById("credit-outer").style.display = "block";
 document.getElementById("credit-inner").style.display = "block";

}
function closeCreditWindow  () {
  document.getElementById("credit-outer").style.display = "none";
  document.getElementById("credit-inner").style.display = "none";
};
function handleGameButtonListener()
{
  const element=document.querySelector("#modeCHOICES");
  toggleDisplay(element);
 }
function handleDifficultyButton()
{
 const element=document.querySelector("#diffCHOICES");
 toggleDisplay(element);

}
function toggleDisplay(x)
{
 if (x.style.display === "none") {
   x.style.display = "block";
 } else {
   x.style.display = "none";
 }

}     
   
export function StartingButtons ()
{
   
      
const setPlayerButton=document.querySelector("#setPlayer-button");
const ruleButton=document.querySelector("#rulesButton");
const readHereButton=document.querySelector("#readHereButton");
const closeRuleButton=document.querySelector("#closeButton");
const  closeRuleOuter=document.querySelector("#rules-outer");
const gameModeButton=document.querySelector("#gameMode-button");
const difficultyButton=document.querySelector("#Diffbutton");
const creditButton=document.querySelector("#credits-button");
const closeCreditButton =document.querySelector("#creditcloseButton");

closeCreditButton.addEventListener("click",closeCreditWindow);
creditButton.addEventListener("click",creditsButtonHanndle);
difficultyButton.addEventListener("click",handleDifficultyButton);
gameModeButton.addEventListener("click",handleGameButtonListener);
closeRuleButton.addEventListener("click", closeRulesWindow);
closeRuleOuter.addEventListener("click", closeRulesWindow);
setPlayerButton.addEventListener("click",setPlayerButtonListener);
readHereButton.addEventListener("click",ReadHereButtonListener);
ruleButton.addEventListener("click",RulesButtonListener);

}