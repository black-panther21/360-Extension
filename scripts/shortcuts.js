document.addEventListener('keydown', (event) => {
    // get the current state of the extension from chrome.storage.local
    chrome.storage.local.get(['enabled', 'shortcuts'], function(result) {
        let enabled = result.enabled || false;
        let shortcuts = result.shortcuts || [];
        // console.log(enabled);    

        // if the extension is enabled
        if (enabled) {
            // prevent the default action of the keydown event
            event.preventDefault();

            // parse the keydown event
            let keyCombo = {
                metaKey: event.metaKey,
                altKey: event.altKey,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
                code: event.code
            };

            // log the keydown event
             console.log("User pressed: ", keyCombo);

            // log the list of shortcuts
            // console.log(shortcuts);

            // loop through the shortcuts
            for (let shortcut of shortcuts) {
                // parse the new key combo such as 'Cmd+Shift+c' is the equivalent of 'Meta+Shift+c'
                let newKeyCombo = shortcut.newKeyCombo.split('+');
                let newKeyComboParsed = {
                    metaKey: newKeyCombo.includes('Cmd') || newKeyCombo.includes('Meta'),
                    altKey: newKeyCombo.includes('Alt'),
                    ctrlKey: newKeyCombo.includes('Ctrl'),
                    shiftKey: newKeyCombo.includes('Shift'),
                    code: 'Key' + newKeyCombo[newKeyCombo.length - 1].toUpperCase()
                };

                // log the new key combo
                console.log("Compared against: ",newKeyComboParsed);

                // compare the keydown event to the new key combo
                let newKeyComboMatched = true;
                for (let key in newKeyComboParsed) {
                    if (newKeyComboParsed[key] !== keyCombo[key]) {
                        newKeyComboMatched = false;
                    }
                }

                // if the new key combo matches, parse the old key combo
                if (newKeyComboMatched) {
                    console.log("Matched: ", shortcut.name);
                    let oldKeyCombo = shortcut.oldKeyCombo.split('+');
                    let oldKeyComboParsed = {
                        metaKey: oldKeyCombo.includes('Cmd') || oldKeyCombo.includes('Meta'),
                        altKey: oldKeyCombo.includes('Alt'),
                        ctrlKey: oldKeyCombo.includes('Ctrl'),
                        shiftKey: oldKeyCombo.includes('Shift'),
                        code: 'Key' + oldKeyCombo[oldKeyCombo.length - 1].toUpperCase()
                    };

                    // execute the old key combo
                    var keyboardEvent = new KeyboardEvent('keydown', {
                        ctrlKey: oldKeyComboParsed.ctrlKey, 
                        metaKey: oldKeyComboParsed.metaKey, 
                        shiftKey: oldKeyComboParsed.shiftKey, 
                        code: oldKeyComboParsed.code
                    });

                    console.log("Executing: ", oldKeyComboParsed);
                    document.dispatchEvent(keyboardEvent);
                }
            }
        }
    });
});

