/BOARD/ 
let gboard=document.querySelector('#gcontainer');
let ctx=gboard.getContext("2d");
let height=gboard.height;
let width=gboard.width;
let backgroundcolor="black";
let gameLost=true;
let enterPressedOnce=false;
let gamestartFirstTime=true;

/PADDLE/ 
let paddlecolor="red";
let paddleborder="blue";
let paddleSpeed = 40;
let id;

/MUSIC SECION/ 
let paddlehit = new Audio('ballHitPaddle.mp3');
let lost= new Audio('lost.mp3');
let theme= new Audio('theme.mp3');


/BALL/ 
let ballradius=7;
let ballX = width / 2;
let ballY = height / 2;
let balldirectionx=0;
let balldirectiony=0;
let ballspeed;
/BALL/ 


//RESET/
let resetbutton=document.getElementById("reset");
resetbutton.addEventListener("click", function(){
location.reload(); 
startGame();
});

//SCORE
  
let score1 = document.getElementById("update").innerText; 
console.log(score1);

localStorage.setItem("hscore",0);

/PADDLE OBJECT-1/ 
let pad1={
   height:10,
   width:80,
   x:width/2-30,
   y:0,
};

/PADDLE OBJECT-2/
let pad2={
   height:10,
   width:80,
   x:width/2-30,
   y:height-10,
};



/FUNCTION TO START THE GAME/ 
function startGame(){
   if(gamestartFirstTime){
      alert("Use Arrow Keys in keyboard for Padlle Movement");
      alert("Press Enter to Start the Game. All the Best!!!!");
      gamestartFirstTime=false;
   }
   theme.play();
   createBall();
   startSequence();
   
}

startGame();

function startSequence(){
   id=setTimeout(function(){
     /CALL TO ALL THE FUNCTIONS CREATED SO FAR/ 
      clear();
      drawPaddles();
      if(!gameLost){
      moveBall();}
      checkcollision();
      drawBall(ballX, ballY);
      if(!gameLost){
      
      startSequence();}
   }, 4);

   
}


/PADDLE MOVEMENTS/ 
document.addEventListener("keydown", function(event){
   console.log(event.key);
  
      
      // console.log(pad1.x);

      
      if(event.key=='ArrowLeft' && pad1.x>0){
      pad1.x=pad1.x-20;
      pad2.x=pad2.x-20;
      // drawboard();
      console.log(pad1.x);}
      
      if(event.key=='ArrowRight' && pad1.x<440){
      pad1.x=pad1.x+20;
      pad2.x=pad2.x+20;
      // drawboard();
      console.log(pad1.x);}

      if(event.key=='Enter' && !enterPressedOnce){
         startGame();
         enterPressedOnce=true;
         gameLost=false;
      }
    
   
});



/PADDLE DRAW/ 
function drawPaddles(){
    ctx.strokeStyle = paddleborder;

    ctx.fillStyle = paddlecolor;
    ctx.fillRect(pad1.x, pad1.y, pad1.width, pad1.height);
    ctx.strokeRect(pad1.x, pad1.y, pad1.width, pad1.height);

    ctx.fillStyle = paddlecolor;
    ctx.fillRect(pad2.x, pad2.y, pad2.width, pad2.height);
    ctx.strokeRect(pad2.x, pad2.y, pad2.width, pad2.height);
   
}

/CREATE BALL IN HTML 5 CANVAS/ 
function createBall(){
   ballspeed=1;
   ballX = width / 2;
   ballY = height / 2;
   balldirectionx=-1;
   balldirectiony=1;
   drawBall(ballX,ballY);
}

/MOVEMENT OF BALL/
function moveBall(){
   
    ballX += (ballspeed * balldirectionx);
    ballY += (ballspeed * balldirectiony);
}

function drawBall(ballX, ballY){
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballradius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

}

function clear(){
ctx.fillStyle=backgroundcolor;
ctx.fillRect(0, 0, width, height);
   
}


/NOT REQUIRED NOW/ 
function reset(){
   pad1={
   height:10,
   width:80,
   x:width/2-30,
   y:0,
};

   pad2={
   height:10,
   width:80,
   x:width/2-30,
   y:height-10,
};

}





function checkcollision(){
   /SIDE WALLS COLLISION AND BOUNCE BACK/ 
   if(ballX<=0+ballradius){
      updateScore();
      balldirectionx*=-1;}

   if(ballX>=width-ballradius){
      updateScore();
      balldirectionx*=-1;}

   /PADDLE COULD NOT SAVE THE BALL/ 
   if(ballY<=0){
      theme.pause();
      theme.currentTime = 0;
      lost.play();
      gameLost=true;
      score1=0;
      updateScore();
      createBall();
      enterPressedOnce=false;
      return;}

   if(ballY>=height){
      theme.pause();
      theme.currentTime = 0;
      lost.play();
      gameLost=true;
       score1=0;
      updateScore();
      createBall();
      enterPressedOnce=false;
      return;}

   /PADDLE SAVES THE BALLL/ 
  
    console.log("BALL Y= "+ballY+"  pad2.y +pad2.height+ballradius=  "+ pad2.y);
   if(ballY+ballradius >= (pad2.y)){
      console.log("BALL-SAVE-1");
        if(ballX >= pad2.x-20 && ballX <= (pad2.x + pad2.width+2)){
           console.log("BALL-SAVE-2");
            ballx = (pad2.x + pad2.height) + ballradius; // if ball gets stuck
           paddlehit.play();
           ballspeed+=0.10;
           balldirectiony *= -1;
           score1++;
           updateScore();
        }
    }

   if(ballY <= (10+ballradius)){
      if(ballX-2 >= pad1.x-20 && ballX <= (pad1.x + pad1.width+2)){
      ballx = (pad2.x + pad2.height) + ballradius;   
      paddlehit.play(); 
      ballspeed+=0.10;  
      balldirectiony *= -1;
      score1++;
      updateScore();   
      }
}}

function updateScore(){
 let highScoreSoFar=localStorage.getItem("hscore");
 if(score1>highScoreSoFar){
    localStorage.setItem("hscore",score1);}
document.getElementById("intro").innerText="HIGHEST SCORE SO FAR: "+highScoreSoFar;  
document.getElementById("update").innerText=score1;
   
}
