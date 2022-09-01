function saveOptions() {
    chrome.storage.sync.set({
        metaKey: document.getElementById("meta_key").value,
        debug: document.getElementById("debug").checked,
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        metaKey: 'Alt',
        debug: false,
    }, function (items) {
        document.getElementById("meta_key").value = items.metaKey;
        document.getElementById("debug").checked = items.debug;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("meta_key").addEventListener("change", saveOptions);
document.getElementById("debug").addEventListener("click", saveOptions);
document.getElementById("meta_key_label").textContent = chrome.i18n.getMessage("meta_key");
