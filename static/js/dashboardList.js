import {data} from "../../data/data.js"
import DashboardListItemCard from "./dashboardListItemCard.js"

export default class DashboardList extends HTMLElement{
    constructor(){
        super()

        this.attachShadow({mode: "open"})
        
        const styleElement = document.createElement('link')
        styleElement.setAttribute('rel', 'stylesheet')
        styleElement.setAttribute('href', './static/css/dashboardList.css')
        styleElement.setAttribute('type', 'text/css')
        this.shadowRoot.appendChild(styleElement)

        const listWrapper = document.createElement('div')
        listWrapper.setAttribute('class', 'list-wrapper')
        this.shadowRoot.appendChild(listWrapper)
 
    }

    connectedCallback() {

        const listWrapper = this.shadowRoot.querySelector('.list-wrapper')

        data.map(item => {
            
            const catWrapperDiv = document.createElement('div')
            catWrapperDiv.setAttribute('class', 'item-list-category-wrapper')
            
            const catNameSquare = document.createElement('div')
            catNameSquare.setAttribute('class', 'item-list-name-square')

            const catNameHeader = document.createElement('h2')
            catNameHeader.innerHTML = item.category
            
            const catDiv = document.createElement('div')
            catDiv.setAttribute('class', 'item-list-category')            

            catWrapperDiv.append(catNameHeader)
            catWrapperDiv.append(catDiv)
            listWrapper.append(catWrapperDiv)

            item.data.map(el => {

                const listItem = document.createElement('dashboard-list-item-card')
                listItem.setAttribute('link', el.link)
                listItem.setAttribute('name', el.name)
                listItem.setAttribute('imgURL', `./static/imgs/${el.img}`)
                catDiv.append(listItem)
            })

        })


    }
    
}

window.customElements.define('dashboard-list', DashboardList)