(function() {
document.getElementById("search").onkeyup = debounce(inputSpy, 100, true);

function inputSpy(event) {
    askForSuggestions(event.target.value, outputResults);
}

function outputResults(response_text) {
    var result_display = document.getElementById("result");
    result_display.innerHTML = response_text;
}

function askForSuggestions(input_text, result_processor) {
    var trie = createTrie();
    _data.forEach(function(e){
        console.log(e.name)
        trie.insert(e.name);
    });

    var list = trie.autoComplete(input_text);
    //list.forEach(function(e))
   
    result_processor(list);

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
})();