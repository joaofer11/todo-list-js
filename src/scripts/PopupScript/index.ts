import { createDomElement } from '../CreateDomElementScript'
const popupWrapperEl = document.querySelector('[data-js="popup-wrapper"]')!


// FUNCTION TREE
const showOrHideWarningMessage = (showOrHide: boolean) => {
   const popupWrapperWarningMessageEl = document.querySelector('[data-js="popup-wrapper__warning-message"]')!
   const showClass = 'popup-wrapper__warning-message--enabled'
   const hideClass = 'popup-wrapper__warning-message--disabled'
   
   switch (showOrHide) {
      case true:
         popupWrapperWarningMessageEl.classList.replace(hideClass, showClass)
         break;
      case false:
         popupWrapperWarningMessageEl.classList.replace(showClass, hideClass)
         break;
   }
}

const createTaskAsLiElement = (inputValueAsTaskContent: string) => {
   const taskItemAsLiElement = createDomElement('li')({})(['task-container__task-item'])

   const checkboxWrapper = createDomElement('label')({})(['task-container__checkbox-wrapper'])
   const checkboxInput = createDomElement('input')({type: 'checkbox'})(['task-container__checkbox'])
   const customCheckbox = createDomElement('span')({'data-js': 'custom-checkbox'})(['task-container__custom-checkbox--checkmark'])

   checkboxWrapper.append(checkboxInput, customCheckbox)

   const inputContentWrapper = createDomElement('div')({})(['task-container__input-content-wrapper'])
   //const closingWrapper = createDomElement('div')({'data-js': 'closing-wrapper'})(['closing-wrapper'])
   const inputAsTaskContent = createDomElement('input')({type: 'text', disabled: 'disabled', value: inputValueAsTaskContent})(['task-container__input-as-task-content'])
   const taskContentEditBtn = createDomElement('button')({'data-btn': '', 'data-js': 'rename-task-btn'})(['task-container__task-content-edit-btn'])
   taskContentEditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

   inputContentWrapper.append(inputAsTaskContent, taskContentEditBtn)

   taskItemAsLiElement.append(checkboxWrapper, inputContentWrapper)
   return taskItemAsLiElement
}

const insertInputValueAsTaskIntoDom = () => {
   const popupWrapperInputEl = document.querySelector('[data-js="popup-wrapper__input"]')! as HTMLInputElement
   const taskContainerEl = document.querySelector('[data-js="task-container"]')! as HTMLDivElement
   
   const inputValueAsTaskContent = popupWrapperInputEl.value
   popupWrapperInputEl.value = ''
   
   if (inputValueAsTaskContent !== '') {
      const taskItemAsLiElement = createTaskAsLiElement(inputValueAsTaskContent)
      taskContainerEl.appendChild(taskItemAsLiElement)
      showOrHideWarningMessage(false)
      
      return
   }
   
   showOrHideWarningMessage(true)
}

const closePopup = () => {
   const shown = 'popup-wrapper--enabled'
   const hidden = 'popup-wrapper--disabled'
   
   popupWrapperEl.classList.replace(shown, hidden)
}

const runFuncCorrespondingToPopupElements = (elementName: string) => ({
   'popup-wrapper': closePopup,
   'popup-wrapper__close-btn': closePopup,
   'popup-wrapper__insert-task-btn': insertInputValueAsTaskIntoDom,
})[elementName]!()

const checkClickedElementOnPopup = (e: any) => {
   const allowedElements = [
      'popup-wrapper',
      'popup-wrapper__close-btn', 
      'popup-wrapper__insert-task-btn',
   ]
   
   const clickedElement = e.target
   const itsAnAllowedElement = allowedElements.some(element => element === clickedElement.dataset.js)
   
   if (itsAnAllowedElement) {
      runFuncCorrespondingToPopupElements(clickedElement.dataset.js)
   }
}


// EVENT LISTENERS
popupWrapperEl.addEventListener('touchstart', checkClickedElementOnPopup)