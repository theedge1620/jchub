const template = document.createElement('template')
template.innerHTML = `
    <li class="link-item-container">
        <a class="link-item-link">
            <div class="link-item-circle-container">
                <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg" class="link-item-circle">
                    <circle cx="50%" cy="50%" r="45%" id="link-item-circle-1a"></circle>
                    <circle cx="50%" cy="50%" r="45%" id="link-item-circle-1b"></circle>
                    <circle cx="50%" cy="50%" r="45%" id="link-item-circle-1c"></circle>
                    <circle cx="50%" cy="50%" r="35%" id="link-item-circle-2x"></circle>
                    <circle cx="50%" cy="50%" r="25%" id="link-item-circle-3x"></circle>
                    <circle cx="50%" cy="50%" r="17.5%" id="link-item-circle-4x"></circle>
                </svg>
            </div>
            <div class="link-item-name-wrapper">
                <p class="link-item-name"></p>
            </div>
        </a>
    </li>
`

//attribution: https://stackoverflow.com/a/143889
const checkOverflow = (el) => {
    const curOverflow = el.style.overflow
    if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden"
    const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
    el.style.overflow = curOverflow
    return isOverflowing
}

export default class LinkModalItem extends HTMLElement {

    constructor() {
        super()

        this.attachShadow({ mode: "open" })

        const styleElement = document.createElement('link')
        styleElement.setAttribute('rel', 'stylesheet')
        styleElement.setAttribute('href', './static/css/linkModalItem.css')
        styleElement.setAttribute('type', 'text/css')
        this.shadowRoot.appendChild(styleElement)

        const templateContent = template.content.cloneNode(true)
        this.shadowRoot.appendChild(templateContent)
    }

    connectedCallback() {
        const linkItemLink = this.shadowRoot.querySelector(".link-item-link")
        const linkItemName = this.shadowRoot.querySelector(".link-item-name")
        const container = this.shadowRoot.querySelector(".link-item-container")
        const circles = this.shadowRoot.querySelectorAll("circle")

        linkItemLink.setAttribute("href", this.getAttribute('link'))
        linkItemLink.setAttribute('target', '_blank')
        linkItemName.textContent = this.getAttribute('name')

        container.addEventListener("mouseenter", () => {
            container.classList.add('hovered')
            circles.forEach((circle, i) => {
                circle.style.transitionDelay = `${i * 0.05}s`
                circle.classList.add('visible')
            })
            if (checkOverflow(linkItemName)) {
                linkItemName.classList.add('scrolling')
            }
        })

        container.addEventListener("mouseleave", () => {
            container.classList.remove('hovered')
            circles.forEach(circle => {
                circle.style.transitionDelay = '0s'
                circle.classList.remove('visible')
            })
            linkItemName.classList.remove('scrolling')
        })
    }
}

customElements.define('link-modal-item', LinkModalItem)
