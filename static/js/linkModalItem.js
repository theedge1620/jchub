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

const linkItemCirclesInitializer = (linkItemCircles, linkItemCirclesIntroTL) => {

    linkItemCircles.forEach((circle, index) => {

        let addDelay = "-=0.05"
        if(index === 0){
            addDelay = "0"
        }   
        linkItemCirclesIntroTL.to(circle, {opacity: 1}, addDelay)

    })
}

//attribution to the following stackoverflow answer:
//https://stackoverflow.com/a/143889
const checkOverflow = (el) => 
{
   var curOverflow = el.style.overflow;

   if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";

   var isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;

   el.style.overflow = curOverflow;

   return isOverflowing;
}

const linkModalItemAnimation = (linkModalItem) => {

    const linkModalItemContainer = linkModalItem.shadowRoot.querySelector(".link-item-container")

    const linkModalItemTL = gsap.timeline({defaults:{duration: .2}}).pause()
    linkModalItemTL.to(linkModalItemContainer, {transform: "scale(1.2)", ease: "back.out(1.7)"}, 0)

    linkModalItemTL.to(linkModalItemContainer, {boxShadow: "0rem 0.25rem 0.2rem rgba(0, 0,0,0.5)", background: "rgb(0, 22, 121)", duration:.2}, 0)
    
    const linkModalItemCircleContainer = linkModalItem.shadowRoot.querySelector('.link-item-circle-container')
    linkModalItemTL.to(linkModalItemCircleContainer, {background: "rgb(0, 22, 121)"}, 0)

    const linkModalItemTextWrapper = linkModalItem.shadowRoot.querySelector(".link-item-name-wrapper")
    const linkModalItemText = linkModalItem.shadowRoot.querySelector(".link-item-name")

    const linkModalItemTextTL = gsap.timeline().pause()

    linkModalItemTL.to(linkModalItemTextWrapper, {fontWeight: "600"}, 0)
    
    const linkItemSVG = linkModalItem.shadowRoot.querySelector(".link-item-circle")
    const linkItemCircles = linkItemSVG.querySelectorAll("circle")

    const linkItemCirclesIntroTL = gsap.timeline({defaults: {duration: .15, ease: "back.out(1)"}}).pause()
    
    linkItemCirclesInitializer(linkItemCircles, linkItemCirclesIntroTL)

    linkModalItemContainer.addEventListener("mouseenter", () => {
        linkModalItemTL.play()
        linkItemCirclesIntroTL.play()

        if(checkOverflow(linkModalItemText)){
            linkModalItemTextTL.to(linkModalItemText, {marginLeft: "-100%", duration: 2, repeat: -1, repeatDelay: 1.5, delay: 0.5, ease: "none"}).play()
        }
    })

    linkModalItemContainer.addEventListener("mouseleave", () => {
        linkModalItemTL.reverse()
        linkItemCirclesIntroTL.reverse()
        linkModalItemTextTL.progress(0).clear()
    })

}

export default class LinkModalItem extends HTMLElement {

    constructor(){
        super()

        this.attachShadow({mode: "open"})

        const styleElement = document.createElement('link')
        styleElement.setAttribute('rel', 'stylesheet')
        styleElement.setAttribute('href', './static/css/linkModalItem.css')
        styleElement.setAttribute('type', 'text/css')
        this.shadowRoot.appendChild(styleElement)

        const templateContent = template.content.cloneNode(true)
        this.shadowRoot.appendChild(templateContent)

    }

        connectedCallback(){
            
            const linkItemLink = this.shadowRoot.querySelector(".link-item-link")
            const linkItemName = this.shadowRoot.querySelector(".link-item-name")

            linkItemLink.setAttribute("href", this.getAttribute('link'))
            linkItemLink.setAttribute('target', '_blank')

            linkItemName.textContent = this.getAttribute('name')

            linkModalItemAnimation(this)
        }

}

customElements.define('link-modal-item', LinkModalItem)