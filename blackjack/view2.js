
//First View Stuff!!!!!

  //VIEW//////////////////////////////////
  //displayPlayerHand+
  //displayDealerHand+
  //winScreen+
  //quitGame+
  //displayNewScore+

window.onload = addListeners;

function addListeners(){

  document.getElementById('play-btn').addEventListener("click", playBtn, false);
  document.getElementById('deal-btn').addEventListener("click", dealBtn, false);
  document.getElementById('hit-btn').addEventListener("click", hitBtn, false);
  document.getElementById('stay-btn').addEventListener("click", stayBtn, false);
  document.getElementById('toggle-ace-btn').addEventListener("click", toggleAceBtn, false);
  document.getElementById('play-again-btn').addEventListener("click", playAgainBtn, false);
  totalScore = new overallScore();

}


function displayPlayerHand(player){

    //PLAYER////////////////////////////////
  //hand, hasAce, scoreHigh, scoreLow, aceLowOrHigh
  //dealTo(card), getScore()
  //getHand

  var i = 0;
  var playerHand = player.hand;

  console.log("-------------");
  console.log("Player hand: ")

  for(i = 0; i < playerHand.length; i++){
    console.log(playerHand[i].name() + ", ");
  }

  if(player.hasAce){
    if(player.aceLowOrHigh == 1){
      console.log("Hand Score: " + player.scoreLow);
    }else{
      console.log("Hand Score: " + player.scoreHigh);
    }
  }else{
    console.log("Hand score: " + player.scoreHigh);
  }

  console.log("-------------");

}

function displayDealerHand(dealer){

  //displays the dealers hand. if it's the first turn, it only displays the first card.
  //else, it displays the entire hand up until that point.

  var i = 0;
  var dealerHand = dealer.hand;


  console.log("-------------");
  console.log("Dealer hand: ");


  if(dealer.turn == 1){
    console.log(dealerHand[0].name() + ", -FACEDOWN CARD-");
  }else{
    for(i = 0; i < dealerHand.length; i++){
      console.log(dealerHand[i].name() + ", ")
      displayDealerScore(dealer);
    }
  }

  console.log("-------------");

}

function displayDealerScore(dealer){

  if(dealer.aceLowOrHigh == 1){
    console.log("Dealer score:" + dealer.scoreLow);
  }else if(dealer.aceLowOrHigh == 11){
    console.log("Dealer score: " + dealer.scoreHigh);
  }

}

////DOM MANIPULATION

function showNewTotalScore(){
  var scoreDiv = document.getElementById('overall-score');

  scoreDiv.innerHTML = '';
  scoreDiv.innerHTML = totalScore.total;
}


function showDeal(){

  var playButton = document.getElementById('play-button');
  var dealButton = document.getElementById('deal-button');


  //when this  is called, the play button is showing, nothing else is showing
  //only need to move to 'deal' button, and maybe add stuff to player and dealer

  playButton.style.display = 'none';
  dealButton.style.display = 'inline-block';


}


function showHitStay(){

  var dealButton = document.getElementById('deal-button');
  var hitButton = document.getElementById('hit-button');
  var stayButton = document.getElementById('stay-button');


  //when this is called player will have a hand, dealer will have a hand
  //hit old buttons, make sure hit and stay are visible
  //this will probably only fire when 'deal' is pressed

  dealButton.style.display = 'none';
  hitButton.style.display = 'inline-block';
  stayButton.style.display = 'inline-block';

  displayPlayerHand(player);
  displayDealerHand(dealer);

}

function showWinner(winner){


  //when this is fired, someone will have won. you can't hit or stay, so this is changing to play again or quit
  //final score will have been shown already, just update the dom so that the hands are empty and the winner is show 
  //in one of the dom elements as well as the two buttons needed

  var dealButton = document.getElementById('deal-button');
  var hitButton = document.getElementById('hit-button');
  var stayButton = document.getElementById('stay-button');
  var playAgainButton = document.getElementById('play-again-button');

  dealButton.style.display = 'none';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  playAgainButton.style.display = 'inline-block';

  showNewTotalScore();

  displayDealerHand(dealer);
  displayPlayerHand(player);

  console.log("############################");

  console.log("The winner is: " + winner.name);
  console.log("############################");
}

function showTie(){

  //when this is fired, tie

  var hitButton = document.getElementById('hit-button');
  var stayButton = document.getElementById('stay-button');
  var playAgainButton = document.getElementById('play-again-button');

  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  playAgainButton.style.display = 'inline-block';

  showNewTotalScore();

  displayDealerHand(dealer);
  displayPlayerHand(player);

  console.log("############################");
  console.log("Tie game!");
  console.log("############################");


}

function showRestart(){

  //this function is called when the view needs to be reset, aka after Quit is pressed

  var playAgainButton = document.getElementById('play-again-button');
  var playButton = document.getElementById('play-button');

  showNewTotalScore();

  playAgainButton.style.display = 'none';
  playButton.style.display = 'inline-block';


}
