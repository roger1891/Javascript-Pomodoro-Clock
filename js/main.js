$("input[name='sessionLength']").TouchSpin({
   // decimals: 2,
    min: 0,
    max: 120,
    //step: 0.1
});

$("input[name='sessionBreak']").TouchSpin({
   // decimals: 2,
    min: 0,
    max: 30,
    //step: 0.1
});

var $displaySession = $("#displaySession");
var $sessionLength = $("#sessionLength");
var $sessionBreak = $("#sessionBreak");
var progressBar;
var start;
var breakTime;

function minTommss(minutes){
 var sign = minutes < 0 ? "-" : "";
 min = Math.floor(Math.abs(minutes));
 sec = Math.floor((Math.abs(minutes) * 60) % 60);
 return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

var min = 0;
var sec = 0;
var breakBool = false;

function setSessionMin() {
  min = Math.floor(Math.abs($sessionLength.val()));
  return min;
}
function setSessionSec() {
  sec = Math.floor((Math.abs($sessionLength.val()) * 60) % 60);
  return sec;
}

function setBreakSessionMin() {
  min = Math.floor(Math.abs($sessionBreak.val()));
  return min;
}
function setBreakSessionSec() {
  sec = Math.floor((Math.abs($sessionBreak.val()) * 60) % 60);
  return sec;
}


$("#buttonStart").on('click', function(e){
  clearInterval(start);
  setSessionMin();
  setSessionSec();
  
  $displaySession.text((min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec);

  
  var session = function() {
    sec -=1;
    if (min > 0 || sec > 0) {    
      if(sec <= 0) {
         sec = 59;
         min-=1;
      }
      $displaySession.text((min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec);
    }
    if (min == 0 && sec == 0 && breakBool == false) {
      $(".c100, .bar, .c100.p100, .fill").css("border-color", "#d9534f");
      clearInterval(min);
      clearInterval(sec);
      min =  setBreakSessionMin();
      sec =  setBreakSessionSec();
      breakBool = true;
      $displaySession.text((min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec);
      alert('Break Time');
          
    }
    if (min == 0 && sec == 0 && breakBool == true) {
      $(".c100, .bar, .c100.p100, .fill").css("border-color", "#5cb85c");
      clearInterval(start);
      clearInterval(sec);
      min =  0;
      sec = 0; 
      breakBool = false;
      $displaySession.text((min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec);
      alert('Break Time Is Over!');
    }  
  }
   
  
  start = setInterval(session, 1000);
  

});

$("#buttonReset").on('click', function(e){
  clearInterval(start);
  $(".c100, .bar, .c100.p100, .fill").css("border-color", "#5cb85c");
  setSessionMin();
  setSessionSec();
  $displaySession.text((min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec);

});