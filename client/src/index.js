// let notes = [
// {
// id: 11,
// title: "Super torrens.",
// body: "Verbera voro ater. Aggero aqua quia. Eligendi deporto reprehenderit.\nVolo vitium commemoro. Annus appello ascit. Umbra speculum capto.\nSpeculum conculco textilis. Adinventitias suffragium avaritia. Vos dedico degenero."
// },
// {
// id: 12,
// title: "Taceo defaeco.",
// body: "Custodia vicissitudo alii. Dolor perferendis adsidue. Tantillus crustulum deserunt.\nAdvoco angulus pecunia. Talus triginta commodi. Enim vespillo ceno.\nBellicus amicitia aeternus. Sumo alioqui et. Velit textilis coruscus."
// }
// ]

const newNoteForm = document.querySelector('#add-note-form')
const note_listEl = document.querySelector('#all-notes')
const titleInput = document.querySelector('#title-input')
const noteInput = document.querySelector('#noteInput')
const deleteBtn = document.querySelector('#delete')


const notesUrl = 'http://localhost:3000/api/v1/notes';
  function getNotes(){
    return fetch(notesUrl)
    .then(resp => resp.json())
}

  const state = {
    notes: []
}

function renderNote(note){
  const divEl = document.createElement('div')
  divEl.innerHTML = `
  <h2>Shit to do: ${note.title}</h2>
  <p>${note.body}</p>
  <button data-id=${note.id} type="button" class="btn btn-primary delete">Delete Note</button>
  `

  note_listEl.appendChild(divEl)

}


  function renderNotes(notes){
    notes.forEach(note => renderNote(note))
}

//   function stateNotes(notes){
//     notes.forEach(note => state.notes.push(note))
// }

  function updateNoteList(){
    note_listEl.innerHTML = ''
    renderNotes(state.notes)
}


getNotes().then(noteData => {
  state.notes = noteData
  renderNotes(noteData)
})

function deleteNote(id){
	   const note = state.notes.filter(note => note.id !== id)
     state.notes = note
	   updateNoteList()
}


newNoteForm.addEventListener('submit', event => {
event.preventDefault()

const note = {
	title: titleInput.value,
	body: noteInput.value,
}

  newNoteForm.reset()

  createNote(note)
    .then(note => {
      state.notes.push(note)
	    renderNote(note)
  })
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    // only triggers if the element we clicked on has .delete
    const id = parseInt(event.target.dataset.id)
    deleteNote(id)
    deleteNoteDB(id)
  }
})

function createNote(note){
  return fetch(notesUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(note)
  }).then(resp => resp.json())
  }

function deleteNoteDB(id){
  return fetch(`http://localhost:3000/api/v1/notes/${id}`, {
    method:'DELETE',
    headers: {'Content-Type': 'application/json'},
  })
}

function setbg(color)
{
document.getElementById('noteInput').style.background=color
}
