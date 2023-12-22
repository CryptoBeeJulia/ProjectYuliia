

const url = 'https://all-cars-names-image-and-variants-info.p.rapidapi.com/motororchestrator/api/v1/mmv?vehicle_type=car';
//const imageURL ='https://all-cars-names-image-and-variants-info.p.rapidapi.com/motororchestrator/api/v1'
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '924b0950b2msha34f3cf2693d005p1c7503jsn8f0a3933aa64',
		'X-RapidAPI-Host': 'all-cars-names-image-and-variants-info.p.rapidapi.com'
	}
};

// https://pixabay.com/api/docs/
// 41394548-bbba414078279e017706eb542 - key
// https://pixabay.com/api/ - GET



/* let globalImageData = [];

fetchData();
async function fetchData() {
    const response = await fetch("https://pixabay.com/api/?key=41394548-bbba414078279e017706eb542&q=car&image_type=photo");
    const json = await response.json();
    const globalImageData = json;
    console.log(globalImageData);
  
}

// console.log(globalImageData); - empty array

*/

//attempt 2

/* 
async function fetchData() {
  
    const response = await fetch("https://pixabay.com/api/?key=41394548-bbba414078279e017706eb542&q=car&image_type=photo");
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      firstSixImageURLs = data.hits.slice(0, 6).map(image => image.largeImageURL);
      return firstSixImageURLs; 
    } else {
      console.log("Not found");
      return [];
    }

}

fetchData()
  .then((firstSixImageURLs) => {
    console.log(firstSixImageURLs);
  })

  */













const gridElement = document.querySelector(".grid-container");
let filteredArray = [];


showResults();
async function showResults()
{
	const response = await fetch(url, options);
	const respData = await response.json();
    const respCars = respData.result['vehicles'];
    //console.log(respCars);
    const filteredArray = filterObjectsWithImages(respCars.slice(0, 45));
    console.log(filteredArray); 

    gridElement.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        
      console.log(filteredArray[i]);    
      displayCars(filteredArray[i]);
      
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


    let firstSixImageURLs;

async function fetchData() {
  try {
    const response = await fetch("https://pixabay.com/api/?key=41394548-bbba414078279e017706eb542&q=car&image_type=photo");
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      firstSixImageURLs = data.hits.slice(0, 6).map(image => image.largeImageURL);
      return firstSixImageURLs;
    } else {
      console.log("Not found");
      return [];
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

fetchData()
  .then(() => {
    console.log(firstSixImageURLs);
    displayCars();
  });

function displayCars() {
  let randomNumber = getRandomNumber();
  const car = document.createElement("div");
  car.classList.add("cars");

  car.innerHTML = `
    <figure>
      <img src="${firstSixImageURLs[0]}">
      <figcaption>Hot Wheels test text Example Car</figcaption>
      <figcaption>$${randomNumber}</figcaption>
      <button class="btn2">Buy now</button>
    </figure>`;

  gridElement.appendChild(car);
}
  

   
   

   function getRandomNumber() 
    {
      const randomNumber = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
      console.log(randomNumber);
      return randomNumber;
    };

  

// below the functionality to add filtered array from api to local storage - failed

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

// tried to add cart is empty message using if-else statement to change value of cartContainer.innerHTML = '';
// but failed



  