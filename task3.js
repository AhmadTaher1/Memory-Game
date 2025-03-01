document.querySelector(".controls span").addEventListener("click", function () {
  let name = prompt("PlZ Enter Your Name");

  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "unknown";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }

  document.querySelector(".controls").remove();
});

let duration = 1000;
let blocks_container = document.querySelector(".game");
let blocks = Array.from(blocks_container.children);
let orderRange = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

let x = shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = x[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function shuffle(array) {
  let current = array.length;
  let temp;
  let random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flipped");
  let allFlippedBlocks = blocks.filter((block) =>
    block.classList.contains("flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopflipping();

    //delay
    setTimeout(() => {
      checkmatch(allFlippedBlocks[0], allFlippedBlocks[1]);
    }, 1000);
  }
}

function stopflipping() {
  blocks_container.classList.add("noclicking");

  //delay
  setTimeout(() => {
    blocks_container.classList.remove("noclicking");
  }, duration);
}

function checkmatch(firstBlock, secondBlock) {
  // custom att.  ex:data-technology="one1"
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");

    let matches = blocks.filter((m) => m.classList.contains("matched"));
    if (matches.length == 20) {
      clearInterval(interval);
      alert(
        `congratulations ${
          document.querySelector(".name span").innerHTML
        }  you finsihed the game in ${
          document.querySelector(".tries span").innerHTML
        }`
      );
    }
  } else {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");
  }
}

let seconds = 0;
let interval;

function startTimer() {
  interval = setInterval(() => {
    seconds++;
    if (seconds < 60) {
      let output = ` ${seconds} `;
      document.querySelector(".tries span").innerHTML = output;
    } else {
      let minutes = Math.floor(seconds / 60);
      let sec = seconds % 60;

      let output = ` ${minutes}:${sec} `;

      document.querySelector(".tries span").innerHTML = output;
    }
  }, 1000);
}

startTimer();
