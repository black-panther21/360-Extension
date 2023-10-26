document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('newShortcutForm');
    const shortcutList = document.getElementById('shortcutList');

    // Add a new shortcut
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get the values from the form
        const name = document.getElementById('name').value;
        const newKeyCombo = document.getElementById('newKeyCombo').value;
        const autoFill = document.getElementById('autoFill').value;
        const description = document.getElementById('description').value;
        const shortcutToggle = document.getElementById('shortcutToggle').checked;
        
        // Create a new shortcut object
        const shortcut = {
            name,
            newKeyCombo,
            autoFill,
            description,
            enabled: shortcutToggle
        };
        
        // Add the new shortcut to the array and update chrome.storage.local
        chrome.storage.local.get(['shortcuts'], function(result) {
            let shortcuts = result.shortcuts || [];
            shortcuts.push(shortcut);
            chrome.storage.local.set({shortcuts: shortcuts}, function() {
                console.log('Shortcuts updated');
                // Update the list of shortcuts
                loadShortcuts();
            });
        });

        // Clear the form
        form.reset();
        
    });


    // Load the shortcuts from chrome.storage.local
    function loadShortcuts() {
        // Clear the existing list
        while (shortcutList.firstChild) {
            shortcutList.removeChild(shortcutList.firstChild);
        }

        // Load existing shortcuts
        chrome.storage.local.get(['shortcuts'], function(result) {
        let shortcuts = result.shortcuts || [];
        
        // Loop through the shortcuts and add them to the list
        for (let i = 0; i < shortcuts.length; i++) {
            let shortcut = shortcuts[i];

            // Create a new form for each shortcut and add it to the list
            let shortcutForm = document.createElement('form');
            
            let nameLabel = document.createElement('label');
            nameLabel.textContent = 'Name:';
            let nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = shortcut.name;
            nameLabel.appendChild(nameInput);
            
            let newKeyComboLabel = document.createElement('label');
            newKeyComboLabel.textContent = 'New Key Combination:';
            let newKeyComboInput = document.createElement('input');
            newKeyComboInput.type = 'text';
            newKeyComboInput.value = shortcut.newKeyCombo;
            newKeyComboLabel.appendChild(newKeyComboInput);
            
            let autoFillLabel = document.createElement('label');
            autoFillLabel.textContent = 'Old Key Combination:';
            let autoFillInput = document.createElement('input');
            autoFillInput.type = 'text';
            autoFillInput.value = shortcut.autoFill;
            autoFillLabel.appendChild(autoFillInput);
            
            let descriptionLabel = document.createElement('label');
            descriptionLabel.textContent = 'Description:';
            let descriptionTextarea = document.createElement('textarea');
            descriptionTextarea.value = shortcut.description;
            descriptionLabel.appendChild(descriptionTextarea);
            
            let enabledLabel = document.createElement('label');
            enabledLabel.textContent = 'Enable Shortcut:';
            let enabledCheckbox = document.createElement('input');
            enabledCheckbox.type = 'checkbox';
            enabledCheckbox.checked = shortcut.enabled;
            
            enabledLabel.appendChild(enabledCheckbox);
            
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove Shortcut';

            // Add the elements to the form
           shortcutForm.appendChild(nameLabel);
           shortcutForm.appendChild(newKeyComboLabel);
           shortcutForm.appendChild(autoFillLabel);
           shortcutForm.appendChild(descriptionLabel);
           shortcutForm.appendChild(enabledLabel);
           shortcutForm.appendChild(removeButton);

           shortcutList.appendChild(shortcutForm);
            
            // Add an event listener to the remove button
            removeButton.addEventListener('click', function() {
            // Remove this shortcut from the array and update chrome.storage.local
            shortcuts.splice(i, 1);
            chrome.storage.local.set({shortcuts: shortcuts}, function() {
                console.log('Shortcuts updated');
                // Update the list of shortcuts
                loadShortcuts();
                });
            });
        }});
    }

   // Load the shortcuts when the page loads
   loadShortcuts();
});
