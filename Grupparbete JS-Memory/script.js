var timer;
var selectedTime;
const restartButton = document.getElementById("restart");






document.addEventListener('DOMContentLoaded', async function () {
 

 
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const response = await fetch('https://raw.githubusercontent.com/FredrikThomsson/JSON-Images/main/images.json');
const data = await response.json();
console.log(data);


if (data.images && data.images.length > 0) {
    const cardImages = data.images.map(image => image.url);

    const firstSixImages = cardImages.slice(0, 6);


    const shuffledImages = shuffleArray(firstSixImages);

    const cardElements = document.querySelectorAll('.img-back');
    const frontElements = document.querySelectorAll('.img-front');

    cardElements.forEach((card, index) => {
        card.src = shuffledImages[index % shuffledImages.length];
    });

    frontElements.forEach(front => {
        front.src = 'img/qmark.png';
    });
}
 
  const points = document.getElementById("points");
  pointsCount = 0;

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
    const img1 = card1.querySelector('.img-back').src;
    const img2 = card2.querySelector('.img-back').src;
 
    if (img1 === img2) {
      // Matchning: lägg till klassen för matchade kort
      card1.classList.add('matched');
      card2.classList.add('matched');
      points.innerHTML = pointsCount + 1;
      pointsCount ++;
 
      // Kontrollera om alla kort har matchats
      if (document.querySelectorAll('.matched').length === cards.length) {
        alert('Grattis du klarade spelet!');
        clearInterval(timer); 
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
 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function restartGame() {
    clearInterval(timer);
    updateTime(); 
  
    const frontViews = document.querySelectorAll('.front-view');
    const backViews = document.querySelectorAll('.back-view');
    points.innerText = "0";
    pointsCount = 0;
  
    frontViews.forEach(view => {
      view.style.display = 'block';
    });
  
    backViews.forEach(view => {
      view.style.display = 'none';
    });
  
    const matchedCards = document.querySelectorAll('.matched');
    matchedCards.forEach(card => {
      card.classList.remove('matched');
    });
  
    const imageElements = document.querySelectorAll('.img-back');  
    const allImages = Array.from(imageElements).map(image => image.src);
    const shuffledImages = shuffleArray(allImages);

    imageElements.forEach((image, index) => {
      image.src = shuffledImages[index];
    });
  
    startTimer(); 
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