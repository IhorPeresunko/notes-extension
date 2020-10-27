const editor = new Quill('#editor-container', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic'],
    ],
  },
  theme: 'snow',
})

editor.on('text-change', (delta, source) => {
  chrome.storage.sync.set(
    { 'editorContents': editor.getContents() },
    () => {},
  )
})

chrome.storage.sync.get('editorContents', (itemsStoredInChrome) => {
  if (itemsStoredInChrome) {
    editor.setContents(itemsStoredInChrome.editorContents)
  }
})
