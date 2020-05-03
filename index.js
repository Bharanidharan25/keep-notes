let container = document.getElementsByClassName('container')[0]
let currentlyEditedModal = undefined
let notes = []

function closeModal(){
    var modal =document.getElementsByClassName('modal')[0]
    modal.classList.remove('show')
}

function openModal() {
    var modal =document.getElementsByClassName('modal')[0]
    modal.classList.add('show') 
}

function createNote(id, title, body){
    var div = document.createElement('div')
    div.className = 'notesDiv'
    div.id=String(id)
    let notesTitle = document.createElement('div')
    notesTitle.className = 'notesTitle'
    let titleWrapper = document.createElement('div')
    titleWrapper.className = 'titleWrapper'
    let p = document.createElement('p')
    p.textContent = title
    titleWrapper.appendChild(p)
    

    //edit buttons
    let editbtns = document.createElement('div')
    editbtns.className = "editBtns"
    let a = document.createElement('a')
    let i =document.createElement('i')
    i.className='fa fa-trash'
    let a1 = document.createElement('a')
    let i1 = document.createElement('i')
    i1.className = 'fa fa-edit'
    a.appendChild(i)
    a.id = 'delete'
    a.onclick = (e)=>deleteItem(e)
    a.className = 'icons'
    a1.appendChild(i1)
    a1.onclick = (e) => editOpenModal(e)
    a1.className = 'icons'
    editbtns.appendChild(a)
    editbtns.appendChild(a1)
    notesTitle.appendChild(titleWrapper)
    notesTitle.appendChild(editbtns)

    //note body and notes div
    let notesbody = document.createElement('div')
    notesbody.className = 'notesBody'
    let paraDiv = document.createElement('div')
    paraDiv.className = 'paraDiv'
    let p1 = document.createElement('p')
    var textnode = document.createTextNode(body); 
    p1.appendChild(textnode)


    let readMore = document.createElement('a')
    readMore.className ='readMore'
    readMore.textContent = 'Read more'
    readMore.onclick = readMoreOpenModal

    paraDiv.appendChild(p1)
    notesbody.appendChild(paraDiv)
    notesbody.appendChild(readMore)
    div.appendChild(notesTitle)
    div.appendChild(notesbody)
    container.appendChild(div)
    return ({title,body})
} 

function createDiv(e){
    id = Math.floor(Math.random()*1000000)
    let title = document.getElementById('titleText')
    let body = document.getElementById('bodyText')
    const note = createNote(id,title.value,body.value)
    title.value = ''
    body.value = ''
    notes.push({...note, id})
    localStorage.setItem('keepNotes',JSON.stringify(notes))
    closeModal()
}

function removeNote(id){
    notes = notes.filter(note => note.id != id)
    localStorage.setItem('keepNotes', JSON.stringify(notes))
}

function updateNote(id, title, body){
    console.log(id,title,body)
    notes.map(note => {
        if(note.id == id){
            note.title=title
            note.body=body
        }
        return note
    })
    localStorage.setItem('keepNotes', JSON.stringify(notes))
}

function deleteItem(e){
    e.preventDefault()
    let item = e.currentTarget.parentElement.parentElement.parentElement
    removeNote(item.id)
    container.removeChild(item)
}

function readMoreOpenModal(e){
    e.preventDefault()
    let modal = document.getElementById('readmoreModal')
    modal.classList.add('show')
    let text = e.currentTarget.parentElement.getElementsByClassName('paraDiv')[0].textContent
    let body = document.getElementsByClassName('readMoreBody')[0]
    body.textContent = text
    let title = document.getElementById('readmoreTitle')
    title.textContent = e.currentTarget.parentElement.parentElement.getElementsByClassName('notesTitle')[0].textContent

}

function readMoreCloseModal(e){
    let modal = document.getElementById('readmoreModal')
    modal.classList.remove('show') 
}


function editOpenModal(e){
    var modal =document.getElementById('editModal')
    modal.classList.add('show') 
    let modalTitleInput = modal.getElementsByClassName('titleText')[0]
    let modalBodyInput = modal.getElementsByClassName('bodyText')[0]
    modalTitleInput.value = e.currentTarget.parentElement.parentElement.textContent
    modalBodyInput.value = e.currentTarget.parentElement.parentElement.parentElement.getElementsByClassName('paraDiv')[0].textContent
    currentlyEditedModal = e.currentTarget.parentElement.parentElement
}

function editCloseModal(){
    var modal =document.getElementById('editModal')
    modal.classList.remove('show')
}


function editDiv(){ 
    var modal =document.getElementById('editModal')
    const editedTitle = modal.getElementsByClassName('titleText')[0].value
    const editedBody = modal.getElementsByClassName('bodyText')[0].value
    currentlyEditedModal.firstChild.textContent = editedTitle
    currentlyEditedModal.parentElement.getElementsByClassName('paraDiv')[0].textContent = editedBody
    updateNote(currentlyEditedModal.parentElement.id, editedTitle, editedBody)
    editCloseModal()
}

window.onload = ()=>{
    if(!localStorage.getItem('keepNotes')){
        localStorage.setItem('keepNotes',JSON.stringify([]))
    }else{
        notes = JSON.parse(localStorage.getItem('keepNotes'))
    }
    for (let note of notes){
        createNote(note.id, note.title, note.body)
    }
}
