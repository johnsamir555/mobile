let anchors = document.querySelectorAll(".nav-link");
let topButton = document.getElementsByClassName("top")[0];
let progressContainer = document.querySelectorAll(".progress-container")[0];
let progressBars = document.querySelectorAll(".progress-bar");
let stats = document.getElementById("stats");
let counters = document.querySelectorAll("[data-toggle='counter-up']");
let statsCoordinates = stats.getBoundingClientRect();
let filterBtns = document.querySelectorAll(".filter-btns li");
let portfolioContainer = document.getElementsByClassName(
  "portfolio-container"
)[0];
// initialize wow
new WOW().init();

//Toggle 'active" class
anchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    anchor.classList.add("active");
    for (let i = 0; i < anchors.length; i++) {
      let sibling = anchors[i];
      if (sibling !== anchor) {
        sibling.classList.remove("active");
      }
    }
  });
});

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
// initialize isotope
let iso = new Isotope(".portfolio-container", {
  itemSelector: ".portfolio-item",
  layoutMode: "fitRows",
});
filterBtns.forEach((el) => {
  el.addEventListener("click", () => {
    // Remove active from siblings
    filterBtns.forEach((current) => {
      if (current !== el) {
        current.classList.remove("active");
      }
    });
    el.classList.add("active");
    let filterValue = el.getAttribute("data-filter");
    iso.arrange({
      filter: filterValue,
    });
  });
});
// initialize owl-carousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1e3,
    margin: 25,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });
});
