import { carInventory } from './data.js';

function mainContent() {
    const container = document.createElement('div');
    container.className = 'container';

    // --- Inject CSS ONLY for news section ---
    const style = document.createElement('style');
    style.textContent = `
        .news-section {
            margin: 2em 0;
            padding: 1em;
            background: #f8f8f8;
            border-radius: 8px;
        }
        .news-section h2 {
            margin-bottom: 0.5em;
            font-size: 1.5em;
        }
        .news-list {
            list-style-type: disc;
            padding-left: 1.5em;
        }
        .news-list li {
            margin-bottom: 0.5em;
            font-size: 1.1em;
        }
        @media (max-width: 600px) {
            .news-section {
                padding: 0.8em;
            }
            .news-section h2 {
                font-size: 1.3em;
            }
            .news-list li {
                font-size: 1em;
            }
        }
    `;
    document.head.appendChild(style);

    // --- Search Section ---
    const searchSection = document.createElement('section');
    searchSection.className = 'search-section';

    const searchTitle = document.createElement('h2');
    searchTitle.textContent = 'Find Your Dream Car';

    const carMakeSelect = document.createElement('select');
    carMakeSelect.id = 'car-make';

    // ✅ Unique car makes
    const makes = ['', ...new Set(carInventory.map(car => car.make))];
    makes.forEach(make => {
        const option = document.createElement('option');
        option.value = make.toLowerCase();
        option.textContent = make || 'Select Make';
        carMakeSelect.appendChild(option);
    });

    const carModelSelect = document.createElement('select');
    carModelSelect.id = 'car-model';
    carModelSelect.disabled = true;

    // ✅ Make -> Model dropdown (unique)
    carMakeSelect.addEventListener('change', (e) => {
        const selectedMake = e.target.value;
        carModelSelect.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select Model';
        carModelSelect.appendChild(defaultOption);

        if (selectedMake) {
            const models = carInventory
                .filter(car => car.make.toLowerCase() === selectedMake)
                .map(car => car.model);

            // ✅ Remove duplicates using Set
            const uniqueModels = [...new Set(models)];

            uniqueModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model.toLowerCase();
                option.textContent = model;
                carModelSelect.appendChild(option);
            });

            carModelSelect.disabled = false;
        } else {
            carModelSelect.disabled = true;
        }
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-term';
    searchInput.placeholder = 'Search by model name...';

    const searchButton = document.createElement('button');
    searchButton.id = 'search-button';
    searchButton.textContent = 'Search';

    searchSection.append(searchTitle, carMakeSelect, carModelSelect, searchInput, searchButton);

    // --- News Section ---
    const newsSection = document.createElement('section');
    newsSection.className = 'news-section';

    const newsTitle = document.createElement('h2');
    newsTitle.textContent = 'Latest Automotive News';

    const newsList = document.createElement('ul');
    newsList.className = 'news-list';

    const newsItems = [
        'New electric SUV models announced for next year.',
        'Tips for maintaining your car during summer.',
        'Upcoming auto show will feature concept vehicles.',
        'Car loan rates expected to decrease this quarter.'
    ];

    newsItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        newsList.appendChild(li);
    });

    newsSection.append(newsTitle, newsList);

    // --- Featured Section ---
    const featuredSection = document.createElement('section');
    featuredSection.className = 'featured-section';

    const featuredTitle = document.createElement('h2');
    featuredTitle.textContent = 'Featured Vehicles';

    const carGrid = document.createElement('div');
    carGrid.className = 'car-grid';

    carInventory.slice(0, 20).forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';

        const carImage = document.createElement('div');
        carImage.className = 'car-image';
        carImage.style.backgroundImage = `url(${car.images[0]})`;

        const carInfo = document.createElement('div');
        carInfo.className = 'car-info';

        const carName = document.createElement('h3');
        carName.textContent = `${car.make} ${car.model} ${car.year}`;

        const carPrice = document.createElement('p');
        carPrice.className = 'car-price';
        carPrice.textContent = car.price;

        carInfo.append(carName, carPrice);
        carCard.append(carImage, carInfo);
        carGrid.appendChild(carCard);

        // --- Dynamic car page load ---
        carCard.addEventListener('click', async () => {
            try {
                const carModule = await import('./car.js');
                const carFn = carModule.carPage || carModule.default;
                const carContent = carFn(car);

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

    featuredSection.append(featuredTitle, carGrid);

    // --- Append everything ---
    container.append(searchSection, featuredSection, newsSection);

    return container;
}

export { mainContent };
