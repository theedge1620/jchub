const template = document.createElement('template')
template.innerHTML = `
    <div class="card-container">
        <div class="card">
            <div class="card-img-wrapper">
            <img id="card-img"/>
            <div class="card-sheen"></div>
            </div>
            <div class="card-overlay">
                <h5 id="card-name"></h5>
            </div>

        </div>

    </div>
`

export default class DashboardListItemCard extends HTMLElement {

    constructor(){
        super()

        this.attachShadow({mode: "open"})

        const styleElement = document.createElement('link')
        styleElement.setAttribute('rel', 'stylesheet')
        styleElement.setAttribute('href', './static/css/dashboardListItemCard.css')
        styleElement.setAttribute('type', 'text/css')
        this.shadowRoot.appendChild(styleElement)

        const templateContent = template.content.cloneNode(true)
        this.shadowRoot.appendChild(templateContent)

    }

        connectedCallback(){

            const imgURL = this.getAttribute('imgURL')

            const cardContainer = this.shadowRoot.querySelector('.card-container')
            const card = this.shadowRoot.querySelector('.card')
            const cardImgWrapper = this.shadowRoot.querySelector('.card-img-wrapper')
            const cardImg = this.shadowRoot.querySelector('#card-img')
            const cardSheen = this.shadowRoot.querySelector('.card-sheen')         
            const cardOverlay = this.shadowRoot.querySelector('.card-overlay')
            const cardName = this.shadowRoot.querySelector('#card-name')

            cardContainer.addEventListener('mousemove', (e) => {
                const rect = e.target.getBoundingClientRect()
                const x0 = e.clientX - rect.left
                const y0 = e.clientY - rect.top

                const xMid = rect.width / 2
                const yMid = rect.height / 2

                const x = (x0 - xMid) / 7
                const y = -(y0 - yMid) / 7

                card.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateZ(0.25rem)`

                cardSheen.style.backgroundPosition = `${(x0/rect.width)*100}% ${(y0/rect.height)*100}%`
 
            })

            cardContainer.addEventListener('mouseenter', () => {
                
                cardImgWrapper.style.transform = `translateZ(0.5rem) scale(1.025)`
                
                cardImg.style.transition = `all 4000ms ease`
                cardImg.style.transform = `scale(1.25)`

                cardOverlay.style.transform = `translateZ(1rem) translateY(50%) scale(1.1)`
                cardOverlay.style.bottom = `50%`

                cardName.style.transform = `translateZ(2.5rem)`
                cardName.style.fontSize = `1.4em`
                cardName.style.color = `yellow`

                card.style.transition = `none`

            })

            cardContainer.addEventListener('mouseleave', () => {
                cardImgWrapper.style.transform = `translateZ(0rem) scale(1)`


                cardOverlay.style.transform = `translateZ(0rem) scale(1)`
                cardOverlay.style.bottom = `0%`

                cardName.style.transform = `translateZ(0rem) scale(1)`
                cardName.style.fontSize = `1.2em`
                cardName.style.color = `white`

                card.style.transition = `all 300ms ease`
                card.style.transform = `rotateX(0deg) rotateY(0deg)`

                cardImg.style.transition = `all 300ms ease`
                cardImg.style.transform = `scale(1)`


                cardSheen.style.backgroundPosition = `50% 50%`

            })

            cardName.innerHTML = this.getAttribute('name')
            
            cardImg.setAttribute('onerror', "this.src='./static/imgs/default.png'")
            cardImg.setAttribute('src', imgURL)
    
            this.addEventListener("click", () => {
                window.open(this.getAttribute("link"), "_blank")
            })
        }

}

customElements.define('dashboard-list-item-card', DashboardListItemCard)