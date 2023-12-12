const url = 'https://all-cars-names-image-and-variants-info.p.rapidapi.com/motororchestrator/api/v1/mmv?vehicle_type=car';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '924b0950b2msha34f3cf2693d005p1c7503jsn8f0a3933aa64',
		'X-RapidAPI-Host': 'all-cars-names-image-and-variants-info.p.rapidapi.com'
	}
};

showResults();
async function showResults()
{
	const response = await fetch(url, options);
	const respData = await response.json();
	console.log(respData.result['vehicles']);
} 

const apiData = ???;
// I created a for loop to iterrate over the apiData
//but I don't know how to assign the data that I see in console to the code 

function  extractUsefulContent(data)
{
    const filteredObjects = [];
    let i = 0;
    for (apiData) {
        if (data.image !== null) {
            const newObj = {
                id: data.id,
                name: data.name,
                image: data.image
            };
            filteredObjects.push(newObj);
            i++;
            if (i === 20) {
                break;
            }
        }
    }
    return filteredObjects;
}

const filteredArray = extractUsefulContent(apiData);
console.log(filteredArray);



const gridContianer = document.querySelector('.grid-container');


displayCars();
function displayCars()
{
    const cars = document.createElement("div");
    cars.classList.add("cars");

    cars.innerHTML = `
    <figure> <img src="${image}">
    <figcaption>${name}</figcaption>
    <figcaption>$68</figcaption>
    <button class="btn2">Buy now</button></figure>`

    gridContianer.appendChild(cars)
}
//for loop to have 6 items 




