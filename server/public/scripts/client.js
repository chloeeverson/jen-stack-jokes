console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', function (event) {
        console.log('clicked');
        //prevent refreshing of page
        event.preventDefault();
        //call add joke function
        addJoke();
    })
    getJokes();
}

function addJoke() {
    //get inputs from DOM, put in object,
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    }
    //console log it
    console.log('adding joke', newJoke);

    $.ajax({
        method: 'POST',
        url: '/jokes',
        //new item going in request body
        data: newJoke,
    })
        .then(function (response) {
            console.log('response from server', response);
            //pass array into rendor method to display
            getJokes();
        })
        .catch(function (error) {
            console.log('error from server', error);
            alert('sorry, could not add your joke. try again later.')
        })
    //clear inputs
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}//end function addJoke

function getJokes() {
    $.ajax({
        method: 'GET',
        url: '/jokes',
        //new joke going in request body
    })
        .then(function (response) {
            console.log('response from server', response);
            //pass array into rendor method to display
            render(response);
        })
        .catch(function (error) {
            console.log('error from server', error);
            alert('sorry, could not add your joke. try again later.')
        })
    console.log('after making server request...');

}//end function getJokes

function render(jokesArray) {
    //empty the container first, in case there is stuff there
    $('#outputDiv').empty();
    //loop over the array from the server and append to the dom
    for (let joke of jokesArray) {
        $('#outputDiv').append(`
        <p>${joke.whoseJoke}:</p>
        <p>${joke.jokeQuestion}</p>
        <p>${joke.punchLine}</p>
        `)
    }

}