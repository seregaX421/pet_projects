const modal = document.querySelector('.edit-overlay')
const closeBtn = document.querySelector('.close-modal-btn')
const options = document.querySelectorAll('.modal-select-option')
const placeholder = document.querySelector('.modal-select-placeholder')
const content = document.querySelector('.edit-modal-main')

export const renderProfile = () => {
    return `
        <h1>Profile</h1>
        <div class="profile-block">
            <div class="profile-data">
                <span><b>Full Name:</b> <span class="current-given-name">Ivan</span> <span class="current-family-name">Petrov</span></span>
                <span><b>Phone:</b> <span class="current-phone-number">+79959241263</span></span>
                <span><b>Email:</b> <span class="current-email">ivan.petrov@example.com</span></span>
                <span><b>Password:</b> <span class="current-password">**********</span></span>
                <span><b><span class="current-date-of-birth">Date of Birth:</span></b> January 15, 1990</span>
            </div>
            <div class="profile-photo-block">
                <span><b>Ivan</b></span>
                <div class="profile-photo"><img src="Dashboard/images/profile-photo.png" alt="profile photo"></div>
            </div>
        </div>
        <div class="btn-container">
            <button class="edit-btn">Edit Profile</button>
            <button class="exit-btn">Exit</button>
        </div>
    `
}

const openModal = (el) => {
    el.addEventListener('click', () => {
        modal.classList.add('visible')
    })
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('visible')
})

const setGivenNameForm = (el, currentValue) => {
    el.innerHTML = `
        <div class="current-value">
            <span>Current name:</span>
            <span><b>${currentValue}</b></span>
        </div>
        <form class="edit-form">
            <div class="form-group">
                <label for="given-name">New name:</label>
                <input type="text" id="given-name" name="given-name" required autocomplete="given-name" placeholder="Ivan" />
            </div>
            <button class="submit-btn">Submit</button>
        </form>
    `
}

const setFamilyNameForm = (el, currentValue) => {
    el.innerHTML = `
        <div class="current-value">
            <span>Current family name:</span>
            <span><b>${currentValue}</b></span>
        </div>
        <form class="edit-form">
            <div class="form-group">
                <label for="family-name">New family name:</label>
                <input type="text" id="family-name" name="family-name" required autocomplete="family-name" placeholder="Ivanov" />
            </div>
            <button class="submit-btn">Submit</button>
        </form>
    `
}

const setPhoneNumberForm = (el, currentValue) => {
    el.innerHTML = `
        <div class="current-value">
            <span>Current phone number:</span>
            <span><b>${currentValue}</b></span>
        </div>
        <form class="edit-form">
            <div class="form-group">
                <label for="tel">New phone number:</label>
                <input type="tel" id="tel" name="tel" required autocomplete="tel" placeholder="+79999999999" />
            </div>
            <button class="submit-btn">Submit</button>
        </form>
    `
}

const setEmailForm = (el, currentValue) => {
    el.innerHTML = `
        <div class="current-value">
            <span>Current email:</span>
            <span><b>${currentValue}</b></span>
        </div>
        <form class="edit-form">
            <div class="form-group">
                <label for="email">New email:</label>
                <input type="email" id="email" name="email" required autocomplete="email" placeholder="example@example.com" />
            </div>
            <button class="submit-btn">Submit</button>
        </form>
    `
}

const setPasswordForm = (el, currentValue) => {
    el.innerHTML = `
        <form class="edit-form">
            <div class="form-group">
                <label for="current-password">Current password:</label>
                <input type="password" id="current-password" name="current-password" required autocomplete="current-password" placeholder="Your current password" />
            </div>
            <div class="form-group">
                <label for="new-password">New password:</label>
                <input type="password" id="new-password" name="new-password" required autocomplete="new-password" placeholder="New password" />
            </div>
            <button class="submit-btn">Submit</button>
        </form>
    `
}

const setDateOfBirthForm = (el, currentValue) => {
    el.innerHTML = `
        <div class="current-value">
            <span>Current date of birth:</span>
            <span><b>${currentValue}</b></span>
        </div>
        <form class="edit-form">
            <div class="form-group">
                <label for="date-of-birth">New date of birth:</label>
                <input type="date" id="date-of-birth" name="date-of-birth" required autocomplete="bday" />
            </div>
            <button class="submit-btn">Submit</button>
        </form>
    `
}

const submit = (el, changeContent) => {
    el.addEventListener('click', () => {
        if (changeContent === 'Given name') {
            const newValue = document.querySelector('#given-name').textContent
        }

        if (changeContent === 'Family name') {
            const newValue = document.querySelector('#family-name').textContent
        }

        if (changeContent === 'Phone number') {
            const value = document.querySelector('#tel')
            const reg = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/

            if (reg.test(value)) {
                const newValue = value
            } else {
                
            }
        }
    })
}

export const setupProfile = () => {
    const openModalBtn = document.querySelector('.edit-btn')
    const currentGivenName = document.querySelector('.current-given-name')
    const currentFamilyName = document.querySelector('.current-family-name')
    const currentPhoneNumber = document.querySelector('.current-phone-number')
    const currentEmail = document.querySelector('.current-email')
    const currentPassword = document.querySelector('.current-password')
    const currentDateOfBirth = document.querySelector('.current-date-of-birth')

    openModal(openModalBtn)

    options.forEach(option => {
        option.addEventListener('click', () => {
            placeholder.textContent = option.textContent

            if (placeholder.textContent === 'Given name') {
                setGivenNameForm(content, currentGivenName.textContent)
            }

            if (placeholder.textContent === 'Family name') {
                setFamilyNameForm(content, currentFamilyName.textContent)
            }

            if (placeholder.textContent === 'Phone number') {
                setPhoneNumberForm(content, currentPhoneNumber.textContent)
            }

            if (placeholder.textContent === 'Email') {
                setEmailForm(content, currentEmail.textContent)
            }

            if (placeholder.textContent === 'Password') {
                setPasswordForm(content, currentPassword)
            }

            if (placeholder.textContent === 'Date of birth') {
                setDateOfBirthForm(content, currentDateOfBirth.textContent)
            }
        })
    })
}