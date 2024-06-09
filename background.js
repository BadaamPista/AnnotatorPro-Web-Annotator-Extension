// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.local.set({ highlightColor: '#ffff00' });
//   });
  
//   chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['content.js']
//     });
//   });
//   chrome.commands.onCommand.addListener((command) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (command === 'highlight') {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           function: highlightSelectedText
//         });
//       } else if (command === 'add_note') {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           function: promptForNote
//         });
//       }
//     });
//   });
  
//   function highlightSelectedText() {
//     const selectedText = window.getSelection().toString();
//     if (selectedText.length > 0) {
//       chrome.storage.local.get(['highlightColor'], function(result) {
//         const highlightColor = result.highlightColor || '#ffff00';
//         const span = document.createElement('span');
//         span.style.backgroundColor = highlightColor;
//         span.className = 'annotation';
//         span.textContent = selectedText;
  
//         const range = window.getSelection().getRangeAt(0);
//         range.deleteContents();
//         range.insertNode(span);
//       });
//     }
//   }
  
//   function promptForNote() {
//     const note = prompt("Enter your note:");
//     if (note) {
//       chrome.runtime.sendMessage({ type: 'saveNote', note });
//     }
//   }
    




//   // NEWLY CODED
  

//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.from == 'content_script') {
//       chrome.tabs.captureVisibleTab(null, {}, function (image) {
//         sendResponse({screenshot: image});
//       });
//     }
//     return true;
//   })





// Set default highlight color on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ highlightColor: '#ffff00' });
});

// Execute content script when the action icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

// Listen for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (command === 'highlight') {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: highlightSelectedText
      });
    } else if (command === 'add_note') {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: promptForNote
      });
    }
  });
});

// Function to highlight selected text
function highlightSelectedText() {
  const selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    chrome.storage.local.get(['highlightColor'], function(result) {
      const highlightColor = result.highlightColor || '#ffff00';
      const span = document.createElement('span');
      span.style.backgroundColor = highlightColor;
      span.className = 'annotation';
      span.textContent = selectedText;

      const range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);
    });
  }
}

// Function to prompt for a note and save it
function promptForNote() {
  const note = prompt("Enter your note:");
  if (note) {
    chrome.runtime.sendMessage({ type: 'saveNote', note });
  }
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.from === 'content_script') {
    chrome.tabs.captureVisibleTab(null, {}, (image) => {
      sendResponse({ screenshot: image });
    });
    return true;  // Keeps the message channel open for sendResponse
  }
});
