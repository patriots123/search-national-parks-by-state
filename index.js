'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson,maxResults) {
    console.log(responseJson);
    $('#results-list').empty();
    if (array === undefined || array.length == 0) {
        $('#results-list').append(`No results for search citeria`);
    } else {
        for (let i = 0; i < responseJson.data.length; i++){
          $('#results-list').append(
            `<li><h3>${responseJson.data[i].name}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href='${responseJson.data[i].url}'>Website for ${responseJson.data[i].name}</a>
            </li>`
          )};
        $('.js-search-results-title').text(`First ${maxResults} Search Results in Specified State(s)`);
    }
    $('#results').removeClass('hidden');
};

function getListOfParks(query, maxResults) {
    const apiKey = 'R0RWdCtG6Q83qBvOuhpC0ApOqIK85wLkNMwyLT39'; 
    const searchURL = 'https://api.nps.gov/api/v1/parks';

    const params = {
        api_key: apiKey,
        stateCode: query,
        limit: maxResults,
        sort: 'name',
    };
    
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

        fetch(url, params)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson,maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}   

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      getListOfParks(searchTerm, maxResults);
    });
}

$(watchForm);