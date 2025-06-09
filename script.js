let count = 0;
let auto = 0;
let perClick = 1;
let clickerPrice = 10;
const meowCount = document.getElementById("meowCount");
const containers = document.querySelectorAll(".upgrades-container");
const mpc = document.getElementById("mpcValue");
const mps = document.getElementById("mpsValue");

function incrementMeow() {
  count += perClick;
  meowCount.textContent = count;
  //Source: https://pixabay.com/sound-effects/cat-meow-8-fx-306184/
  const meow = new Audio("assets/meow.mp3");
  meow.play();
}

function updateUpgrade(id) {
  const upgrade = document.getElementById(id);
  const costElem = upgrade.querySelector(".cost");
  const levelElem = upgrade.querySelector(".level-text");
  const increment =
    parseInt(levelElem.textContent) % 10 === 0 &&
    parseInt(levelElem.textContent) > 0
      ? parseInt(upgrade.dataset.increment * 2)
      : parseInt(upgrade.dataset.increment);
  if (count >= upgrade.dataset.cost) {
    count -= upgrade.dataset.cost;
    meowCount.textContent = count;

    if (upgrade.dataset.effect === "click") {
      perClick += increment;
    } else {
      auto += increment;
    }
    upgrade.dataset.cost = parseInt(upgrade.dataset.cost * 2);

    costElem.textContent = upgrade.dataset.cost;
    levelElem.textContent = parseInt(levelElem.textContent) + 1;
    mpc.textContent = perClick;
    mps.textContent = auto;
  }
}

containers.forEach((container) => {
  container.addEventListener("mouseover", () => {
    const upgrade = container.querySelector(".upgrade");
    const levelElem = upgrade.querySelector(".level-text");
    const increment =
      parseInt(levelElem.textContent) % 10 === 0 &&
      parseInt(levelElem.textContent) > 0
        ? parseInt(upgrade.dataset.increment * 2)
        : parseInt(upgrade.dataset.increment);
    const info = upgrade.querySelector(".effect-text");
    info.textContent = increment;
    if (count >= upgrade.dataset.cost) container.classList.add("pointer");
    else container.classList.remove("pointer");
  });
});

setInterval(() => {
  count += auto;
  meowCount.textContent = count;
  mpc.textContent = perClick;
}, 1000);
