
  
// document.getElementById('highlight-btn').addEventListener('click', () => {
//     const highlightColor = document.getElementById('highlight-color').value;
//     chrome.storage.local.set({ highlightColor });
//   });
  
//   document.getElementById('save-note-btn').addEventListener('click', () => {
//     const note = document.getElementById('note').value;
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { type: 'saveNote', note }, (response) => {
//         if (response.status === 'note saved') {
//           document.getElementById('note').value = '';
//           displayAnnotations();
//         }
//       });
//     });
//   });
  
//   document.getElementById('search-btn').addEventListener('click', () => {
//     const query = document.getElementById('search').value.toLowerCase();
//     displayAnnotations(query);
//   });
  
//   function displayAnnotations(query = '') {
//     chrome.storage.local.get(['annotations'], function(result) {
//       const annotationsList = document.getElementById('annotations-list');
//       annotationsList.innerHTML = '';
//       const annotations = result.annotations || {};
//       Object.keys(annotations).forEach(pageUrl => {
//         annotations[pageUrl].forEach(annotation => {
//           if (annotation.text && annotation.text.toLowerCase().includes(query) || annotation.note && annotation.note.toLowerCase().includes(query)) {
//             const annotationItem = document.createElement('div');
//             annotationItem.className = 'annotation-item';
//             annotationItem.textContent = annotation.text || annotation.note;
//             annotationsList.appendChild(annotationItem);
//           }
//         });
//       });
//     });
//   }
//   document.getElementById('export-btn').addEventListener('click', () => {
//     chrome.storage.local.get(['annotations'], function(result) {
//       const annotations = result.annotations || {};
//       const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
  
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'annotations.json';
//       a.click();
//     });
//   });
  
  
//   displayAnnotations();
 



// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('highlight-btn').addEventListener('click', () => {
//     const highlightColor = document.getElementById('highlight-color').value;
//     chrome.storage.local.set({ highlightColor });
//   });

//   document.getElementById('save-note-btn').addEventListener('click', () => {
//     const note = document.getElementById('note').value.trim();
//     if (note) {
//       chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { type: 'saveNote', note }, (response) => {
//           if (response && response.status === 'note saved') {
//             document.getElementById('note').value = '';
//             displayAnnotations();
//           }
//         });
//       });
//     }
//   });

//   document.getElementById('search-btn').addEventListener('click', () => {
//     const query = document.getElementById('search').value.toLowerCase();
//     displayAnnotations(query);
//   });

//   document.getElementById('export-btn').addEventListener('click', () => {
//     chrome.storage.local.get(['annotations'], function(result) {
//       const annotations = result.annotations || {};
//       const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'annotations.json';
//       a.click();
//       URL.revokeObjectURL(url); // Clean up the object URL after downloading
//     });
//   });

//   displayAnnotations();
// });

// function displayAnnotations(query = '') {
//   chrome.storage.local.get(['annotations'], function(result) {
//     const annotationsList = document.getElementById('annotations-list');
//     annotationsList.innerHTML = '';
//     const annotations = result.annotations || {};

//     Object.keys(annotations).forEach(pageUrl => {
//       annotations[pageUrl].forEach(annotation => {
//         if (annotation.text && annotation.text.toLowerCase().includes(query) || annotation.note && annotation.note.toLowerCase().includes(query)) {
//           const annotationItem = document.createElement('div');
//           annotationItem.className = 'annotation-item';
//           annotationItem.textContent = annotation.text || annotation.note;
//           annotationsList.appendChild(annotationItem);
//         }
//       });
//     });
//   });
// }




//UPDATED CODE

document.addEventListener('DOMContentLoaded', () => {
  // Event listeners for buttons
  document.getElementById('highlight-btn').addEventListener('click', () => {
      const highlightColor = document.getElementById('highlight-color').value;
      chrome.storage.local.set({ highlightColor });
  });

  document.getElementById('save-note-btn').addEventListener('click', () => {
      const note = document.getElementById('note').value.trim();
      if (note) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, { type: 'saveNote', note }, (response) => {
                  if (response && response.status === 'note saved') {
                      document.getElementById('note').value = '';
                      displayAnnotations();
                  }
              });
          });
      }
  });

  document.getElementById('search-btn').addEventListener('click', () => {
      const query = document.getElementById('search').value.toLowerCase();
      displayAnnotations(query);
  });

  document.getElementById('export-btn').addEventListener('click', () => {
      chrome.storage.local.get(['annotations'], function (result) {
          const annotations = result.annotations || {};
          const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'annotations.json';
          a.click();
          URL.revokeObjectURL(url); // Clean up the object URL after downloading
      });
  });

  document.getElementById('delete-notes-btn').addEventListener('click', () => {
      chrome.storage.local.get(['annotations'], function (result) {
          const annotations = result.annotations || {};
          const currentPageUrl = new URL(window.location.href).href;

          // Remove all notes from the annotations object
          annotations[currentPageUrl] = annotations[currentPageUrl].filter(annotation => !annotation.note);

          chrome.storage.local.set({ annotations }, () => {
              displayAnnotations();
          });
      });
  });

  displayAnnotations();
});

function displayAnnotations(query = '', category = '') {
  chrome.storage.local.get(['annotations'], function (result) {
      const annotationsList = document.getElementById('annotations-list');
      annotationsList.innerHTML = '';
      const annotations = result.annotations || {};

      const currentPageUrl = new URL(window.location.href).href;
      const currentPageAnnotations = annotations[currentPageUrl] || [];

      // Filter annotations based on query and category
      const filteredAnnotations = currentPageAnnotations.filter(annotation => {
          if (query && annotation.text && !annotation.note) {
              return annotation.text.toLowerCase().includes(query);
          } else if (query && annotation.note) {
              return annotation.note.toLowerCase().includes(query);
          } else if (category) {
              return annotation.category === category;
          }
          return true;
      });

      // Display filtered annotations
      filteredAnnotations.forEach(annotation => {
          const annotationItem = document.createElement('div');
          annotationItem.className = 'annotation-item';

          if (annotation.text) {
              annotationItem.textContent = annotation.text;
          } else if (annotation.note) {
              const noteContent = document.createElement('div');
              noteContent.className = 'annotation-note';
              noteContent.textContent = annotation.note;

              // Delete note button
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = 'Delete';
              deleteBtn.className = 'btn btn-sm btn-danger delete-note-btn';
              deleteBtn.addEventListener('click', () => {
                  deleteNote(annotation);
              });
              noteContent.appendChild(deleteBtn);

              annotationItem.appendChild(noteContent);
          }

          annotationsList.appendChild(annotationItem);
      });

      // Update category filter options
      updateCategoryFilter(currentPageAnnotations);
  });
}

function deleteNote(annotation) {
  chrome.storage.local.get(['annotations'], function (result) {
      const annotations = result.annotations || {};
      const currentPageUrl = new URL(window.location.href).href;

      annotations[currentPageUrl] = annotations[currentPageUrl].filter(item => {
          if (item.text) {
              return item.text !== annotation.text;
          } else if (item.note) {
              return item.note !== annotation.note;
          }
          return true;
      });

      chrome.storage.local.set({ annotations }, () => {
          displayAnnotations();
      });
  });
}

function updateCategoryFilter(annotations) {
  const categories = annotations.reduce((acc, annotation) => {
      if (annotation.category && !acc.includes(annotation.category)) {
          acc.push(annotation.category);
      }
      return acc;
  }, []);

  const filterCategorySelect = document.getElementById('filter-category');
  filterCategorySelect.innerHTML = '<option value="">All</option>';
  categories.forEach(category => {
      filterCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
  });

  filterCategorySelect.addEventListener('change', () => {
      const selectedCategory = filterCategorySelect.value;
      displayAnnotations('', selectedCategory);
  });
}
