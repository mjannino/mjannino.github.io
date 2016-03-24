

//Controller stuff
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


function resetValues(player){

  player.hand = []; 
  player.hasAce = false;
  player.scoreHigh = 0;
  player.scoreLow = 0;
  player.aceLowOrHigh = 1; //1 is low, 11 is high
  player.turn = 1;  

}

function calculatePlayerScore(player){

  var i = 0;
  var high = 0;
  var low = 0;
  var handLength = player.hand.length;
  
  for(i = 0; i < handLength; i++){
      if(player.hand[i].cardValue == 1){
        high += 11;
        low += 1;
      }else{
        high += player.hand[i].cardValue;
        low += player.hand[i].cardValue;
      }
   }
   
  player.scoreHigh = high;
  player.scoreLow = low;     

 

}

function dealerDecide(dealer){ 
//set up in this manner so that you can operate on different things, leaves room for AI

  //this function with make the dealer decisions
  //should ace be high or low? do i need to hit or stay?
  //this will take up exactly one turn 
  //if under 17 in certain cases, must hit
  //if advantageous not to hit and stay between 18-21, stay
  //etc

  var high = dealer.scoreHigh;
  var low = dealer.scoreLow;

  if(dealer.hasAce == true){
    calculatePlayerScore(dealer);
    if(dealer.scoreLow == 21){
      dealer.aceLowOrHigh = 1;
      dealer.turn +=1;
      return;
    }else if(dealer.scoreHigh == 21){
      dealer.aceLowOrHigh = 11;
      dealer.turn +=1;
      return;
    }
  }

  while(whoWins(player, dealer) == 'Inc'){

    if(high <= 17){
      //hit
      dealer.dealTo(gameDeck.deal());
      dealer.turn += 1;
      dealer.aceLowOrHigh = 11;
    }else if(high > 17 && high <= 21){
      //stay, ace high
      dealer.aceLowOrHigh = 11;
    }else if(low < 17){
      //hit
      dealer.dealTo(gameDeck.deal());
      dealer.turn += 1;
      dealer.aceLowOrHigh = 1;
    }else if(low >= 17 && high <= 21){
      //stay, ace low
      dealer.aceLowOrHigh = 1;
    }else{
      //stay, you have most likely lost
      dealer.aceLowOrHigh = 1;
    }
  calculatePlayerScore(dealer);
  }

}

function whoWins(player, dealer){

  var pScore = 0;
  var dScore = 0;


  if(player.hasAce){
    if(player.aceLowOrHigh == 1){
      pScore = player.scoreLow;
    }else{
      pScore = player.scoreHigh;
    }
  }else{
    pScore = player.scoreHigh;
  }

  if(dealer.hasAce){
    if(dealer.aceLowOrHigh == 1){
      dScore = dealer.scoreLow;
    }else{
      dScore = dealer.scoreHigh;
    }
  }else{
    dScore = dealer.scoreHigh;
  }

  //case handling

  //incrementing the dealers turn so that the 
  //display of the hand is complete 




  if(pScore > 21 && dScore <= 21){
    dealer.turn += 1;
    return 'Dealer';
  }else if(dScore > 21 && pScore <= 21){
    return 'Player';
  }else if(dScore > 21 && pScore > 21){
    dealer.turn += 1;
    return 'Dealer'; //house edge
  }else if(dScore > 17 && pScore <= 21 && pScore > dScore){
    return 'Player';
  }else if(dScore <= 17){
    return 'Inc';
  }else if(pScore == dScore){
    return 'Tie';
  }else if(pScore > dScore){
    return 'Player';
  }else{
    return 'Dealer'; 
  }

}







function playBtn(){

  //instantiate everything

  player = new Player("You");      //Global variables by necessity, utilizing hoisting
  dealer = new Player("Dealer");   //Time constraints, mutable objects
  gameDeck = new Deck;             //Accessible by all, essentially model data
  //This was why I was alright with them being global

  showNewTotalScore();

  gameDeck.populate();
  gameDeck.shuffle();

  dealer.turn = 1;

  showDeal(); //view method

}



function dealBtn(){

    //deal hands


  dealer.dealTo(gameDeck.deal());
  player.dealTo(gameDeck.deal());
  dealer.dealTo(gameDeck.deal());
  player.dealTo(gameDeck.deal());

  //calculate scores

  calculatePlayerScore(player);
  calculatePlayerScore(dealer);

  //No dealer decision
  //see if there is a natural 21

  var winner = whoWins(player, dealer);

  if(winner == 'Inc'){
    showHitStay();
  }else if(winner == 'Tie'){
    showTie();
    totalScore.update(5);
    showNewTotalScore();
  }else if(winner == 'Player'){
    showWinner(player);
    totalScore.update(10);
    showNewTotalScore();
  }else if(winner == 'Dealer'){
    showWinner(dealer);
    totalScore.update(-10);
    showNewTotalScore();
  }
  

  //we will now be at the hit stay screen. during a hit, dealerdecide, calculate score

}



function hitBtn(){

  player.dealTo(gameDeck.deal());  

  calculatePlayerScore(player);
  calculatePlayerScore(dealer);

  var winner = whoWins(player, dealer);

  if(winner == 'Dealer'){
    dealerDecide(dealer);
    calculatePlayerScore(dealer);
    winner = whoWins(player, dealer);
  }

  if(winner == 'Inc'){
    showHitStay();
  }else if(winner == 'Tie'){
    showTie();
    totalScore.update(5);
  }else if(winner == 'Player'){
    showWinner(player);
    totalScore.update(10);
  }else if(winner == 'Dealer'){
    showWinner(dealer);
    totalScore.update(-10);
  }


}

function stayBtn(){

  dealerDecide(dealer); //this is dealer's Turn

  calculatePlayerScore(player);
  calculatePlayerScore(dealer);

  var winner = whoWins(player, dealer);

  if(winner == 'Tie'){
    showTie();
    totalScore.update(5);
  }else if(winner == 'Player'){
    showWinner(player);
    totalScore.update(10);
  }else if(winner == 'Dealer'){
    showWinner(dealer);
    totalScore.update(-10);
  }


}

function toggleAceBtn(){
  var flag = player.aceLowOrHigh;

  if(flag == 1){
    player.setAceChoice(11);
  }else if(flag == 11){
    player.setAceChoice(1);
  }

}

function playAgainBtn(){
  resetValues(player);
  resetValues(dealer);
  showRestart();
}
