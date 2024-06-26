
// let selectedText = '';
// let currentPageUrl = window.location.href;

// document.addEventListener('mouseup', (event) => {
//   selectedText = window.getSelection().toString();
//   if (selectedText.length > 0) {
//     chrome.storage.local.get(['highlightColor', 'annotations'], function(result) {
//       const highlightColor = result.highlightColor || '#ffff00';
//       const annotations = result.annotations || {};

//       const span = document.createElement('span');
//       span.style.backgroundColor = highlightColor;
//       span.className = 'annotation';
//       span.textContent = selectedText;

//       const range = window.getSelection().getRangeAt(0);
//       range.deleteContents();
//       range.insertNode(span);

//       const newAnnotation = {
//         text: selectedText,
//         color: highlightColor,
//         url: currentPageUrl,
//         position: {
//           start: range.startOffset,
//           end: range.endOffset,
//           parentXPath: getXPath(range.startContainer.parentNode)
//         }
//       };

//       if (!annotations[currentPageUrl]) {
//         annotations[currentPageUrl] = [];
//       }
//       annotations[currentPageUrl].push(newAnnotation);

//       chrome.storage.local.set({ annotations });
//     });
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'saveNote') {
//     const notes = document.createElement('div');
//     notes.className = 'annotation-note';
//     notes.textContent = request.note;
//     document.body.appendChild(notes);

//     chrome.storage.local.get(['annotations'], function(result) {
//       const annotations = result.annotations || {};
//       if (!annotations[currentPageUrl]) {
//         annotations[currentPageUrl] = [];
//       }
//       annotations[currentPageUrl].push({
//         note: request.note,
//         url: currentPageUrl
//       });
//       chrome.storage.local.set({ annotations });
//       sendResponse({ status: 'note saved' });
//     });
//   }
// });

// function getXPath(element) {
//   if (element.id !== '') {
//     return 'id("' + element.id + '")';
//   }
//   if (element === document.body) {
//     return element.tagName;
//   }
//   let ix = 0;
//   const siblings = element.parentNode.childNodes;
//   for (let i = 0; i < siblings.length; i++) {
//     const sibling = siblings[i];
//     if (sibling === element) {
//       return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
//     }
//     if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
//       ix++;
//     }
//   }
//   return null;
// }

// function highlightSavedAnnotations() {
//   chrome.storage.local.get(['annotations'], function(result) {
//     const annotations = result.annotations || {};
//     if (annotations[currentPageUrl]) {
//       annotations[currentPageUrl].forEach(annotation => {
//         if (annotation.text) {
//           const range = document.createRange();
//           const parent = document.evaluate(annotation.position.parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//           range.setStart(parent.childNodes[0], annotation.position.start);
//           range.setEnd(parent.childNodes[0], annotation.position.end);

//           const span = document.createElement('span');
//           span.style.backgroundColor = annotation.color;
//           span.className = 'annotation';
//           span.textContent = annotation.text;

//           range.deleteContents();
//           range.insertNode(span);
//         } else if (annotation.note) {
//           const notes = document.createElement('div');
//           notes.className = 'annotation-note';
//           notes.textContent = annotation.note;
//           document.body.appendChild(notes);
//         }
//       });
//     }
//   });
// }

// highlightSavedAnnotations();





// let selectedText = '';
// let currentPageUrl = window.location.href;

// document.addEventListener('mouseup', (event) => {
//   selectedText = window.getSelection().toString();
//   if (selectedText.length > 0) {
//     chrome.storage.local.get(['highlightColor', 'annotations'], function(result) {
//       const highlightColor = result.highlightColor || '#ffff00';
//       const annotations = result.annotations || {};

//       const span = document.createElement('span');
//       span.style.backgroundColor = highlightColor;
//       span.className = 'annotation';
//       span.textContent = selectedText;

//       const range = window.getSelection().getRangeAt(0);
//       range.deleteContents();
//       range.insertNode(span);

//       const newAnnotation = {
//         text: selectedText,
//         color: highlightColor,
//         url: currentPageUrl,
//         position: {
//           start: range.startOffset,
//           end: range.startOffset + selectedText.length,
//           parentXPath: getXPath(span.parentNode)
//         }
//       };

//       if (!annotations[currentPageUrl]) {
//         annotations[currentPageUrl] = [];
//       }
//       annotations[currentPageUrl].push(newAnnotation);

//       chrome.storage.local.set({ annotations });
//     });
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'saveNote') {
//     const notes = document.createElement('div');
//     notes.className = 'annotation-note';
//     notes.textContent = request.note;
//     document.body.appendChild(notes);

//     chrome.storage.local.get(['annotations'], function(result) {
//       const annotations = result.annotations || {};
//       if (!annotations[currentPageUrl]) {
//         annotations[currentPageUrl] = [];
//       }
//       annotations[currentPageUrl].push({
//         note: request.note,
//         url: currentPageUrl
//       });
//       chrome.storage.local.set({ annotations });
//       sendResponse({ status: 'note saved' });
//     });
//   }
// });

// function getXPath(element) {
//   if (element.id) {
//     return `id("${element.id}")`;
//   }
//   if (element === document.body) {
//     return element.tagName;
//   }

//   let ix = 0;
//   const siblings = element.parentNode.childNodes;
//   for (let i = 0; i < siblings.length; i++) {
//     const sibling = siblings[i];
//     if (sibling === element) {
//       return `${getXPath(element.parentNode)}/${element.tagName}[${ix + 1}]`;
//     }
//     if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
//       ix++;
//     }
//   }
//   return null;
// }

// function highlightSavedAnnotations() {
//   chrome.storage.local.get(['annotations'], function(result) {
//     const annotations = result.annotations || {};
//     if (annotations[currentPageUrl]) {
//       annotations[currentPageUrl].forEach(annotation => {
//         if (annotation.text) {
//           const range = document.createRange();
//           const parent = document.evaluate(annotation.position.parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

//           const startNode = findTextNode(parent, annotation.position.start);
//           const endNode = findTextNode(parent, annotation.position.end);

//           range.setStart(startNode.node, startNode.offset);
//           range.setEnd(endNode.node, endNode.offset);

//           const span = document.createElement('span');
//           span.style.backgroundColor = annotation.color;
//           span.className = 'annotation';
//           span.textContent = annotation.text;

//           range.deleteContents();
//           range.insertNode(span);
//         } else if (annotation.note) {
//           const notes = document.createElement('div');
//           notes.className = 'annotation-note';
//           notes.textContent = annotation.note;
//           document.body.appendChild(notes);
//         }
//       });
//     }
//   });
// }

// function findTextNode(parent, offset) {
//   let node;
//   let count = 0;

//   function traverseNodes(currentNode) {
//     if (currentNode.nodeType === Node.TEXT_NODE) {
//       const length = currentNode.nodeValue.length;
//       if (count + length >= offset) {
//         node = currentNode;
//         return true;
//       }
//       count += length;
//     } else if (currentNode.childNodes) {
//       for (let i = 0; i < currentNode.childNodes.length; i++) {
//         if (traverseNodes(currentNode.childNodes[i])) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }

//   traverseNodes(parent);
//   return { node: node, offset: offset - count };
// }

// highlightSavedAnnotations();



//NEWLY CODED
let selectedText = '';
let currentPageUrl = window.location.href;

document.addEventListener('mouseup', (event) => {
  selectedText = window.getSelection().toString();
  if (selectedText.length > 0) {
    chrome.storage.local.get(['highlightColor', 'annotations'], function(result) {
      const highlightColor = result.highlightColor || '#ffff00';
      const annotations = result.annotations || {};

      const span = document.createElement('span');
      span.style.backgroundColor = highlightColor;
      span.className = 'annotation';
      span.textContent = selectedText;

      const range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);

      const newAnnotation = {
        text: selectedText,
        color: highlightColor,
        url: currentPageUrl,
        position: {
          start: range.startOffset,
          end: range.startOffset + selectedText.length,
          parentXPath: getXPath(span.parentNode)
        }
      };

      if (!annotations[currentPageUrl]) {
        annotations[currentPageUrl] = [];
      }
      annotations[currentPageUrl].push(newAnnotation);

      chrome.storage.local.set({ annotations });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'saveNote') {
    const note = request.note.trim();
    if (note) {
      const notes = document.createElement('div');
      notes.className = 'annotation-note';
      notes.textContent = note;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-note-btn';
      deleteBtn.addEventListener('click', () => {
        notes.remove();
        chrome.storage.local.get(['annotations'], function(result) {
          const annotations = result.annotations || {};
          annotations[currentPageUrl] = annotations[currentPageUrl].filter(
            (annotation) => annotation.note !== note
          );
          chrome.storage.local.set({ annotations });
        });
      });
      notes.appendChild(deleteBtn);
      document.body.appendChild(notes);

      chrome.storage.local.get(['annotations'], function(result) {
        const annotations = result.annotations || {};
        if (!annotations[currentPageUrl]) {
          annotations[currentPageUrl] = [];
        }
        annotations[currentPageUrl].push({
          note: note,
          url: currentPageUrl
        });
        chrome.storage.local.set({ annotations });
        sendResponse({ status: 'note saved' });
      });
    }
  }else if (request.type === 'deleteAllNotes') {
    document.querySelectorAll('.annotation-note').forEach(note => note.remove());
    sendResponse({ status: 'notes deleted' });
  }
});

function getXPath(element) {
  if (element.id) {
    return `id("${element.id}")`;
  }
  if (element === document.body) {
    return element.tagName;
  }

  let ix = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return `${getXPath(element.parentNode)}/${element.tagName}[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
  return null;
}

function highlightSavedAnnotations() {
  chrome.storage.local.get(['annotations'], function(result) {
    const annotations = result.annotations || {};
    if (annotations[currentPageUrl]) {
      annotations[currentPageUrl].forEach(annotation => {
        if (annotation.text) {
          const range = document.createRange();
          const parent = document.evaluate(annotation.position.parentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          const startNode = findTextNode(parent, annotation.position.start);
          const endNode = findTextNode(parent, annotation.position.end);

          range.setStart(startNode.node, startNode.offset);
          range.setEnd(endNode.node, endNode.offset);

          const span = document.createElement('span');
          span.style.backgroundColor = annotation.color;
          span.className = 'annotation';
          span.textContent = annotation.text;

          range.deleteContents();
          range.insertNode(span);
        } else if (annotation.note) {
          const notes = document.createElement('div');
          notes.className = 'annotation-note';
          notes.textContent = annotation.note;
          document.body.appendChild(notes);
        }
      });
    }
  });
}

function findTextNode(parent, offset) {
  let node;
  let count = 0;

  function traverseNodes(currentNode) {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      const length = currentNode.nodeValue.length;
      if (count + length >= offset) {
        node = currentNode;
        return true;
      }
      count += length;
    } else if (currentNode.childNodes) {
      for (let i = 0; i < currentNode.childNodes.length; i++) {
        if (traverseNodes(currentNode.childNodes[i])) {
          return true;
        }
      }
    }
    return false;
  }

  traverseNodes(parent);
  return { node: node, offset: offset - count };
}

highlightSavedAnnotations();

