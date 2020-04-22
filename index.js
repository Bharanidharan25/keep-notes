let container = document.getElementsByClassName('container')[0]
let currentlyEditedModal = undefined

function closeModal(){
    var modal =document.getElementsByClassName('modal')[0]
    modal.classList.remove('show')
}

function openModal() {
    var modal =document.getElementsByClassName('modal')[0]
    modal.classList.add('show') 
}

function createDiv(e){
    let title = document.getElementById('titleText')
    let body = document.getElementById('bodyText')
    var div = document.createElement('div')
    div.className = 'notesDiv'
    let notesTitle = document.createElement('div')
    notesTitle.className = 'notesTitle'
    let p = document.createElement('p')
    p.textContent = title.value
    

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
    notesTitle.appendChild(p)
    notesTitle.appendChild(editbtns)

    //note body and notes div
    let notesbody = document.createElement('div')
    notesbody.className = 'notesBody'
    

    let paraDiv = document.createElement('div')
    paraDiv.className = 'paraDiv'
    let p1 = document.createElement('p')
    var textnode = document.createTextNode(body.value); 
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

    title.value = ''
    body.value = ''

    closeModal()
}

function deleteItem(e){
    e.preventDefault()
    let item = e.currentTarget.parentElement.parentElement.parentElement
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
    editCloseModal()
}
