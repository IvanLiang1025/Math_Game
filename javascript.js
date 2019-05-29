var playing = false;
var score;
var timeLeft;
var timeout;
var time;
var correctAns;
var correctBox;

//click on the start/reset button
document.getElementById("startreset").onclick=function(){
    if (playing==true){
        location.reload();
    }else{
        playing = true;
    
        hide("gameover");
        
        //set score:
        score = 0;
        document.getElementById("scorevalue").innerHTML=score;
        
        //change start button content.
        document.getElementById("startreset").innerHTML="Reset Game";
        
        //display time
        time=10;
        show("timeremaining");
        document.getElementById("timevalue").innerHTML = time;

        //Start counter
        startCounter();
        
        //generate questions and answers
        generateQA();
        
        //click answer;
        clickOnAnswers();
      
    }
}

function clickOnAnswers(){
    for(i=1; i<5; i++){
        document.getElementById("box"+i).onclick=function(){
            if(playing==true){
                if(this.innerHTML == correctAns){
                    score +=1;
                    document.getElementById("scorevalue").innerHTML=score;
                    hide("wrong");
                    show("correct");
                    setTimeout(function(){hide("correct")},1000);
                    generateQA();
                }else{
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){hide("wrong")},1000);
                }    
            }
        }
    }   
}


function startCounter(){
        timeLeft = setInterval(function(){
            time -=1;
            document.getElementById("timevalue").innerHTML=time;
            if(time==0){
                endInterval();
                show("gameover");
                document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>"; 
                hide("timeremaining");
                hide("wrong");
                hide("correct");
                playing=false;  
                document.getElementById("startreset").innerHTML="Start Game";
            }
        },1000);
}

//function startCounter(){
//    var timeValue= document.getElementById("timevalue");
//    timeLeft = setInterval(function(){time--; timeValue.innerHTML = time;},1000);
//    timeout = setTimeout(function(){showGameOver();},10000);
//}
//
//function showGameOver(){
//    show("gameover");
//    document.getElementById("gameover").innerHTML = "<p>111 Game Over!</p><p>Your score is " 
//        + score + ".</p>" ;
//    hide("timeremaining");
//    endInterval();
////       
//}

function endInterval(){
    clearInterval(timeLeft);
}
function endTimeout(){
    clearTimeout(timeout);
}

function hide(Id){
    document.getElementById(Id).style.display ="none";
}

function show(Id){
    document.getElementById(Id).style.display ="block";
}

function generateQA(){
    var a, b;
    var answers = new Array(4);
    a=1+Math.round(Math.random()*9);
    b=1+Math.round(Math.random()*9);
    correctAns = a*b;
//    window.alert(a+" " +b);
    document.getElementById("question").innerHTML=a + "*" + b;
    
    correctBox= 1+Math.round(Math.random()*3);
   
//    
//    
    //generate answers array.
    for(var i=1; i<5; i++){
        if(i!=correctBox){
            var ans;
            do{
                ans=Math.round(Math.random()*99)+1;
            
            }while(answers.indexOf(ans)>-1)   
            answers[i-1] = ans;
//            ans= Math.round(Math.random()*99) + 1;
//            if(ans!=correctAns){
//                answers[i-1] = ans;
//            }else{
//                answers[i-1] = Math.round(ans*0.9);
//            }
        }else{
            answers[correctBox-1] = correctAns;
        }
    }
    
//    for(var i=0; i<answers.length; i++){
//        window.alert(answers[i]);
//    }
    //display answers
    for(var i=0; i<4; i++){
        if((i+1)!= correctBox){
            document.getElementById("box"+(i+1)).innerHTML=answers[i];   
        }else{
            document.getElementById("box"+correctBox).innerHTML= correctAns;
        }
    }
    
}








