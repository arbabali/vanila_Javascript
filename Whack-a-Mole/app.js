//selection all divs 

const square = document.querySelectorAll('.square');

const mole = document.querySelectorAll('.mole');

const timeLleft = document.querySelector("#time-left");

let score = document.querySelector("#score");

let result =0;
let currentTime=timeLleft.textContent;
function randomSquare()
{
    square.forEach(className => {
        className.classList.remove('mole');
    })

    
  let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole');

    hitPostion = randomPosition.id;
}
function putBack()
{
    square.forEach(className => {
    className.classList.remove('moleOnClick');
})
}


  

square.forEach(id=>{
    id.addEventListener('mouseup',()=>{
        if(id.id===hitPostion)
        {
            
            result=result+1;
            
            id.classList.add('moleOnClick');
            
            score.textContent=result;
            hitPostion=null;
            
        }
    })
})

function showReka()
{
    let timer2id=null;
    timer2id=setInterval(putBack,500);
}
function moveMole()
{
    let timerId = null;
    showReka();
    timerId= setInterval(randomSquare,900);

}

moveMole()
function countDown()
{
    currentTime--;
    timeLleft.textContent=currentTime;
    if(currentTime===0)
    {
        clearInterval(timerId);
        alert("GAME OVER , YOUR FINAL SCORE is "+ result);
    }
}
let timerId=setInterval(countDown,1000);
