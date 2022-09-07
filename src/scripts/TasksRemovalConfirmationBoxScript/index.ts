import { changeCheckboxForMultipleTasksRemovalOrDefaultState } from '../TaskContainerScript'
import { disableMenuPointerEvent } from '../HeaderScript'

const tasksRemovalConfirmationBoxEl = document.querySelector('[data-js="tasks-removal-confirmation-box"]')! as HTMLDivElement

export const showOrHideTasksRemovalConfirmationBox = () => {
   const tasksRemovalConfirmationBoxEl = document.querySelector('[data-js="tasks-removal-confirmation-box"]')! as HTMLDivElement
   const showClass = 'tasks-removal-confirmation-box--enabled'
   const hideClass = 'tasks-removal-confirmation-box--disabled'

   const itsVisible = tasksRemovalConfirmationBoxEl.classList[0].includes('enabled')
   
   disableMenuPointerEvent()
   
   if (!itsVisible) {
      tasksRemovalConfirmationBoxEl.classList.replace(hideClass, showClass)
      return
   }
   
   tasksRemovalConfirmationBoxEl.classList.replace(showClass, hideClass)
   changeCheckboxForMultipleTasksRemovalOrDefaultState()
}

const deleteAllSelectedCheckboxes = () => {
   const checkboxesAsElArray = [...document.querySelectorAll('[data-js="task-container__checkbox"]')!] as HTMLInputElement[]
   const checkedCheckboxes = checkboxesAsElArray.filter(checkbox => checkbox.checked)
   
   checkedCheckboxes.forEach(checkbox => {
      const taskItemAsLiEl = checkbox.closest('[data-js="task-container__task-item"]')!
      taskItemAsLiEl.remove()
   })
}

const runCorrespondingFuncToConfirmationBoxElements = (elementName: string) => ({
   'tasks-removal-confirmation-box__confirm-btn': deleteAllSelectedCheckboxes,
   'tasks-removal-confirmation-box__cancel-btn': showOrHideTasksRemovalConfirmationBox,
})[elementName]!()


const checkClickedElementOnConfirmationBox = (e: any) => {
   const allowedElements = [
      'tasks-removal-confirmation-box__confirm-btn', 
      'tasks-removal-confirmation-box__cancel-btn'
   ]
   
   const elementReference = e.target
   const itsAnAllowedElement = allowedElements.some(element => element === elementReference.dataset.js)
   
   if (itsAnAllowedElement) {
      runCorrespondingFuncToConfirmationBoxElements(elementReference.dataset.js)
   }
}


tasksRemovalConfirmationBoxEl.addEventListener('touchstart', checkClickedElementOnConfirmationBox)
