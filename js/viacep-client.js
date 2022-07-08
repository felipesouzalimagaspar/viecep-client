import { DOMMapper } from "./DOMMapper.js";
export const Mapper = DOMMapper;
function filterCEP(unformatted) { return unformatted.replace(/[^0-9]/g, ''); }
async function getAddressData(cep) {
    const resp = await fetch (`https://viacep.com.br/ws/${cep}/json`)
    const data = await resp.json()
    return data
}
function placeText(element, viaCepObject, field) {
    if(element = getElement(element))
        element.value = field in viaCepObject ?  viaCepObject[field] : ""    
}
function availableActions() { return ['text'/*, 'select', 'custom' */] }
function getElement(element) { return document.getElementById(element) }
function placeItems(viaCepObject, DOMMappers) {
    DOMMappers.forEach(mapper => {        
        if(availableActions().includes(mapper.action)) {
            let functionName = 'place' + mapper.action.charAt(0).toUpperCase() + mapper.action.slice(1)
            eval(functionName)(mapper.element, viaCepObject, mapper.viaCepField)
        }
    })
}
export async function searchCEP(input, mappers) {
    const cep = filterCEP(input.value)
    if(cep.length === 8) {
        try {
            const data = await getAddressData(cep)
            placeItems(data, mappers)
        }catch(err){}
    }
}