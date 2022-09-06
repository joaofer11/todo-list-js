// VARIABLES

// const headerToolsContainer = document.querySelector('[data-js="header-tools-container"]')!
// const popupInputWrapper = document.querySelector('[data-js="popup-input-wrapper"]')! as HTMLDivElement
// const taskRemovalConfirmationBox = document.querySelector('[data-js="task-removal-confirmation-box"]')! as HTMLDivElement
// const taskContainer = document.querySelector('[data-js="task-container"]')!

// const popupWarningMessage = document.querySelector('[data-js="popup-warning-message"]')! as HTMLDivElement

const headerNavEl = document.querySelector('[data-js="header__nav"]')!





// FUNCTION TREE
// const createDomElement = (name: string) => (atts: TGenericObj) => (className: string[]) => {
//    const element = document.createElement(name)
//    const attsAsArray = Object.entries(atts)
   
//    attsAsArray.forEach(([att, value]) => element.setAttribute(att, value))
//    element.classList.add(...className)
   
//    return element
// }

// const createTaskItem = (taskInputContent: string) => {
//    const taskItem = createDomElement('li')({})(['task-item'])
   
//    const checkboxWrapper = createDomElement('label')({'data-btn': ''})(['checkbox-wrapper'])
//    const checkboxInput = createDomElement('input')({type: 'checkbox'})([])
//    const customCheckbox = createDomElement('span')({'data-js': 'custom-checkbox'})(['checkmark'])
   
//    checkboxWrapper.append(checkboxInput, customCheckbox)
   
//    const customTask = createDomElement('div')({})(['custom-task'])
//    const closingWrapper = createDomElement('div')({'data-js': 'closing-wrapper'})(['closing-wrapper'])
//    const taskContent = createDomElement('input')({type: 'text', disabled: 'disabled', value: taskInputContent})(['task-content'])
//    const renameTaskBtn = createDomElement('button')({'data-btn': '', 'data-js': 'rename-task-btn'})(['rename-task-btn'])
//    renameTaskBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

//    customTask.append(closingWrapper, taskContent, renameTaskBtn)
   
//    taskItem.append(checkboxWrapper, customTask)
//    return taskItem
// }

// const insertInputContentInTaskContainer = (taskInputContent: string) => {
//    const taskItem = createTaskItem(taskInputContent)
//    taskContainer.appendChild(taskItem)
// }

// const closeTaskRemovalConfirmationBox = () => {
//    const customCheckboxes = document.querySelectorAll('[data-js="custom-checkbox"]')
   
//    taskRemovalConfirmationBox.style.display = 'none'
//    customCheckboxes.forEach(checkbox => checkbox.classList.replace('uncheckmark', 'checkmark'))
// }

// const checkIfInputIsFilled = () => {
//    const taskInputContent = document.querySelector('[data-js="task-input"]')! as HTMLInputElement
//    const itsInputFilled = taskInputContent.value !== ''
   
//    if (itsInputFilled) {
//       insertInputContentInTaskContainer(taskInputContent.value)
//       popupWarningMessage.style.display = 'none'
//       taskInputContent.value = ''
//       return
//    }
   
//    popupWarningMessage.style.display = 'block'
// }

// const closePopup = () => {
//    const taskInputContent = document.querySelector('[data-js="task-input"]') !as HTMLInputElement

//    popupInputWrapper.style.display = 'none'
//    taskInputContent.value = ''
// }

// const toggleCheckboxToRemoval = () => {
//    const customCheckboxes = document.querySelectorAll('[data-js="custom-checkbox"]')
   
   
//    taskRemovalConfirmationBox.style.display = 'flex'
//    customCheckboxes.forEach(checkbox => checkbox.classList.replace('checkmark', 'uncheckmark'))
//    headerToolsContainer.classList.toggle('active')
// }

// const openTaskPopup = () => {
//    popupInputWrapper.style.display = 'flex'
// }

// const closeToolMenu = () => {
//    const closeMenuWrapper = document.querySelector('[data-js="close-menu-wrapper"]')! as HTMLDivElement
   
//    headerToolsContainer.classList.remove('active')
//    closeMenuWrapper.style.display = 'none'
// }

// const openToolMenu = () => {
//    const closeMenuWrapper = document.querySelector('[data-js="close-menu-wrapper"]')! as HTMLDivElement
   
//    headerToolsContainer.classList.toggle('active')
//    closeMenuWrapper.style.display = 'block'
// }

// const runCorrespondingFunc = (clickedBtn: string) => ({
//    'menu-btn': openToolMenu,
//    'close-menu-wrapper': closeToolMenu,
//    'open-task-popup-btn': openTaskPopup,
//    'remove-task-btn': toggleCheckboxToRemoval,
//    'popup-input-wrapper': closePopup,
//    'close-popup-btn': closePopup,
//    'add-task-btn': checkIfInputIsFilled,
//    //'confirm-removal-selections-btn': removeCheckedElements,
//    'cancel-removal-selections-btn': closeTaskRemovalConfirmationBox
// })[clickedBtn]!()

// const handleBtnClick = (e: any) => {
//    const allowedBtns = [
//       'menu-btn',
//       'close-menu-wrapper',
//       'open-task-popup-btn',
//       'remove-task-btn',
//       'popup-input-wrapper',
//       'close-popup-btn',
//       'add-task-btn',
//       'confirm-removal-selections-btn',
//       'cancel-removal-selections-btn'
//    ]
   
//    const clickedBtn = e.target.dataset.js
//    const itsAnAllowedBtn = allowedBtns.some(btn => btn === clickedBtn)
   
   
//    if (itsAnAllowedBtn) {
//       runCorrespondingFunc(clickedBtn)
//    }
// }


const changeCheckboxForMultipleTasksRemoval = () => {
   const customCheckboxesAsArray = [...document.querySelectorAll('[data-js="task-container__custom-checkbox"]')!]
   console.log(customCheckboxesAsArray)
   
   const checkmarkClass = 'task-container__custom-checkbox--checkmark'
   const removemarkClass = 'task-container__custom-checkbox--uncheckmark'
   
   customCheckboxesAsArray.forEach(customCheckbox => {
      customCheckbox.classList.replace(checkmarkClass, removemarkClass)
   })
}

const showPopup = () => {
   const popupWrapper = document.querySelector('[data-js="popup-wrapper"]')!
   const shown = 'popup-wrapper--enabled'
   const hidden = 'popup-wrapper--disabled'
   
   popupWrapper.classList.replace(hidden, shown)
}

const toggleNavMenu = () => {
   const itsOpen = headerNavEl.classList[0].includes('enabled')
   const open = 'header__nav--enabled'
   const close = 'header__nav--disabled'
   
   if (!itsOpen) {
      headerNavEl.classList.replace(close, open)
      return
   }
   
   headerNavEl.classList.replace(open, close)
}

const runFuncCorrespondingToNavElements = (elementName: string) => ({
   'header__menu-btn': toggleNavMenu,
   'header__open-popup-btn': showPopup,
   'header__remove-tasks-btn': changeCheckboxForMultipleTasksRemoval
})[elementName]!()

const checkClickedElementOnNav = (e: any) => {
   const allowedElements = ['header__menu-btn', 'header__open-popup-btn', 'header__remove-tasks-btn']
   const elementReference = e.target
   
   const itsAnAllowedElement = allowedElements.some(element => element === elementReference.dataset.js)
   
   if (itsAnAllowedElement) {
      runFuncCorrespondingToNavElements(elementReference.dataset.js)
   }
}


// EVENT LISTENERS
headerNavEl.addEventListener('touchstart', checkClickedElementOnNav)





/*headerToolsContainer.addEventListener('touchstart', handleBtnClick)
popupInputWrapper.addEventListener('touchstart', handleBtnClick)
taskRemovalConfirmationBox.addEventListener('touchstart', handleBtnClick)
*/
