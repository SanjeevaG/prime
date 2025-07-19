export function modelPage(selectedMake) {
  const container = document.createElement('div');
  container.className = 'container model-page';

  const title = document.createElement('h2');
  title.textContent = `${selectedMake.charAt(0).toUpperCase() + selectedMake.slice(1)} Vehicles`;

  const carGrid = document.createElement('div');
  carGrid.className = 'car-grid';

  const cars = [
    {
      make: 'Toyota',
      model: 'Camry 2023',
      type: 'Sedan',
      transmission: 'Automatic',
      engine: '2.5L 4-cylinder',
      price: '$28,999',
      image: './pictures/nissan/4.jpg' // local image, ensure path is correct
    },
    {
      make: 'Honda',
      model: 'CR-V 2023',
      type: 'SUV',
      transmission: 'Automatic',
      engine: '1.5L Turbo',
      price: '$32,499',
      image: 'https://source.unsplash.com/random/600x400/?honda'
    },
    {
      make: 'BMW',
      model: '3 Series',
      type: 'Sedan',
      transmission: 'Automatic',
      engine: '2.0L Turbo',
      price: '$45,999',
      image: 'https://source.unsplash.com/random/600x400/?bmw'
    },
    {
      make: 'Ford',
      model: 'Mustang GT',
      type: 'Coupe',
      transmission: 'Manual',
      engine: '5.0L V8',
      price: '$42,999',
      image: 'https://source.unsplash.com/random/600x400/?ford'
    }
  ];

  const filtered = cars.filter(car => car.make.toLowerCase() === selectedMake.toLowerCase());

  if (filtered.length === 0) {
    const notFound = document.createElement('p');
    notFound.textContent = `No vehicles found for ${selectedMake}`;
    container.appendChild(notFound);
    return container;
  }

  filtered.forEach(car => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';

    const carImage = document.createElement('div');
    carImage.className = 'car-image';
    carImage.style.backgroundImage = `url('${car.image}')`;

    const carInfo = document.createElement('div');
    carInfo.className = 'car-info';

    const carName = document.createElement('h3');
    carName.textContent = `${car.make} ${car.model}`;

    const carSpecs = document.createElement('p');
    carSpecs.textContent = `${car.type} | ${car.transmission} | ${car.engine}`;

    const carPrice = document.createElement('p');
    carPrice.className = 'car-price';
    carPrice.textContent = car.price;

    carInfo.append(carName, carSpecs, carPrice);
    carCard.append(carImage, carInfo);
    carGrid.appendChild(carCard);
  });

  container.append(title, carGrid);
  return container;
}
