const listenerRegisterState = (() => {
   let listenerRegister: (e: any) => void;
   
   return {
      setListenerRegister: (listenerToRegister: (e: any) => void) => {
         listenerRegister = listenerToRegister
      },
      getListenerRegister: () => listenerRegister,
   }
})()

export const removeOutsideClickListeners = () => {
   document.removeEventListener('touchstart', listenerRegisterState.getListenerRegister())
}

const handleOutsideClick = (elementNameToCheck: string, callbackFn: any) => (e: any) => {
   const clickedElement = e.target!
   const hasOutsideClick = clickedElement.closest([`[data-js="${elementNameToCheck}"]`]) === null
   
   if (hasOutsideClick) {
      callbackFn()
      removeOutsideClickListeners()
   }
}

export const insertOutsideClickListeners = (elementName: string, callbackFn: any) => {
   listenerRegisterState!.setListenerRegister(handleOutsideClick(elementName, callbackFn))
   document.addEventListener('touchstart', listenerRegisterState!.getListenerRegister())
}