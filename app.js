var INITIAL_STATE = {
    NASA_BASE_URL: 'https://api.nasa.gov/planetary/apod',
    url: 'http://apod.nasa.gov/apod/image/1612/farside_lro800.jpg',
    explanation: "",
    image: "" ,
    date: "",
    formDisplaying: true,
    resetButtonDisplaying: false
}

var appState = Object.assign({}, INITIAL_STATE); //creates new object, merges all key values from second parameter
console.log(appState);


// STATE MODIFICATION FUNCTIONS


function handleNasaData(state, data){
  state.url = data.url;
  state.explanation = data.explanation;
  state.date = data.date;
}

function toggleFormDisplay(state) {
  state.formDisplaying = !state.formDisplaying

}
function toggleResetButtom(state) {
  state.resetButtonDisplaying = !state.resetButtonDisplaying
}

function resetState(state){
  state.explanation = '';
  state.image = '';
  state.date = '';
  state.formDisplaying = true;
  state.resetButtonDisplaying = false;
  state.url = 'http://apod.nasa.gov/apod/image/1612/farside_lro800.jpg';
}

// API FUNCTION
function getDataFromApi(state,myDate) {
    var query = {
        date: myDate,
        hd: false,
        api_key: 'eZW6vATkVUO5a2rbju1e9NZyCF88YB7oBr86Sfuc',
    };

    $.getJSON(state.NASA_BASE_URL, query, function(data){
      console.log('sending response', data);
      console.log('my state object:', state);
      handleNasaData(state, data);
      toggleFormDisplay(state);
      toggleResetButtom(state);
      renderData(state);
    });

}

// DISPLAY MODIFICATION FUNCTIONS
function renderData(state) {
  console.log('Render is runnning...');

    // look through every state property as needed and make a DOM decision
    $('body').css('background-image', 'url('+state.url+')');

    console.log('state:', state);
    if (state.date !== '' && state.explanation !== '') {
      console.log('this if is running!');
      var listElements = "<p>" + state.date + "</p>" +
          "<p>" + state.explanation + "</p>";

      if (state.resetButtonDisplaying){
        listElements += "<button id='reset-quiz' class=''>Reset</button>";
      } else {
        listElements += "<button id='reset-quiz' class='hidden'>Reset</button>";
      }

      $('.main').html(listElements);
    } else {
      $('.main').empty();
    }

    if (state.formDisplaying){
      $('.js-search-form').removeClass('hidden');
    } else {
      $('.js-search-form').addClass('hidden');
    }


}

// EVENT HANDLER FUNCTIONS
$(function eventHandlers() {
    renderData(appState);

    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        var myDate = $(event.currentTarget).find('.js-query').val();
        getDataFromApi(appState,myDate);
    });

    $('.main').on('click', '#reset-quiz', function(){
        resetState(appState);
        renderData(appState);
    });

      // 1. retrieve user input from DOM (optional)
      // 2. call a state modification function
      // 3. call render function, passing in state


})



// https://api.nasa.gov/EPIC/api/natural/date/2015-10-31?api_key=eZW6vATkVUO5a2rbju1e9NZyCF88YB7oBr86Sfuc
// epic_1b_20151031022436_01
// https://api.nasa.gov/EPIC/archive/enhanced/2016/12/04/png/epic_1b_20151031022436_01.png?api_key=DEMO_KEY
