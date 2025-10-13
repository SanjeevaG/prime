import { carInventory as stockInventory } from './vpdata.js';
import { carInventory as modelInventory } from './vppdata.js';
import { createCarLayout } from './vpp.js';

const ITEMS_PER_PAGE = 12;

function clearPageContent() {
  const header = document.querySelector('header');
  document.body.innerHTML = '';
  if (header) {
    document.body.appendChild(header);
  }
}

function getModelFamily(model) {
  // Extract base model name (e.g., "Raize X,G,Z" → "raize")
  return model.split(' ')[0].toLowerCase();
}

function renderStockPage(page = 1) {
  clearPageContent();

  const main = document.createElement('main');
  main.className = 'stock-page';

  const title = document.createElement('h1');
  title.textContent = 'Choose Your Vehicle';
  main.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'vehicle-grid';

  if (!stockInventory || stockInventory.length === 0) {
    const noVehicles = document.createElement('p');
    noVehicles.textContent = 'No vehicles currently available in stock.';
    noVehicles.className = 'no-vehicles';
    grid.appendChild(noVehicles);
  } else {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const vehiclesToShow = stockInventory.slice(startIndex, endIndex);

    vehiclesToShow.forEach(vehicle => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
      card.addEventListener('click', () => {
        const modelFamily = getModelFamily(vehicle.model);
        
        // ✅ Filter models by make, model family, and engine
        const filteredModels = modelInventory.filter(
          car =>
            car.make.toLowerCase() === vehicle.make.toLowerCase() &&
            car.model.toLowerCase().includes(modelFamily) &&
            car.engine === vehicle.engine
        );

        // Clear page and render layout
        clearPageContent();

        const heading = document.createElement('h1');
        heading.textContent = `${vehicle.make} ${modelFamily.toUpperCase()} ${vehicle.engine}`;
        heading.style.textAlign = 'center';
        heading.style.margin = '20px 0';
        document.body.appendChild(heading);

        // ✅ Render filtered models
        if (filteredModels.length > 0) {
          createCarLayout(filteredModels);
        } else {
          const noModels = document.createElement('p');
          noModels.textContent = 'No specific models found for this selection.';
          noModels.style.textAlign = 'center';
          noModels.style.padding = '40px';
          document.body.appendChild(noModels);
        }
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
      title.textContent = `${vehicle.make} ${vehicle.model}`;
      details.appendChild(title);

      const year = document.createElement('p');
      year.textContent = `Year: ${vehicle.year}`;
      details.appendChild(year);

      const specs = document.createElement('div');
      specs.className = 'specs-grid';

      const price = document.createElement('p');
      price.innerHTML = `<strong>Price:</strong> ${vehicle.price}`;
      specs.appendChild(price);

      const engine = document.createElement('p');
      engine.innerHTML = `<strong>Engine:</strong> ${vehicle.engine}`;
      specs.appendChild(engine);

      details.appendChild(specs);

      card.appendChild(imgContainer);
      card.appendChild(details);
      grid.appendChild(card);
    });
  }

  main.appendChild(grid);

  const totalPages = Math.ceil(stockInventory.length / ITEMS_PER_PAGE);
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