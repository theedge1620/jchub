const dashboardListComponentInitializer = (observer) => {

    const dashboardListComponent = document.querySelector("dashboard-list")
    const dashboardListItemCategories = dashboardListComponent.shadowRoot.querySelectorAll('.item-list-category-wrapper')

    dashboardListItemCategories.forEach(category => {
        const options = {
            root: null,
            rootMargin: "50px",
            threshold: 1.0
        }
        observer.observe(category)
    })

    return dashboardListComponent
}

const dashboardListItemCardInitializer = (dashboardListItemCard, index, categoryTL) => {

    const cardToAnimate = dashboardListItemCard.shadowRoot.querySelector('.card')
    
    let delayOverlay = ">-0.25"

    if(index === 0){
        delayOverlay = ">1"
    }

    categoryTL.to(cardToAnimate, {scale: 1, ease: "elastic.out(1, 0.9)", duration: .35}, delayOverlay)

}

const observerInitializeCallback = (entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting){

            const categoryTL = gsap.timeline()
            gsap.fromTo(entry.target, {y: 50}, {y: 0, opacity: 1, duration: 0.5})

            const dashboardListItemCardComponents = entry.target.querySelectorAll('dashboard-list-item-card')

            dashboardListItemCardComponents.forEach((item, index) => {
                dashboardListItemCardInitializer(item, index, categoryTL)
            })

            categoryTL.resume()
            observer.unobserve(entry.target)
        }
    })

}

const mainHeaderInitialize = (dashboardListComponent) => {

    const mainHeader = document.querySelector(".main-header")
    const dashboardListWrapperComponent = dashboardListComponent.shadowRoot.querySelector('.list-wrapper')

    const openingTLInitializer = (mainHeader, dashboardListWrapperComponent) => {
        const openingTL = gsap.timeline()

        openingTL.to(mainHeader, {duration: .5, opacity: 1, y: 0})
        openingTL.fromTo(dashboardListWrapperComponent, {y: 100}, {duration: .5, opacity: 1, y: 0}, ">")

        return openingTL
    }

    const openingTL = openingTLInitializer(mainHeader, dashboardListWrapperComponent)

}

const linkModalInitializer = () => {    
    return document.querySelector('link-modal')
}

const menuButtonInitializer = (linkModalItemsTL, linkModalTL) => {
    const menuButton = document.querySelector('#menu-btn')
    
    gsap.from(menuButton, {top: "-150%",duration: 2, ease: "power2.out"})

    const MENU_BUTTON_TEXT_ENUM = {
        "OPEN": "Info",
        "CLOSE": "X"
    }
    
    menuButton.textContent = MENU_BUTTON_TEXT_ENUM.OPEN
    
    let linkModalTLStateReversed = false

    menuButton.addEventListener('click', () => {
        if(linkModalTLStateReversed){
            menuButton.textContent = MENU_BUTTON_TEXT_ENUM.OPEN
            linkModalItemsTL.restart().pause()
            linkModalTL.reverse()
            
        }else{
            menuButton.textContent = MENU_BUTTON_TEXT_ENUM.CLOSE
            linkModalTL.play()
            linkModalItemsTL.play()
        }

        linkModalTLStateReversed = !linkModalTLStateReversed
    })
}

const linkModalTLInitializer = (linkModal) => {

    const linkModalWrapper = linkModal.shadowRoot.querySelector('.link-modal-wrapper')
    const mainComponent = document.querySelector('main')

    const linkModalTL = gsap.timeline({defaults: {duration: 0.5}}).pause()
    linkModalTL.fromTo(linkModalWrapper, {left: "-100%", opacity: 0}, {left: "0%", opacity: 1},0)
    linkModalTL.to(mainComponent, {transform: "translateX(100%)", opacity: 0},0)

    return linkModalTL
}

const linkModalItemAnimationInitializer = (linkModalItem, linkModalItemsTL) => {

    linkModalItemsTL.fromTo(linkModalItem, {opacity: 0, x:"-100%"}, {opacity: 1, x:"0%", duration: .5, ease: "power7.out"}, "-=.05")

}

//MAIN
window.addEventListener("load", ()=>{

    const observer = new IntersectionObserver(observerInitializeCallback)

    const dashboardListComponent = dashboardListComponentInitializer(observer)

    mainHeaderInitialize(dashboardListComponent)

    const linkModal = linkModalInitializer() 
    const linkModalTL = linkModalTLInitializer(linkModal)
    const linkModalItems = linkModal.shadowRoot.querySelectorAll("link-modal-item")
    const linkModalItemsTL = gsap.timeline().pause()
    
    linkModalItems.forEach(item => {
        linkModalItemAnimationInitializer(item, linkModalItemsTL)
    })

    menuButtonInitializer(linkModalItemsTL, linkModalTL)
})