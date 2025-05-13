import { renderDashboard, setupDashboard } from "./dashboard.js"
import { renderTransactions, setupTransactions } from "./transactions.js"
import { renderProfile, setupProfile } from "./profile.js"

// Пути 
const routes = {
    '/dashboard': renderDashboard,
    '/transactions': renderTransactions,
    '/profile': renderProfile
}

// изменение поисковой строки
const navigateTo = (url) => {
    history.pushState(null, null, url)
    setActiveLink()
    render()
}

// рендер контента
const render = () => {
    let path = window.location.pathname

    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1)
    }

    const route = routes[path]

    if (path === '/') {
        navigateTo('/dashboard')
    }

    if (typeof route === 'function') {
        main.innerHTML = route()
    }

    if (path === '/dashboard') {
        setupDashboard()
    }

    if (path === '/transactions') {
        setupTransactions()
    }

    if (path === '/profile') {
        setupProfile()
    }

}

// обработка нажатий на ссылки и стрелки
document.addEventListener('DOMContentLoaded', () => {
    setActiveLink()
    render()

    document.body.addEventListener('click', (e) => {
        if (e.target.closest('[data-link]')) {
            e.preventDefault()
            navigateTo(e.target.closest('[data-link]').getAttribute('href'))
        }
    })
})

// добавление активного класса ссылке 
const setActiveLink = () => {
    const links = document.querySelectorAll('[data-link]')
    let path = window.location.pathname

    if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1)
    }

    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active')
        } else {
            link.classList.remove('active')
        }
    })
}