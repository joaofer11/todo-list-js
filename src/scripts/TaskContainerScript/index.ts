import { taskContainer } from '../HeaderScript'
const renameTaskBtn = document.querySelector('[data-js="rename-task-btn"]')! as HTMLButtonElement

// TYPES
type TTaskElement = HTMLInputElement | HTMLButtonElement


// FUNCTION TREE
const blockInputTextField = (target: TTaskElement) => {
   const closingWrapper = target
   const inputElement = closingWrapper.nextElementSibling!
   const renameTaskBtn = inputElement.nextElementSibling! as HTMLButtonElement
   
   closingWrapper.style.display = 'none'
   
   inputElement.setAttribute('disabled', 'disabled')
   setTimeout(() => renameTaskBtn.style.display = 'flex', 200)
}

const openInputTextField = (target: TTaskElement) => {
   const renameTaskBtn = target
   const inputElement = renameTaskBtn.previousElementSibling! as HTMLInputElement
   const closingWrapper = inputElement.previousElementSibling! as HTMLDivElement
   
   renameTaskBtn.style.display = 'none'
   inputElement.removeAttribute('disabled')
   inputElement.focus()
   closingWrapper.style.display = 'block'
}

const toggleInputTextField = (clickedElement: string, { target }: any) => ({
   'closing-wrapper': blockInputTextField,
   'rename-task-btn': openInputTextField
})[clickedElement]!(target)


const handleClickedElement = (e: any) => {
   const allowedElements = ['closing-wrapper', 'rename-task-btn']
   const clickedElement = e.target.dataset.js
   
   const itsAnAllowedElement = allowedElements.some(element => element === clickedElement)
   
   if (itsAnAllowedElement) {
      toggleInputTextField(clickedElement, e)
   }
}


// EVENT LISTENERS
taskContainer.addEventListener('touchstart', handleClickedElement)