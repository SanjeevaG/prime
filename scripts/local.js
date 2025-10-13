import { carInventory } from './localdata.js';
import { carPage } from './car.js';

const ITEMS_PER_PAGE = 12;

function clearPageContent() {
  const header = document.querySelector('header');
  document.body.innerHTML = '';
  if (header) {
    document.body.appendChild(header);
  }
}

function renderStockPage(page = 1) {
  clearPageContent();

  const main = document.createElement('main');
  main.className = 'stock-page';

  const title = document.createElement('h1');
  title.textContent = 'Our Current Vehicle Stock';
  main.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'vehicle-grid';

  if (!carInventory || carInventory.length === 0) {
    const noVehicles = document.createElement('p');
    noVehicles.textContent = 'No vehicles currently available in stock.';
    noVehicles.className = 'no-vehicles';
    grid.appendChild(noVehicles);
  } else {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const vehiclesToShow = carInventory.slice(startIndex, endIndex);

    vehiclesToShow.forEach(vehicle => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
      card.addEventListener('click', () => {
        clearPageContent();
        document.body.appendChild(carPage(vehicle));
      });

      const imgContainer = document.createElement('div');
      imgContainer.className = 'vehicle-image-container';

      const img = document.createElement('img');
      img.src = vehicle.images[0];
      img.alt = `${vehicle.make} ${vehicle.model}`;
      img.className = 'vehicle-image';
      imgContainer.appendChild(img);

      const details = document.createElement('div');
      details.className = 'vehicle-details';

      const title = document.createElement('h2');
      title.textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
      details.appendChild(title);

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

      specs.appendChild(price);
      specs.appendChild(mileage);
      specs.appendChild(color);
      specs.appendChild(transmission);
      specs.appendChild(fuelType);
      specs.appendChild(engine);

      details.appendChild(specs);

      card.appendChild(imgContainer);
      card.appendChild(details);
      grid.appendChild(card);
    });
  }

  main.appendChild(grid);

  const totalPages = Math.ceil(carInventory.length / ITEMS_PER_PAGE);
  if (totalPages > 1) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === page) btn.classList.add('active');
      btn.addEventListener('click', () => renderStockPage(i));
      pagination.appendChild(btn);
    }

    main.appendChild(pagination);
  }

  document.body.appendChild(main);
}

export { renderStockPage };
