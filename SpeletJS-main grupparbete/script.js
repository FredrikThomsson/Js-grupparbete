var timer;
var selectedTime;
const restartButton = document.getElementById("restart");
let timeoutId;

document.addEventListener('DOMContentLoaded', function () {
 
  const cards = document.querySelectorAll('.card');
  let flippedCards = [];
 
  cards.forEach(card => card.addEventListener('click', flipCard));
 
  function flipCard() {
 
    const frontView = this.querySelector('.front-view');
    const backView = this.querySelector('.back-view');
 
        // Kontrollera om kortet redan är vänt
        if (frontView.style.display === 'none') {
          return; // Avbryt om kortet redan är vänt
        }
 
    // Visa baksidan och dölj framsidan
    frontView.style.display = 'none';
    backView.style.display = 'block';
 
    // Lägg till det vända kortet i arrayen
    flippedCards.push(this);
 
    // Kontrollera om två kort har vänts
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }

 
  }
  function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.img-back6').src;
    const img2 = card2.querySelector('.img-back1').src;

    if (img1 === img2) {
      // Matchning: lägg till klassen för matchade kort
      card1.classList.add('matched');
      card2.classList.add('matched');

      // Kontrollera om alla kort har matchats
      if (document.querySelectorAll('.matched').length === cards.length) {
        alert('Congratulations! You matched all the cards.');
      }
    } else {
      // Ingen matchning: vänd tillbaka korten
      setTimeout(() => {
        card1.querySelector('.front-view').style.display = 'block';
        card1.querySelector('.back-view').style.display = 'none';
        card2.querySelector('.front-view').style.display = 'block';
        card2.querySelector('.back-view').style.display = 'none';
      }, 500);
    }

    // Återställ flippedCards-arrayen
    flippedCards = [];
}
});

function updateTime() {
    
    var dropdown = document.getElementById("timeDropdown");

        // Kollar om timern är igång
        if (timer) {
            clearInterval(timer);
        }

    // uppdaterar den valda tiden
    selectedTime = dropdown.options[dropdown.selectedIndex].value;

    // uppdaterar valda tiden i .details och .time
    var detailsParagraph = document.querySelector(".details .time span b");
    if (detailsParagraph) {
        detailsParagraph.innerText = selectedTime + "s";
    }
}

function startOm() {
  clearInterval(timer);
  clearInterval(timeoutId); 
  startTimer();

  const frontViews = document.querySelectorAll('.front-view');
  const backViews = document.querySelectorAll('.back-view');

  frontViews.forEach(view => {
    view.style.display = 'block';
  });

  backViews.forEach(view => {
    view.style.display = 'none';
  });
}



function startTimer() {

    var timeLeft = selectedTime;
    timer = setInterval(function () {
        // räknar ner tiden
        timeLeft--;

        // uppdaterar tiden som är kvar
        var detailsParagraph = document.querySelector(".details .time span b");
        if (detailsParagraph) {
            detailsParagraph.innerText = timeLeft + "s";
        }

        // när tiden når 0 skrivs game over
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Game over");
        }
    }, 1000); // hur snabbt nedräkningen sker
}


updateTime();
startTimer();