
  const restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", function () {
      const frontViews = document.querySelectorAll('.front-view');
      const backViews = document.querySelectorAll('.back-view');
  

      frontViews.forEach(view => {
          view.style.display = 'block';
      });
  
      backViews.forEach(view => {
          view.style.display = 'none';
      });
  });