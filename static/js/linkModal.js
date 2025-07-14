import {links} from "../../data/data.js"
import LinkModalItem from "./linkModalItem.js"

export default class LinkModal extends HTMLElement{
    constructor(){
        super()

        this.attachShadow({mode: "open"})
        
        const styleElement = document.createElement('link')
        styleElement.setAttribute('rel', 'stylesheet')
        styleElement.setAttribute('href', './static/css/LinkModal.css')
        styleElement.setAttribute('type', 'text/css')
        this.shadowRoot.appendChild(styleElement)

        const linkModalWrapper = document.createElement('div')
        linkModalWrapper.setAttribute('class', 'link-modal-wrapper')
        this.shadowRoot.appendChild(linkModalWrapper)
 
    }

    connectedCallback() {

        const linkModalWrapper = this.shadowRoot.querySelector('.link-modal-wrapper')

        const linkContainer = document.createElement('ul')
        linkContainer.setAttribute('class', 'link-container')        

        linkModalWrapper.append(linkContainer)

        links.map(item => {
  
            const listItem = document.createElement('link-modal-item')
            listItem.setAttribute('link', item.link)
            listItem.setAttribute('name', item.name)
            listItem.setAttribute('icon', item.icon)
            linkContainer.append(listItem)
        })
    }    
}

window.customElements.define('link-modal', LinkModal)