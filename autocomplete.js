function Auto(id, timeout, immediate) {
    document.getElementById(id).onkeyup = debounce(inputSpy, timeout, immediate);
    document.getElementById(id).onfocus = debounce(inputSpy, timeout, immediate);
    
    var trie = createTrie();
    _data.forEach(function (e) {
        console.log(e.name)
        trie.insert(e.name);
    });

    function inputSpy(event) {
        askForSuggestions(event.target.value, outputResults);
    }

    function outputResults(response_text) {
        var result_display = document.getElementById("result");
        result_display.innerHTML = response_text;
    }

    function askForSuggestions(input_text, result_processor) {
        var list = trie.autoComplete(input_text);
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
};