
let anchors = document.querySelectorAll(".nav-link");
let topButton = document.getElementsByClassName("top")[0];
let progressContainer = document.querySelectorAll(".progress-container")[0];
let progressBars = document.querySelectorAll(".progress-bar");
let stats = document.getElementById("stats");
let counters = document.querySelectorAll("[data-toggle='counter-up']");
let statsCoordinates = stats.getBoundingClientRect();
let filterBtns = document.querySelectorAll(".filter-btns li");
let portfolioContainer = document.getElementsByClassName("portfolio-container")[0];
// initialize wow
new WOW().init();

//Toggle 'active" class
// anchors.forEach(function (anchor){
//   "use strict";
//   anchor.addEventListener("click", function () {
//     anchor.classList.add("active");
//     for (let i = 0; i < anchors.length; i++) {
//       let sibling = anchors[i];
//       if (sibling !== anchor) {
//         sibling.classList.remove("active");
//       }
//     }
//   });
// });

window.addEventListener("scroll", () => {
  let progressCoordinates = progressContainer.getBoundingClientRect();
  let scrolledY = window.scrollY;
  // Check if progress bars in viewport
  if (progressCoordinates.bottom >= 300) {
    progressBars.forEach(function (el) {
      let valueNow = el.getAttribute("aria-valuenow");
      // set progress bars width
      el.style.width = `${valueNow}%`;
    });
  }
  // Show/Hide Top Button
  scrolledY >= 300
    ? (topButton.style.display = "flex")
    : (topButton.style.display = "none");
});
// Count up stats
if (
  statsCoordinates.top >= 0 &&
  statsCoordinates.bottom <=
    (window.innerHeight || document.documentElement.clientHeight)
) {
  counters.forEach((el) => {
    let currentVal = 0;
    let maxVal = parseInt(el.getAttribute("data-max-val"));
    let timePerRound = Number((1500 / maxVal).toFixed());

    const myInterval = setInterval(() => {
      currentVal += 1;
      if (currentVal <= maxVal) {
        el.innerHTML = currentVal;
      }
    }, timePerRound);
    if (currentVal === maxVal) {
      clearInterval(myInterval);
    }
  });
}
