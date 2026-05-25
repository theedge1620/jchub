const dashboardListComponentInitializer = (observer) => {
    const dashboardListComponent = document.querySelector("dashboard-list")
    const dashboardListItemCategories = dashboardListComponent.shadowRoot.querySelectorAll('.item-list-category-wrapper')

    dashboardListItemCategories.forEach(category => {
        observer.observe(category)
    })

    return dashboardListComponent
}

const observerInitializeCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')

            const cardComponents = entry.target.querySelectorAll('dashboard-list-item-card')
            cardComponents.forEach((cardComponent, index) => {
                const card = cardComponent.shadowRoot.querySelector('.card')
                const delay = index === 0 ? 1000 : 1000 + index * 100
                setTimeout(() => card.classList.add('entering'), delay)
            })

            observer.unobserve(entry.target)
        }
    })
}

const mainHeaderInitialize = (dashboardListComponent) => {
    const mainHeader = document.querySelector(".main-header")
    const listWrapper = dashboardListComponent.shadowRoot.querySelector('.list-wrapper')

    requestAnimationFrame(() => {
        mainHeader.classList.add('visible')
        setTimeout(() => listWrapper.classList.add('visible'), 500)
    })
}

const menuButtonInitializer = (linkModal) => {
    const menuButton = document.querySelector('#menu-btn')
    const linkModalWrapper = linkModal.shadowRoot.querySelector('.link-modal-wrapper')
    const linkModalItems = linkModal.shadowRoot.querySelectorAll("link-modal-item")
    const mainComponent = document.querySelector('main')

    const MENU_TEXT = { OPEN: "Info", CLOSE: "X" }
    menuButton.textContent = MENU_TEXT.OPEN

    let isOpen = false

    menuButton.addEventListener('click', () => {
        isOpen = !isOpen
        menuButton.textContent = isOpen ? MENU_TEXT.CLOSE : MENU_TEXT.OPEN

        if (isOpen) {
            linkModalWrapper.classList.add('open')
            mainComponent.classList.add('modal-open')
            linkModalItems.forEach((item, index) => {
                setTimeout(() => item.classList.add('visible'), index * 50)
            })
        } else {
            linkModalItems.forEach(item => {
                item.style.transitionDuration = '0s'
                item.classList.remove('visible')
                requestAnimationFrame(() => { item.style.transitionDuration = '' })
            })
            linkModalWrapper.classList.remove('open')
            mainComponent.classList.remove('modal-open')
        }
    })
}

window.addEventListener("load", () => {
    const observer = new IntersectionObserver(observerInitializeCallback)

    const dashboardListComponent = dashboardListComponentInitializer(observer)
    mainHeaderInitialize(dashboardListComponent)

    const linkModal = document.querySelector('link-modal')
    menuButtonInitializer(linkModal)
})
