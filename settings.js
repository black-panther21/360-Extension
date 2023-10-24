document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('newShortcutForm');
    const shortcutList = document.getElementById('shortcutList');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const newKeyCombo = document.getElementById('newKeyCombo').value;
        const oldKeyCombo = document.getElementById('oldKeyCombo').value;
        const description = document.getElementById('description').value;
        const shortcutToggle = document.getElementById('shortcutToggle').checked;

        const shortcut = {
            name,
            newKeyCombo,
            oldKeyCombo,
            description,
            enabled: shortcutToggle
        };

        let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        shortcuts.push(shortcut);
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));

        // Clear the form
        form.reset();

        // Update the list of shortcuts
        loadShortcuts();
    });

    function loadShortcuts() {
        // Clear the existing list
        while (shortcutList.firstChild) {
            shortcutList.removeChild(shortcutList.firstChild);
        }

        // Load existing shortcuts
        let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        
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
            
            let oldKeyComboLabel = document.createElement('label');
            oldKeyComboLabel.textContent = 'Old Key Combination:';
            let oldKeyComboInput = document.createElement('input');
            oldKeyComboInput.type = 'text';
            oldKeyComboInput.value = shortcut.oldKeyCombo;
            oldKeyComboLabel.appendChild(oldKeyComboInput);
            
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
            
           removeButton.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Remove this shortcut from the array and update localStorage
                shortcuts.splice(i, 1);
                localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
                
                // Update the list of shortcuts
                loadShortcuts();
           });
           
           shortcutForm.appendChild(nameLabel);
           shortcutForm.appendChild(newKeyComboLabel);
           shortcutForm.appendChild(oldKeyComboLabel);
           shortcutForm.appendChild(descriptionLabel);
           shortcutForm.appendChild(enabledLabel);
           shortcutForm.appendChild(removeButton);

           shortcutList.appendChild(shortcutForm);
       }
   }

   // Load the shortcuts when the page loads
   loadShortcuts();
});
