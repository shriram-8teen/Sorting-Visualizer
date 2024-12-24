let array = [];

function generateRandomArray() {
    array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10);
    renderBars();
}

function renderBars() {
    const barsContainer = document.getElementById('bars');
    barsContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        barsContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('highlight');
            bars[j + 1].classList.add('highlight');
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
                renderBars();
            }
            bars[j].classList.remove('highlight');
            bars[j + 1].classList.remove('highlight');
        }
        bars[array.length - i - 1].classList.add('sorted');
    }
    markAllSorted();
}

async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add('highlight');
            if (array[j] < array[minIndex]) minIndex = j;
            bars[j].classList.remove('highlight');
        }
        if (minIndex !== i) {
            await swap(i, minIndex);
            renderBars();
        }
        bars[i].classList.add('sorted');
    }
    markAllSorted();
}

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            renderBars();
            j--;
        }
        array[j + 1] = key;
        bars[i].classList.add('sorted');
        await delay(100);
    }
    markAllSorted();
}

async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    let index = await partition(start, end);
    await quickSort(start, index - 1);
    await quickSort(index + 1, end);
}

async function partition(start, end) {
    const bars = document.getElementsByClassName('bar');
    let pivotIndex = start;
    let pivotValue = array[end];
    bars[end].classList.add('highlight');
    for (let i = start; i < end; i++) {
        bars[i].classList.add('highlight');
        if (array[i] < pivotValue) {
            await swap(i, pivotIndex);
            pivotIndex++;
        }
        bars[i].classList.remove('highlight');
    }
    await swap(pivotIndex, end);
    bars[end].classList.remove('highlight');
    return pivotIndex;
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let merged = [];
    let left = start, right = mid + 1;
    while (left <= mid && right <= end) {
        if (array[left] < array[right]) merged.push(array[left++]);
        else merged.push(array[right++]);
    }
    while (left <= mid) merged.push(array[left++]);
    while (right <= end) merged.push(array[right++]);
    for (let i = start; i <= end; i++) {
        array[i] = merged[i - start];
        renderBars();
        await delay(100);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function markAllSorted() {
    const bars = document.getElementsByClassName('bar');
    for (let bar of bars) {
        bar.classList.add('sorted');
    }
}

async function swap(i, j) {
    return new Promise(resolve => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        setTimeout(resolve, 100);
    });
}

function startAlgorithm() {
    const algorithm = document.getElementById('algorithm').value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'quickSort':
            quickSort();
            break;
        case 'mergeSort':
            mergeSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        default:
            alert('Invalid algorithm selected');
    }
}

generateRandomArray();
