const url = 'https://all-cars-names-image-and-variants-info.p.rapidapi.com/motororchestrator/api/v1/mmv?vehicle_type=car';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '924b0950b2msha34f3cf2693d005p1c7503jsn8f0a3933aa64',
		'X-RapidAPI-Host': 'all-cars-names-image-and-variants-info.p.rapidapi.com'
	}
};

// below the functionality to replace hyml grid with api data - failed
/*

const carsElement = document.querySelector('.cars');


showResults();
async function showResults()
{
	const response = await fetch(url, options);
	const respData = await response.json();
    const respCars = respData.result['vehicles'];
    //console.log(respCars);
    const filteredArray = filterObjectsWithImages(respCars.slice(0, 45));
    console.log(filteredArray); 

    carsElement.innerHTML = "";
    //function is working only for the first element

    for (let i = 0; i < 6; i++) {
        filteredArray.forEach(carData => {
          displayCars(carData);
        })
      }
    // loops the array to dispolay 6 cars
    }

    function filterObjectsWithImages(apiArray) {
      const filteredArray = [];
    
      for (const apiObject of apiArray) {
        if (apiObject.image !== null) {
          const newCar = {
            id: apiObject.id,
            name: apiObject.name,
            image: apiObject.image
          };
    
          filteredArray.push(newCar);
        }
      }
    
      return filteredArray;
    }

    function displayCars(carData) //don't know which var to pass to this function
    {
      const car = document.createElement("div");
      car.classList.add("cars");
      carsElement.innerHTML = `
                          <figure> <img src="${filteredArray.image}">
                          <figcaption>Hot Wheels test text ${filteredArray.name}</figcaption>
                          <figcaption>$${randomNumber}</figcaption>
                          <button class="btn2">Buy now</button></figure>`
  
      carsElement.appendChild(car);
      displayRandomNumber();

      const displayRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
        console.log(randomNumber);
      };
   
    }

  */

// below the functionality to add filtered array from api to local storage - failed
/*
  function addCarsToLocalStorage(carId) 
  {

    const carIds = getCarsFromLocalStorage();
    localStorage.setItem('carIds', JSON.stringify(filteredArray, carId));
  
  }

  function getCarsFromLocalStorage()
  {
    const carIds = JSON.parse(localStorage.getItem('carIds'));

    return carIds === null? [] : carIds;
  }


function removeCarsFromLocalStorage(carId)
{
    const carIds = getCarsFromLocalStorage();
    localStorage.setItem('carIds', JSON.stringify(
        carIds.filter(id => id!= carId)
    ));
}
// console.log(carId); carId is not defined
*/



  
  function addToCart(carImage, carDescription, carPrice) {
  
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div class="item-image">
        <img src="${carImage}" alt="Product Image">
      </div>
      <div class="item-description">
        <p>${carDescription}</p>
      </div>
      <div class="item-price">
        <p>${carPrice}</p>
      </div>
      <div class="remove-button">
        <button onclick="removeFromCart(this)">Remove</button>
      </div>
    `;
  
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.appendChild(cartItem);
  
    saveCartToLocalStorage();

  }
  
  const addToCartButtons = document.querySelectorAll('.btn2');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.cars');
      // this.closest('.cars') looks for the closest ancestor with the class
      const carImage = productCard.querySelector('img').src;
      const carDescription = productCard.querySelector('figcaption:nth-child(2)').textContent;
      const carPrice = productCard.querySelector('figcaption:nth-child(3)').textContent;
  
      addToCart(carImage, carDescription, carPrice);
    });
  });
  
  function removeFromCart(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();
  

    saveCartToLocalStorage();

  }

  function saveCartToLocalStorage() {
    const cartContainer = document.querySelector('.cart-container');
    const cartItems = cartContainer.querySelectorAll('.cart-item');
  
    const cartData = [];
  
    cartItems.forEach(item => {
      const imageSrc = item.querySelector('.item-image img').src;
      const description = item.querySelector('.item-description p').textContent;
      const price = item.querySelector('.item-price p').textContent;
  
      cartData.push({ imageSrc, description, price });
    });
  
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  

  function loadCartFromLocalStorage() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  
    const cartContainer = document.querySelector('.cart-container');
  
    cartContainer.innerHTML = '';
    cartData.forEach(item => {
      addToCart(item.imageSrc, item.description, item.price);
    });
  }
  
  window.addEventListener('load', loadCartFromLocalStorage);

  