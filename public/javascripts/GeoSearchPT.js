import { OpenStreetMapProvider } from 'leaflet-geosearch';

// setup
const provider = new OpenStreetMapProvider();

// search
const results = await provider.search({ query: input.value });
//Of course, something like this should be bound to something like a form or input:

import { OpenStreetMapProvider } from 'leaflet-geosearch';

const form = document.querySelector('#local');
const input = form.querySelector('input[type="text"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const results = await provider.search({ query: input.value });
  console.log(results); // » [{}, {}, {}, ...]
});


//Instead of es6 async / await you can also use promises like:

provider
  .search({ query: '...' })
  .then(function(result) { 
    // do something with result;
  });