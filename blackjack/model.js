//Begin Model Stuff


function overallScore(){
  this.total = 0;

  this.update = function(newscore){
    this.total += newscore;
  }
}

function Player(name){
    
    this.hand = []; 
    this.hasAce = false;
    this.scoreHigh = 0;
    this.scoreLow = 0;
    this.aceLowOrHigh = 1; //1 is low, 11 is high
    this.name = name;
    this.turn = 1;
    

    this.dealTo = function(card){
      this.hand.push(card);
      if(card.value == 1) hasAce = true;    
    }


    this.handLength = function(){
      return this.hand.length;
    }

    this.getHand = function(){
      return this.hand;
    }
    
    
    
    this.getScore = function(){

      if(this.aceLowOrHigh == 1){
        return this.scoreLow;
      }else if(this.aceLowOrHigh == 11){
        return this.scoreHigh;
      }

    }
    
    this.setAceChoice = function(choice){  //use: 1 if ace low, 11 if ace high
      this.aceLowOrHigh = choice;
    }
           
    
}


function Card(suit, rank, value, passClass){
    //suit, rank
    this.suit = suit;
    this.rank = rank;
    this.cardValue = value;
    this.srcName = passClass;
}

Card.prototype.name =  function(){
      return this.rank + " of " + this.suit;
}

//defined as a prototype to lessen amount of functions defined when instantiation occurs




function Deck() {

    this.cards = [];
    
    this.populate = function(){  
      var i = 0;
      var suit = "";
      var indexRoot = 0;
      
      for(i = 0; i < 4; i++){
             
        //0-12
        //13-25
        //26-38
        //39-51
        
        if(i == 0){
          suit = "Spades";
          indexRoot = 0;
        }else if(i == 1){
          suit = "Hearts";
          indexRoot = 13;
        }else if(i == 2){
          suit = "Clubs";
          indexRoot = 26;
        }else if(i == 3){
          suit = "Diamonds";
          indexRoot = 39;
        }
        
          this.cards[indexRoot+0] = new Card(suit, "Ace", 1, 'ace'+suit); //aka aceClubs is the fourth attribute
          this.cards[indexRoot+1] = new Card(suit, "2", 2, 'two'+suit);
          this.cards[indexRoot+2] = new Card(suit, "3", 3, 'three'+suit);
          this.cards[indexRoot+3] = new Card(suit, "4", 4, 'four'+suit);
          this.cards[indexRoot+4] = new Card(suit, "5", 5, 'five'+suit);
          this.cards[indexRoot+5] = new Card(suit, "6", 6, 'six'+suit);
          this.cards[indexRoot+6] = new Card(suit, "7", 7, 'seven'+suit);
          this.cards[indexRoot+7] = new Card(suit, "8", 8, 'eight'+suit);
          this.cards[indexRoot+8] = new Card(suit, "9", 9, 'nine'+suit);
          this.cards[indexRoot+9] = new Card(suit, "10", 10, 'ten'+suit);
          this.cards[indexRoot+10] = new Card(suit, "Jack", 10, 'jack'+suit);
          this.cards[indexRoot+11] = new Card(suit, "Queen", 10, 'queen'+suit);
          this.cards[indexRoot+12] = new Card(suit, "King", 10, 'king'+suit);
        
      }
    }
    
    this.shuffle = function(){
    //shuffle algorithm is simply the fisher-yates in-place shuffle algorithm using Math lib
      for (var i = 52 - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = this.cards[i];
          this.cards[i] = this.cards[j];
          this.cards[j] = temp;
      }    
    }
    
    this.deal = function(){ 
        return this.cards.pop();
    }
    
    this.size = this.cards.length;

}