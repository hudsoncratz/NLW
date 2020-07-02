//console.log('Hello')

function populatesUFs() {
    const ufSelect = document.querySelector("select[name = uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populatesUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name = city]")
    const stateInput = document.querySelector("input[name = state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {
    
        for(const city of cities){
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        
    } )
    citySelect.disabled = false
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

//Itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remoer uma classe com javascript

    itemLi.classList.toggle("selected")

    const itemId =itemLi.dataset.id
    //console.log()

    //Verificar se tem itens selcionados, se sim 
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //true ou  false
        return itemFound
    })

    // se á tiver selecionado, 
    if(alreadySelected >= 0){
        //tirar da seleção
        const filtredItems = selectedItems.filter( item => {
            const itemsDifferent = item != itemId //false
            return itemsDifferent
        })
        selectedItems = filtredItems
    }
    //se não tiver selecionado
    else{
      //adicionar a seleção  
        selectedItems.push(itemId)
    }
    //atualizar o campo escondido com os itens selecionados

   collectedItems.value = selectedItems 
}