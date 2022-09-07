import { showOrHideTasksRemovalConfirmationBox } from '../TasksRemovalConfirmationBoxScript'
import { disableMenuPointerEvent } from '../HeaderScript'
import { insertOutsideClickListeners , removeOutsideClickListeners } from '../OutsideClickScript'

// VARIABLES
const taskContainerEl = document.querySelector('[data-js="task-container"]')!

// FUNCTION TREE
const changeToCheckboxDefaultState = (checkmarkClass: string, uncheckmarkClass: string) => (customCheckbox: HTMLSpanElement) => {
   const checkboxInputEl = customCheckbox.previousElementSibling! as HTMLInputElement
   checkboxInputEl.checked = (checkboxInputEl.dataset.checked === 'true') ? true : false
   
   customCheckbox.classList.replace(uncheckmarkClass, checkmarkClass)
}

const changeToRemovalAndClearCheckbox = (checkmarkClass: string, uncheckmarkClass: string) => (customCheckbox: HTMLSpanElement) => {
   const checkboxInputEl = customCheckbox.previousElementSibling! as HTMLInputElement
   checkboxInputEl.checked = false
   
   customCheckbox.classList.replace(checkmarkClass, uncheckmarkClass)
}

export const changeCheckboxForMultipleTasksRemovalOrDefaultState = () => {
   const customCheckboxesAsArray = [...document.querySelectorAll('[data-js="task-container__custom-checkbox"]')!] as HTMLSpanElement[]
   
   const checkmarkClass = 'task-container__custom-checkbox--checkmark'
   const uncheckmarkClass = 'task-container__custom-checkbox--uncheckmark'

   const onlyOneHasCheckmarkClass = customCheckboxesAsArray[0]?.classList[0].includes('--checkmark')
   
   removeOutsideClickListeners()
   if (onlyOneHasCheckmarkClass) {
      customCheckboxesAsArray.forEach(changeToRemovalAndClearCheckbox(checkmarkClass, uncheckmarkClass))
      showOrHideTasksRemovalConfirmationBox()
      return
   }
   
   customCheckboxesAsArray.forEach(changeToCheckboxDefaultState(checkmarkClass, uncheckmarkClass))
}

const toggleTaskContentEditBtn = (taskContentEditBtn: HTMLButtonElement, visible: boolean = true) => {
   const visibleEditBtnClass = 'task-container__task-content-edit-btn--visible'
   const hiddenEditBtnClass = 'task-container__task-content-edit-btn--hidden'
   
   switch (visible) {
      case true:
         taskContentEditBtn.classList.replace(hiddenEditBtnClass, visibleEditBtnClass)
         break;
      case false:
         taskContentEditBtn.classList.replace(visibleEditBtnClass, hiddenEditBtnClass)
         break;
   }
}

const handleTaskContentEditBtnClick = (taskContentEditBtn: HTMLButtonElement) => {
   const inputElAsTaskContent = taskContentEditBtn.previousElementSibling! as HTMLInputElement
   const isInputDisabled = inputElAsTaskContent.disabled === true
   
   const visibleEditBtnClass = 'task-container__task-content-edit-btn--visible'
   const hiddenEditBtnClass = 'task-container__task-content-edit-btn--hidden'
   
   const taskItemData = taskContentEditBtn.closest('[data-js*="task-item"]')! as HTMLLIElement
   
   if (isInputDisabled) {
      inputElAsTaskContent.disabled = false
      inputElAsTaskContent.focus()
      toggleTaskContentEditBtn(taskContentEditBtn, false)
   }
}

const handleCustomCheckboxClick = (customCheckbox: HTMLSpanElement) => {
   const checkboxInputEl = customCheckbox.previousElementSibling! as HTMLInputElement
   const isInputCheckboxMarked = checkboxInputEl.checked === true
   
   if (!isInputCheckboxMarked) {
      checkboxInputEl.setAttribute('data-checked', 'true')
      return
   }
   
   checkboxInputEl.setAttribute('data-checked', 'false')
}

const runCorrespondingFuncToTaskContainerElements = (clickedElement: any) => ({
   'task-container__custom-checkbox': handleCustomCheckboxClick,
   'task-container__task-content-edit-btn': handleTaskContentEditBtnClick,
})[clickedElement.dataset.js as string]!(clickedElement)

const checkClickedElementOnTaskContainer = (e: any) => {
   const allowedElements = [
      'task-container__custom-checkbox',
      'task-container__task-content-edit-btn'
   ]
   const clickedElement = e.target
   const itsAnAllowedElement = allowedElements.some(element => element === clickedElement.dataset.js)
   
   if (itsAnAllowedElement) {
      runCorrespondingFuncToTaskContainerElements(clickedElement)
   }
}


// EVENT LISTENERS
taskContainerEl.addEventListener('touchstart', checkClickedElementOnTaskContainer)
