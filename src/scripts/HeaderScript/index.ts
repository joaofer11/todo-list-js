// VARIABLES
const headerToolsContainer = document.querySelector('[data-js="header-tools-container"]')!
const popupInputWrapper = document.querySelector('[data-js="popup-input-wrapper"]')! as HTMLDivElement
export const taskContainer = document.querySelector('[data-js="task-container"]')!


const menuBtn = document.querySelector('[data-js="menu-btn"]')!
const closeMenuWrapper = document.querySelector('[data-js="close-menu-wrapper"]')! as HTMLDivElement
const openTaskPopupBtn = document.querySelector('[data-js="open-task-popup-btn"]')!
const addTaskBtn = document.querySelector('[data-js="add-task-btn"]')!
const popupWarningMessage = document.querySelector('[data-js="popup-warning-message"]')! as HTMLDivElement


// TYPES 
type TGenericObj = Record<string, any>


// FUNCTION TREE
const createDomElement = (name: string) => (atts: TGenericObj) => (className: string[]) => {
   const element = document.createElement(name)
   const attsAsArray = Object.entries(atts)
   
   attsAsArray.forEach(([att, value]) => element.setAttribute(att, value))
   element.classList.add(...className)
   
   return element
}

const createTaskItem = (taskInputContent: string) => {
   const taskItem = createDomElement('li')({})(['task-item'])
   
   const customCheckbox = createDomElement('label')({'data-btn': ''})(['custom-checkbox'])
   const checkboxInput = createDomElement('input')({type: 'checkbox'})([])
   const checkmark = createDomElement('span')({})(['checkmark'])
   
   customCheckbox.append(checkboxInput, checkmark)
   
   const customTask = createDomElement('div')({})(['custom-task'])
   const closingWrapper = createDomElement('div')({'data-js': 'closing-wrapper'})(['closing-wrapper'])
   const taskContent = createDomElement('input')({type: 'text', disabled: 'disabled', value: taskInputContent})(['task-content'])
   const renameTaskBtn = createDomElement('button')({'data-btn': '', 'data-js': 'rename-task-btn'})(['rename-task-btn'])
   renameTaskBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

   customTask.append(closingWrapper, taskContent, renameTaskBtn)
   
   taskItem.append(customCheckbox, customTask)
   return taskItem
}



const insertInputContentInTaskContainer = (taskInputContent: string) => {
   const taskItem = createTaskItem(taskInputContent)
   taskContainer.appendChild(taskItem)
}

const checkIfInputIsFilled = () => {
   const taskInputContent = document.querySelector('[data-js="task-input"]')! as HTMLInputElement
   const itsInputFilled = taskInputContent.value !== ''
   
   if (itsInputFilled) {
      insertInputContentInTaskContainer(taskInputContent.value)
      popupWarningMessage.style.display = 'none'
      taskInputContent.value = ''
      return
   }
   
   popupWarningMessage.style.display = 'block'
}

const closePopup = () => {
   const taskInputContent = document.querySelector('[data-js="task-input"]') !as HTMLInputElement

   popupInputWrapper.style.display = 'none'
   taskInputContent.value = ''
}

const runCorrespondingFunc = (clickedBtn: string) => ({
   'close-popup-btn': closePopup,
   'popup-input-wrapper': closePopup,
   'add-task-btn': checkIfInputIsFilled
})[clickedBtn]!()

const handlePopupBtnClicked = (e: any) => {
   const allowedBtns = ['close-popup-btn', 'add-task-btn', 'popup-input-wrapper']
   const clickedBtn = e.target.dataset.js
   
   const itsAnAllowedBtn = allowedBtns.some(btn => btn === clickedBtn)
   
   
   if (itsAnAllowedBtn) {
      runCorrespondingFunc(clickedBtn)
   }
}


// EVENT LISTENERS
menuBtn.addEventListener('touchstart', () => {
   headerToolsContainer.classList.toggle('active')
   closeMenuWrapper.style.display = 'block'
})

closeMenuWrapper.addEventListener('touchstart', () => {
   headerToolsContainer.classList.remove('active')
   closeMenuWrapper.style.display = 'none'
})


openTaskPopupBtn.addEventListener('touchstart', () => {
   popupInputWrapper.style.display = 'flex'
})

popupInputWrapper.addEventListener('touchstart', handlePopupBtnClicked)
