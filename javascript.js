
// slider
const slider = document.createElement("input");
slider.type = "range";
slider.min = 1;
slider.max = 100;
slider.value = 5; // default value set to the slider

const sliderValue = document.createElement("div");
sliderValue.classList.add("sliderValue");
sliderValue.textContent = 5;

slider.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value; 
    sliderValue.textContent = tempSliderValue;

})

const sliderContainer = document.querySelector("#sliderContainer");
sliderContainer.appendChild(slider);
sliderContainer.appendChild(sliderValue);

// grid
const gridContainer = document.querySelector('#container');

function createGrid(numGrid) {
  const gridSize = 500 / numGrid; // Calculate the size of each grid cell
  container.innerHTML = ''; // Clear existing grids

  for (let i = 0; i < numGrid * numGrid; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('gridItem');
    gridItem.style.width = gridSize + 'px';
    gridItem.style.height = gridSize + 'px';

    gridContainer.appendChild(gridItem);
  }

  const containerWidth = gridContainer.offsetWidth; // Get container width
  const itemSize = containerWidth / numGrid; // Calculate grid item size
  gridContainer.style.gridTemplateColumns = `repeat(${numGrid}, ${itemSize}px)`; // Set column template
  gridContainer.style.gridTemplateRows = `repeat(${numGrid}, ${itemSize}px)`; // Set row template
}

slider.addEventListener('input', function() {
  const numGrid = parseInt(slider.value);
  createGrid(numGrid);
});

// Initial grid creation with default slider value
createGrid(parseInt(slider.value));