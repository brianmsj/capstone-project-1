

var state = {
NASA_BASE_URL: 'https://api.nasa.gov/planetary/earth/imagery',

}

function getDataFromApi() {

  var query = {
    lat: 1.5,
    lon: 100.75,
    date: '2014-02-01',
    api_key: 'eZW6vATkVUO5a2rbju1e9NZyCF88YB7oBr86Sfuc',
    cloud_score: true

  }
  var result =$.getJSON(state.NASA_BASE_URL,query);
  console.log(result);
}


$(function(){
  getDataFromApi();
});
