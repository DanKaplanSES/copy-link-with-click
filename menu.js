(function () {
    var metaKey;
    var debug;

    updateSettings();

    chrome.storage.onChanged.addListener(function (changes, areaName) {
        if (areaName == "sync") {
            updateSettings();
        }
    })

    document.addEventListener("click", function (event) {
        if ((event.altKey && metaKey == "Alt")
            || (event.ctrlKey && metaKey == "Ctrl")
            || (event.shiftKey && metaKey == "Shift")) {
            copyCommand(event.target);
            event.preventDefault();
        }
    }, false);

    function updateSettings() {
        chrome.storage.sync.get({
            metaKey: 'Alt',
            debug: false,
        }, function (items) {
            metaKey = items.metaKey;
            debug = items.debug;
        });
    };

    function copyCommand(clickedElement) {
        const closestAnchor = $(clickedElement).closest('a');
        debug && console.log('clickedElement', clickedElement);
        debug && console.log('closestAnchor', closestAnchor);

        if (closestAnchor && closestAnchor.length > 0) {
            const href = closestAnchor.attr('href');
            debug && console.log('href', href);

            if (href) {
                copy(href.trim());
            }

            var rect = clickedElement.getBoundingClientRect();
            var frame = document.createElement("div");
            Object.assign(frame.style, {
                position: "absolute",
                top: (rect.top + window.scrollY) + "px",
                left: (rect.left + window.scrollX) + "px",
                width: (rect.width - 4) + "px",
                height: (rect.height - 4) + "px",
                border: "solid 2px gold",
                borderRadius: "5px",
                zIndex: "99999",
                pointerEvents: "none"
            });

            document.body.appendChild(frame);

            $(frame).fadeIn(300, "swing").delay(500).fadeOut(500, "swing");
        } else if (debug) {
            console.log(`closestAnchor && closestAnchor.length > 0`, false);
        }
    }

    function copy(text) {
        var textArea = document.createElement("textarea");
        textArea.style.cssText = "position: absolute; left: -100%;";

        try {
            document.body.appendChild(textArea);

            textArea.value = text;
            textArea.select();

            document.execCommand("copy");
        } finally {
            document.body.removeChild(textArea);
        }
    }
})();
