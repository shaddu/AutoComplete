document.getElementById("search").onkeyup = debounce(inputSpy, 100, true);

function inputSpy(event) {
    askForSuggestions(event.target.value, outputResults);
}

function outputResults(response_text) {
    var result_display = document.getElementById("result");
    result_display.innerHTML = response_text;
}

function askForSuggestions(input_text, result_processor) {
    // var data = 'data.json';
    // var _data = JSON.parse(data);
    console.log(_data.name);

    var people = ['Peter Bishop', 'Nicholas Brody', 'Gregory House', 'Hank Lawson', 'Tyrion Lannister',
        'Nucky Thompson'
    ];

    var results = $.grep(people, function (item) {
        return item.search(RegExp(input_text, "i")) != -1;
    });
    result_processor(results);

}

function debounce(func, wait, immediate) {
    var timeout, result;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
}