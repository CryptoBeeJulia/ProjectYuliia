const url = 'https://all-cars-names-image-and-variants-info.p.rapidapi.com/motororchestrator/api/v1/mmv?vehicle_type=car';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '924b0950b2msha34f3cf2693d005p1c7503jsn8f0a3933aa64',
		'X-RapidAPI-Host': 'all-cars-names-image-and-variants-info.p.rapidapi.com'
	}
};

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
    //function is not working

    displayCars(filteredArray);
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

  function displayCars(carData)
  {
    const car = document.createElement("div");
    car.classList.add("cars");
    carsElement.innerHTML = `
                        <figure> <img src="${carData.image}">
                        <figcaption>Hot Wheels test text ${carData.name}</figcaption>
                        <figcaption>$68</figcaption>
                        <button class="btn2">Buy now</button></figure>`

    carsElement.appendChild(car);
  }



/*

carData == mealData in the videos 
I couldn't get where this var coming from. Looks like it's in the API
In this case I don;t have an equivalent in my api and 
stuck because don't know how to tarhet image and name there
*/