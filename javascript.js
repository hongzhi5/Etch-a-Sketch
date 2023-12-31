
// slider
const slider = document.createElement("input");
slider.type = "range";
slider.min = 1;
slider.max = 100;
slider.value = 50; // default value set to the slider

const sliderValue = document.createElement("div");
sliderValue.classList.add("sliderValue");
sliderValue.textContent = 50;

slider.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value; 
    sliderValue.textContent = tempSliderValue;

})

const sliderContainer = document.querySelector("#sliderContainer");
sliderContainer.appendChild(slider);
sliderContainer.appendChild(sliderValue);


// set two buttons for black and colorful mode
const blackButton = document.querySelector("#black");
const colorfulButton = document.querySelector("#colorful");
var color = "black";
blackButton.addEventListener("click", (event) => {
    color = event.target.value;
})
colorfulButton.addEventListener("click", (event) => {
    color = event.target.value;
})
// darken button
const darkenButton = document.querySelector("#darken");
darkenButton.addEventListener("click", (event) => {
  color = event.target.value;
})

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

    // erase button
    const eraseButton = document.querySelector("#erase");
    eraseButton.addEventListener("click", (event) => {
        gridItem.classList.remove("black");
        gridItem.classList.remove("colorful");
        gridItem.classList.remove("darken");
        gridItem.style.filter = "none";
    })
  }

// only start when click and stop when click again
// else if includes generating random color
const gridItems = document.querySelectorAll('.gridItem');
let colorChangingEnabled = false;
gridItems.forEach(gridItem => {
    gridItem.addEventListener('click', () => {
      colorChangingEnabled = !colorChangingEnabled;
  
      if (colorChangingEnabled && color == "black") {
        gridItem.classList.remove("colorful");
        gridItem.classList.remove("darken");
        gridItem.style.filter = "none";
        gridItem.classList.add(`${color}`);
  
        gridItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
            if (colorChangingEnabled && color == "black") {
                item.classList.remove("colorful");
                item.classList.remove("darken");
                item.style.filter = "none";
                item.classList.add(`${color}`);
            }
          });
        });
      } else if (colorChangingEnabled && color == "darken") {
        gridItem.classList.add(`${color}`);
        
        gridItems.forEach(item => {
          let darknessLevel = 0;
          item.addEventListener('mouseenter', () => {
            if (colorChangingEnabled && color == "darken" && darknessLevel < 90) {
              item.classList.add("darken");
              darknessLevel += 10;
              const brightness = 100 - darknessLevel; // Reverse darkness to brightness
              item.style.filter = `brightness(${brightness}%)`;
            }
          });
        });
      } else if (colorChangingEnabled && color == "colorful") {
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let randomColor = '#';
            for (let i = 0; i < 6; i++) {
                randomColor += letters[Math.floor(Math.random() * 16)];
            }
            return randomColor;
          }
        gridItem.classList.remove("darken");
        gridItem.style.filter = "none";
        gridItem.classList.add(`${color}`);
        const colorful = document.querySelector(".colorful");
        const randomColor = getRandomColor();
        colorful.style.setProperty('--color', randomColor);
       
        gridItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
            if (colorChangingEnabled && color == "colorful") {
                item.classList.remove("darken");
                item.style.filter = "none";
                item.classList.add(`${color}`);
                const randomColor = getRandomColor();
                item.style.setProperty('--color', randomColor);
            }
          });
        });
      } else {
        gridItems.forEach(item => {
          item.removeEventListener('mouseenter', null);
          item.removeEventListener('mouseleave', null);
        });
      }
    });
  });
  
// make sure the grids won't overflow and the container's size won't change
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

