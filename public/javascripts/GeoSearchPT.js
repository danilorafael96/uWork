import { OpenStreetMapProvider } from 'leaflet-geosearch';

// setup
const provider = new OpenStreetMapProvider();

// search
const results = await provider.search({ query: input.value });
//Of course, something like this should be bound to something like a form or input:

import { OpenStreetMapProvider } from 'leaflet-geosearch';

var formattedAddressOutput = '<ul class="list-group"><li class="list-group-item">${formattedAddress}</li></ul>'

const form = document.getElementById('formatted-address').innerHTML= formattedAddressOutput;
const input = form.querySelector('input[type="Adress"]');

form.addEventListener('submit', async (event) => {
  console.log("Saving Values");
  event.preventDefault();

  const results = await provider.search({ query: input.value });
  console.log(results); // » [{}, {}, {}, ...]
});


//Instead of es6 async / await you can also use promises like:

provider
  .search({ query: 'Praceta Humberto da Cruz 9, Queluz, Sintra&format=geocodejson' })
  .then(function(result) { 
    console.log(results);
    // do something with result;
  });