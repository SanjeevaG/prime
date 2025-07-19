import { carInventory } from './data.js';
import { carPage } from './car.js'; // Make sure you have this import

function clearPageContent() {
  const header = document.querySelector('header');
  document.body.innerHTML = '';
  if (header) {
    document.body.appendChild(header);
  }
}

function renderStockPage() {
  clearPageContent();
  
  // Create main container
  const main = document.createElement('main');
  main.className = 'stock-page';
  
  // Add title
  const title = document.createElement('h1');
  title.textContent = 'Our Current Vehicle Stock';
  main.appendChild(title);
  
  // Add vehicle grid container
  const grid = document.createElement('div');
  grid.className = 'vehicle-grid';
  
  // Check if inventory exists
  if (!carInventory || carInventory.length === 0) {
    const noVehicles = document.createElement('p');
    noVehicles.textContent = 'No vehicles currently available in stock.';
    noVehicles.className = 'no-vehicles';
    grid.appendChild(noVehicles);
  } else {
    // Create vehicle cards for each vehicle
    carInventory.forEach(vehicle => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
      card.addEventListener('click', () => {
        // Clear current page and render car page
        clearPageContent();
        document.body.appendChild(carPage(vehicle));
      });
      
      // Create image container (only showing main image)
      const imgContainer = document.createElement('div');
      imgContainer.className = 'vehicle-image-container';
      
      const img = document.createElement('img');
      img.src = vehicle.images[0];
      img.alt = `${vehicle.make} ${vehicle.model}`;
      img.className = 'vehicle-image';
      imgContainer.appendChild(img);
      
      // Create details container
      const details = document.createElement('div');
      details.className = 'vehicle-details';
      
      // Add basic info
      const title = document.createElement('h2');
      title.textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
      details.appendChild(title);
      
      // Add specifications in a grid layout
      const specs = document.createElement('div');
      specs.className = 'specs-grid';
      
      const price = document.createElement('p');
      price.innerHTML = `<strong>Price:</strong> ${vehicle.price}`;
      
      const mileage = document.createElement('p');
      mileage.innerHTML = `<strong>Mileage:</strong> ${vehicle.mileage}`;
      
      const color = document.createElement('p');
      color.innerHTML = `<strong>Color:</strong> ${vehicle.color}`;
      
      const transmission = document.createElement('p');
      transmission.innerHTML = `<strong>Transmission:</strong> ${vehicle.transmission}`;
      
      const fuelType = document.createElement('p');
      fuelType.innerHTML = `<strong>Fuel Type:</strong> ${vehicle.fuelType}`;
      
      const engine = document.createElement('p');
      engine.innerHTML = `<strong>Engine:</strong> ${vehicle.engine}`;
      
      // Append all specs
      specs.appendChild(price);
      specs.appendChild(mileage);
      specs.appendChild(color);
      specs.appendChild(transmission);
      specs.appendChild(fuelType);
      specs.appendChild(engine);
      
      details.appendChild(specs);
      
      // Assemble card
      card.appendChild(imgContainer);
      card.appendChild(details);
      grid.appendChild(card);
    });
  }
  
  main.appendChild(grid);
  document.body.appendChild(main);
}

export { renderStockPage };