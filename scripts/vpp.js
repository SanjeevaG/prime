import { carInventory } from './vppdata.js';

function createCarLayout(carsToDisplay = carInventory) {
  // Remove old layout if exists
  const oldContainer = document.querySelector('.car-container');
  if (oldContainer) oldContainer.remove();

  // Create main container
  const container = document.createElement('div');
  container.classList.add('car-container');

  // Loop through each car model
  carsToDisplay.forEach(car => {
    // Create each row
    const carRow = document.createElement('div');
    carRow.classList.add('car-row');

    // === Left column (1/4) - image ===
    const imgCol = document.createElement('div');
    imgCol.classList.add('car-img-col');

    const img = document.createElement('img');
    img.src = car.images[0];
    img.alt = `${car.make} ${car.model}`;
    img.classList.add('car-image');
    imgCol.appendChild(img);

    // === Right column (3/4) - details ===
    const detailCol = document.createElement('div');
    detailCol.classList.add('car-detail-col');
    detailCol.innerHTML = `
      <h3>${car.make} ${car.model}</h3>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Type:</strong> ${car.type}</p>
      <p><strong>Engine:</strong> ${car.engine}</p>
      <p><strong>Fuel:</strong> ${car.fuelType}</p>
      <p><strong>Transmission:</strong> ${car.transmission}</p>
      <p><strong>Price:</strong> ${car.price}</p>
    `;

    // Append to the row
    carRow.appendChild(imgCol);
    carRow.appendChild(detailCol);

    // Add row to container
    container.appendChild(carRow);
  });

  document.body.appendChild(container);
}

// --- Inject CSS dynamically ---
const style = document.createElement('style');
style.textContent = `
  .car-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }

  .car-row {
    display: grid;
    grid-template-columns: 1fr 3fr; /* 1/4 and 3/4 layout */
    align-items: center;
    gap: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .car-row:hover {
    transform: scale(1.01);
  }

  .car-img-col {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .car-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 180px;
  }

  .car-detail-col {
    padding: 15px 20px;
  }

  .car-detail-col h3 {
    margin: 0 0 10px;
    color: #222;
  }

  .car-detail-col p {
    margin: 4px 0;
    color: #555;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .car-row {
      grid-template-columns: 1fr; /* stack vertically on mobile */
    }
    .car-image {
      max-height: 220px;
    }
  }
`;
document.head.appendChild(style);

export { createCarLayout };
