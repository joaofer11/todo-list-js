import { insertOutsideClickListeners, removeOutsideClickListeners } from '../OutsideClickScript'
import { showPopup } from '../PopupScript'
import { changeCheckboxForMultipleTasksRemovalOrDefaultState } from '../TaskContainerScript'


// VARIABLES
const headerNavEl = document.querySelector('[data-js="header__nav"]')!


// FUNCTION TREE
export const disableMenuPointerEvent = () => {
   const headerMenu = document.querySelector('[data-js="header__menu"]')! as HTMLDivElement
   const interactiveClass = 'header__menu--interactive'
   const noInteractiveClass = 'header__menu--no-interactive'

   const itsInteractive = headerMenu.classList[0].includes('--interactive')
   
   if (itsInteractive) {
      headerMenu.classList.replace(interactiveClass, noInteractiveClass)
      return
   }
   
   headerMenu.classList.replace(noInteractiveClass, interactiveClass)
}

const toggleNavMenu = () => {
   const itsOpen = headerNavEl.classList[0].includes('enabled')
   const open = 'header__nav--enabled'
   const close = 'header__nav--disabled'
   
   
   if (!itsOpen) {
      headerNavEl.classList.replace(close, open)
      insertOutsideClickListeners('header__nav', toggleNavMenu)
      return
   }
   
   headerNavEl.classList.replace(open, close)
   removeOutsideClickListeners()
}

const runCorrespondingFuncToNavElements = (elementName: string) => ({
   'header__menu-btn': toggleNavMenu,
   'header__open-popup-btn': showPopup,
   'header__remove-tasks-btn': changeCheckboxForMultipleTasksRemovalOrDefaultState
})[elementName]!()

const checkClickedElementOnNav = (e: any) => {
   const allowedElements = [
      'header__menu-btn', 
      'header__open-popup-btn', 
      'header__remove-tasks-btn',
      'header__outside-click-wrapper',
   ]
   
   const elementReference = e.target
   const itsAnAllowedElement = allowedElements.some(element => element === elementReference.dataset.js)
   
   if (itsAnAllowedElement) {
      runCorrespondingFuncToNavElements(elementReference.dataset.js)
   }
}


// EVENT LISTENERS
headerNavEl.addEventListener('touchstart', checkClickedElementOnNav)