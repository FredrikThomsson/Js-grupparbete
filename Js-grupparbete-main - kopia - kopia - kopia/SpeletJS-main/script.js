var timer;
var selectedTime;
const restartButton = document.getElementById("restart");

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
   
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