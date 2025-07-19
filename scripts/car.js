function carPage(selectedCar) {
    const container = document.createElement('div');
    container.className = 'container car-page';

    const scrollableContent = document.createElement('div');
    scrollableContent.className = 'scrollable-content';

    // Main image section
    const mainImageSection = document.createElement('div');
    mainImageSection.className = 'main-image-section';

    const mainImage = document.createElement('img');
    mainImage.className = 'main-image';
    mainImage.src = selectedCar.images[0];
    mainImage.alt = `${selectedCar.make} ${selectedCar.model}`;

    mainImageSection.appendChild(mainImage);

    // Thumbnail gallery section
    const gallerySection = document.createElement('div');
    gallerySection.className = 'gallery-section';

    if (selectedCar.images && selectedCar.images.length > 1) {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'thumbnail-container';

        selectedCar.images.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.style.backgroundImage = `url(${imgSrc})`;
            if (index === 0) thumbnail.classList.add('active');

            // Click on thumbnail changes main image and active state
            thumbnail.addEventListener('click', () => {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = imgSrc;
                    mainImage.style.opacity = '1';
                }, 200);
            });

            // Click on thumbnail opens lightbox
            thumbnail.addEventListener('click', () => {
                openLightbox(imgSrc);
            });

            thumbnailContainer.appendChild(thumbnail);
        });

        gallerySection.appendChild(thumbnailContainer);
    }

    // Click main image opens lightbox
    mainImage.addEventListener('click', () => {
        openLightbox(mainImage.src);
    });

    // Car info section
    const carInfoSection = document.createElement('div');
    carInfoSection.className = 'car-info-section';

    const carTitle = document.createElement('h1');
    carTitle.className = 'car-title';
    carTitle.textContent = `${selectedCar.make} ${selectedCar.model} ${selectedCar.year}`;

    const carDetails = document.createElement('div');
    carDetails.className = 'car-details';

    const details = [
        { label: 'Price', value: selectedCar.price, className: 'car-price' },
        { label: 'Type', value: selectedCar.type },
        { label: 'Year', value: selectedCar.year },
        { label: 'Mileage', value: selectedCar.mileage || 'N/A' },
        { label: 'Color', value: selectedCar.color || 'N/A' },
        { label: 'Transmission', value: selectedCar.transmission || 'Automatic' },
        { label: 'Fuel Type', value: selectedCar.fuelType || 'N/A' },
        { label: 'Engine', value: selectedCar.engine || 'N/A' }
    ];

    details.forEach(detail => {
        const p = document.createElement('p');
        if (detail.className) p.className = detail.className;
        p.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
        carDetails.appendChild(p);
    });

    carInfoSection.append(carTitle, carDetails);

    // Back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = 'Back to Results';
    backButton.addEventListener('click', () => {
        container.remove();
                 import('./stock.js')
        .then(module => {
            module.renderStockPage();
        })
        .catch(error => {
            console.error('Error loading stock module:', error);
            // Fallback content if module fails to load
            const main = document.createElement('main');
            main.innerHTML = '<p>Error loading stock page. Please try again.</p>';
            document.body.appendChild(main);
        });
    });

    scrollableContent.append(
        mainImageSection,
        gallerySection,
        carInfoSection
    );

    container.append(
        scrollableContent,
        backButton
    );

    // LIGHTBOX ELEMENTS
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';

    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';

    lightboxOverlay.appendChild(lightboxImage);

    // Close lightbox on clicking overlay or image
    lightboxOverlay.addEventListener('click', () => {
        lightboxOverlay.classList.remove('active');
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    });

    container.appendChild(lightboxOverlay);

    // Open lightbox function
    function openLightbox(src) {
        lightboxImage.src = src;
        lightboxOverlay.classList.add('active');
    }

    return container;
}

export { carPage };
