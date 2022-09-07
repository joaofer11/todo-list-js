type TGenericObj = Record<string, any>


export const createDomElement = (name: string) => (atts: TGenericObj) => (className: string[]) => {
   const element = document.createElement(name)
   const attsAsArray = Object.entries(atts)
   
   attsAsArray.forEach(([att, value]) => element.setAttribute(att, value))
   element.classList.add(...className)
   
   return element
}