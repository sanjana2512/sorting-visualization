let array = [];
let comparisonCount = 0;
let swapCount = 0;

// Update UI stats
function resetStats() {
  comparisonCount = 0;
  swapCount = 0;
  document.getElementById("comparisonCount").innerText = 0;
  document.getElementById("swapCount").innerText = 0;
}

function updateStats() {
  document.getElementById("comparisonCount").innerText = comparisonCount;
  document.getElementById("swapCount").innerText = swapCount;
}

function sleep() {
  const speed = parseInt(document.getElementById("speedRange").value);
  return new Promise(resolve => setTimeout(resolve, speed));
}

function swapBars(bar1, bar2) {
  swapCount++;
  updateStats();

  let tempHeight = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = tempHeight;

  let tempLabel = bar1.querySelector(".bar-label").innerText;
  bar1.querySelector(".bar-label").innerText = bar2.querySelector(".bar-label").innerText;
  bar2.querySelector(".bar-label").innerText = tempLabel;
}

function generateArray() {
  resetStats();
  const size = parseInt(document.getElementById("barCount").value);
  array = [];
  const barsContainer = document.getElementById("bars-container");
  barsContainer.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 250) + 10;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;

    const label = document.createElement("div");
    label.classList.add("bar-label");
    label.innerText = value;
    bar.appendChild(label);

    barsContainer.appendChild(bar);
  }
}

document.getElementById("barCount").addEventListener("input", () => {
  document.getElementById("barCountValue").innerText = document.getElementById("barCount").value;
});

document.getElementById("speedRange").addEventListener("input", () => {
  document.getElementById("speedValue").innerText = document.getElementById("speedRange").value;
});

function startSorting() {
  resetStats();
  const algorithm = document.getElementById("algorithmSelect").value;

  switch (algorithm) {
    case "bubble":
      bubbleSort();
      break;
    case "insertion":
      insertionSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "merge":
      startMergeSort();
      break;
    case "quick":
      startQuickSort();
      break;
    case "heap":
      startHeapSort();
      break;
    default:
      alert("Please select an algorithm.");
  }
}

// 🧼 Reset all bar colors
function resetBarColors() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach(bar => {
    bar.style.backgroundColor = "teal";
  });
}

// ✅ Bubble Sort
async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      const bar1 = bars[j];
      const bar2 = bars[j + 1];

      bar1.style.backgroundColor = "red";
      bar2.style.backgroundColor = "red";

      await sleep();

      comparisonCount++;
      updateStats();

      const h1 = parseInt(bar1.style.height);
      const h2 = parseInt(bar2.style.height);

      if (h1 > h2) {
        swapBars(bar1, bar2);
        await sleep();
      }

      bar1.style.backgroundColor = "teal";
      bar2.style.backgroundColor = "teal";
    }
    bars[bars.length - 1 - i].style.backgroundColor = "green";
  }
  bars[0].style.backgroundColor = "green";
}

// ✅ Insertion Sort
async function insertionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 1; i < bars.length; i++) {
    let j = i;
    while (
      j > 0 &&
      parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)
    ) {
      bars[j].style.backgroundColor = "red";
      bars[j - 1].style.backgroundColor = "red";
      comparisonCount++;
      updateStats();

      await sleep();
      swapBars(bars[j], bars[j - 1]);
      await sleep();

      bars[j].style.backgroundColor = "teal";
      bars[j - 1].style.backgroundColor = "teal";
      j--;
    }
  }
  bars.forEach(bar => (bar.style.backgroundColor = "green"));
}

// ✅ Selection Sort
async function selectionSort() {
  const bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "orange";
    for (let j = i + 1; j < bars.length; j++) {
      comparisonCount++;
      updateStats();
      bars[j].style.backgroundColor = "red";
      await sleep();

      if (
        parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)
      ) {
        bars[minIdx].style.backgroundColor = "teal";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "orange";
      } else {
        bars[j].style.backgroundColor = "teal";
      }
    }

    if (minIdx !== i) {
      swapBars(bars[i], bars[minIdx]);
      await sleep();
    }

    bars[i].style.backgroundColor = "green";
  }
}

// ✅ Merge Sort
function startMergeSort() {
  const bars = document.querySelectorAll(".bar");
  mergeSort(bars, 0, bars.length - 1);
}

async function mergeSort(bars, left, right) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSort(bars, left, mid);
  await mergeSort(bars, mid + 1, right);
  await merge(bars, left, mid, right);
}

async function merge(bars, left, mid, right) {
  let temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    bars[i].style.backgroundColor = "red";
    bars[j].style.backgroundColor = "red";
    await sleep();
    comparisonCount++;
    updateStats();

    const h1 = parseInt(bars[i].style.height);
    const h2 = parseInt(bars[j].style.height);

    if (h1 <= h2) {
      temp.push(h1);
      i++;
    } else {
      temp.push(h2);
      j++;
    }

    bars.forEach(bar => (bar.style.backgroundColor = "teal"));
  }

  while (i <= mid) temp.push(parseInt(bars[i++].style.height));
  while (j <= right) temp.push(parseInt(bars[j++].style.height));

  for (let k = left; k <= right; k++) {
    bars[k].style.height = `${temp[k - left]}px`;
    bars[k].querySelector(".bar-label").innerText = temp[k - left];
    bars[k].style.backgroundColor = "green";
    await sleep();
  }
}

// ✅ Quick Sort
function startQuickSort() {
  const bars = document.querySelectorAll(".bar");
  quickSort(bars, 0, bars.length - 1);
}

async function quickSort(bars, low, high) {
  if (low < high) {
    const pi = await partition(bars, low, high);
    await quickSort(bars, low, pi - 1);
    await quickSort(bars, pi + 1, high);
  }
}

async function partition(bars, low, high) {
  let pivot = parseInt(bars[high].style.height);
  bars[high].style.backgroundColor = "orange";
  let i = low - 1;

  for (let j = low; j < high; j++) {
    comparisonCount++;
    updateStats();
    bars[j].style.backgroundColor = "red";
    await sleep();

    if (parseInt(bars[j].style.height) < pivot) {
      i++;
      swapBars(bars[i], bars[j]);
      await sleep();
    }
    bars[j].style.backgroundColor = "teal";
  }

  swapBars(bars[i + 1], bars[high]);
  bars[high].style.backgroundColor = "teal";
  bars[i + 1].style.backgroundColor = "green";
  await sleep();
  return i + 1;
}

// ✅ Heap Sort
function startHeapSort() {
  const bars = document.querySelectorAll(".bar");
  heapSort(bars);
}

async function heapSort(bars) {
  const n = bars.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(bars, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    swapBars(bars[0], bars[i]);
    bars[i].style.backgroundColor = "green";
    await sleep();
    await heapify(bars, i, 0);
  }

  bars[0].style.backgroundColor = "green";
}

async function heapify(bars, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n) {
    comparisonCount++;
    updateStats();
    bars[l].style.backgroundColor = "red";
    await sleep();
    if (
      parseInt(bars[l].style.height) > parseInt(bars[largest].style.height)
    ) {
      largest = l;
    }
    bars[l].style.backgroundColor = "teal";
  }

  if (r < n) {
    comparisonCount++;
    updateStats();
    bars[r].style.backgroundColor = "red";
    await sleep();
    if (
      parseInt(bars[r].style.height) > parseInt(bars[largest].style.height)
    ) {
      largest = r;
    }
    bars[r].style.backgroundColor = "teal";
  }

  if (largest !== i) {
    swapBars(bars[i], bars[largest]);
    await sleep();
    await heapify(bars, n, largest);
  }
}
