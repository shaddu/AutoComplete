function Auto(id, timeout, immediate) {
    document.getElementById(id).onkeyup = debounce(inputSpy, timeout, immediate);
    document.getElementById(id).onfocus = debounce(inputSpy, timeout, immediate);
    document.getElementById(id).onblur = clear();


    function clear() {
        document.getElementById(id + "-suggestions").innerHTML = "";
    }

    var trie = createTrie();
    _data.forEach(function (e) {
        console.log(e.name)
        trie.insert(e.name);
    });

    function inputSpy(event) {
        askForSuggestions(event.target.value, outputResults);
    }

    function outputResults(response_text) {
        var response_html = "<ol>";
        var result_display = document.getElementById(id + "-suggestions");
        response_text.forEach(function (e, i) {
            response_html += "<li><span>" + (i + 1) + "</span><p>" + e + "</p></li>";
        })
        response_html += "</ol>";
        result_display.innerHTML = response_html;
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