document.addEventListener('DOMContentLoaded', (event) => {
    const toggleExtension = document.getElementById('toggleExtension');
    const shortcutList = document.getElementById('shortcutList');

    // Toggle the extension on and off
    toggleExtension.addEventListener('click', (event) => {
        // Get the current state of the extension
        chrome.storage.local.get(['enabled'], function(result) {
            let enabled = result.enabled || false;

            // Toggle the state
            enabled = !enabled;
            chrome.storage.local.set({enabled: enabled});

            // Update the button text
            toggleExtension.textContent = enabled ? 'Disable Extension' : 'Enable Extension';
         });
    });

    // Load the shortcuts from localStorage
    function loadShortcuts() {
        // Clear the existing list
        while (shortcutList.firstChild) {
            shortcutList.removeChild(shortcutList.firstChild);
        }

        // Load existing shortcuts
        chrome.storage.local.get(['shortcuts'], function(result) {
            let shortcuts = result.shortcuts || [];

            // Create a new list item for each shortcut
            for (let shortcut of shortcuts) {
                const listItem = document.createElement('li');
                listItem.textContent = `${shortcut.name}: ${shortcut.newKeyCombo} (${shortcut.autoFill})`;
                shortcutList.appendChild(listItem);
            }
        });
    }

    // Load the initial state of the extension
    chrome.storage.local.get(['enabled'], function(result) {
        let enabled = result.enabled || false;
        toggleExtension.textContent = enabled ? 'Disable Extension' : 'Enable Extension';
    });

    // Load the initial list of shortcuts
    loadShortcuts();
});

