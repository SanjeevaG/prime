import { carInventory } from './data.js';

function modelPage({ make, model, keyword }) {
    const container = document.createElement('div');
    container.className = 'container model-page';

    // Filter cars based on search criteria
    const results = carInventory.filter(car => {
        if (keyword) {
            return car.model.toLowerCase().includes(keyword) || 
                   car.make.toLowerCase().includes(keyword);
        }
        
        const matchesMake = make && car.make.toLowerCase() === make;
        const matchesModel = model && car.model.toLowerCase() === model;
        
        return matchesMake && (model ? matchesModel : true);
    });

    // Create title based on search
    let titleText;
    if (make && model) {
        titleText = `${make.charAt(0).toUpperCase() + make.slice(1)} ${model.charAt(0).toUpperCase() + model.slice(1)}`;
    } else if (make) {
        titleText = `${make.charAt(0).toUpperCase() + make.slice(1)} Vehicles`;
    } else if (keyword) {
        titleText = `Search Results for "${keyword}"`;
    } else {
        titleText = 'All Vehicles';
    }

    const title = document.createElement('h2');
    title.textContent = titleText;

    const carGrid = document.createElement('div');
    carGrid.className = 'car-grid';

    if (results.length === 0) {
        const noResults = document.createElement('p');
        noResults.className = 'no-results';
        noResults.textContent = 'No vehicles found matching your criteria.';
        carGrid.appendChild(noResults);
    } else {
        results.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';

            const carImage = document.createElement('div');
            carImage.className = 'car-image';
            carImage.style.backgroundImage = `url(${car.images[0]})`;

            const carInfo = document.createElement('div');
            carInfo.className = 'car-info';

            const carName = document.createElement('h3');
            carName.textContent = `${car.make} ${car.model} ${car.year}`;

            const carDetails = document.createElement('p');
            carDetails.textContent = `${car.type} • ${car.price}`;

            carInfo.append(carName, carDetails);
            carCard.append(carImage, carInfo);
            carGrid.appendChild(carCard);

            // Make car cards clickable to show detail page
            carCard.addEventListener('click', async () => {
                try {
                    const carModule = await import('./car.js');
                    const carFn = carModule.carPage || carModule.default;
                    const carContent = carFn(car);
                    
                    // Replace current content with car detail page
                    const mainContent = document.querySelector('.site-main');
                    if (mainContent) {
                        mainContent.replaceWith(carContent);
                    } else {
                        container.replaceWith(carContent);
                    }
                } catch (error) {
                    console.error("Error loading car page:", error);
                }
            });
        });
    }

    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Back to Search';
    backButton.addEventListener('click', () => {
        window.location.reload();
    });

    container.append(title, carGrid, backButton);

    

    return container;
}

export { modelPage };