import { operations, filterDays } from "./utilites.js"

const currentDate = new Date()
let filteredOperations
let filteredOperationsByCategory
let filteredCategories

export const renderTransactions = () => {
    return `
        <h1>Transactions</h1>
            <div class="transactions-header">
                <div class="filter-container">
                    <div class="select">
                        <div class="select-header">
                            <span class="placeholder period">Period</span>
                            <div class="show-btn"><img src='Dashboard/images/select-triangle.png' /></div>
                        </div>
                        <div class="options">
                            <div class="option date-option" data-value="Last day">Last day</div>
                            <div class="option date-option" data-value="Last week">Last week</div>
                            <div class="option date-option" data-value="Last month">Last month</div>
                            <div class="option date-option" data-value="Last year">Last year</div>
                        </div>
                    </div>
                    <div class="select">
                        <div class="select-header">
                            <span class="placeholder category">Category</span>
                            <div class="show-btn"><img src="Dashboard/images/select-triangle.png" /></div>
                        </div>
                        <div class="options category-options"></div>
                    </div>
                </div>

                <div class="account-managment">
                    <div class="transfer-block">
                        <div class="transfer-btn">
                            <img src="Dashboard/images/transfer-icon.png">
                        </div>
                        <span>Transfer</span>
                    </div>
                    <div class="replenishment-block">
                        <div class="replenishment-btn">
                            <img src="Dashboard/images/replenishment-icon.png">
                        </div>
                        <span>Deposit</span>
                    </div>
                </div>
            </div>

            <div class="transactions-list-block">
                <div class="transactions-list-header">
                    <span>Date</span>
                    <span>Category</span>
                    <span>Amount</span>
                    <span>Type</span>
                </div>
                <div class="transactions-list"></div>
            </div>
    `
}

const getStartPeriod = (type) => {
    const copyCurrentDate = new Date(currentDate)
    switch (type) {
        case 'Last day': 
        copyCurrentDate.setDate(copyCurrentDate.getDate() - 1)
        break
        case 'Last week': 
        copyCurrentDate.setDate(copyCurrentDate.getDate() - 7)
        break
        case 'Last month': 
        copyCurrentDate.setMonth(copyCurrentDate.getMonth() - 1)
        break
        case 'Last year': 
        copyCurrentDate.setMonth(copyCurrentDate.getMonth() - 12)
        break
    }
    return copyCurrentDate
}

const filterOperationsByPeriod = (type) => {
    const startPeriod = getStartPeriod(type)
    filteredOperations = filterDays(operations, startPeriod, currentDate)
}

const renderTransactionsList = (el, data) => {
    el.innerHTML = data.map(day => `
        ${day.operations.map(operation => `
            <div class="transaction">
                <span>${day.date}</span>
                <span class="${operation.type === 'expense' ? 'red': 'green'}">${operation.category}</span>
                <span class="${operation.type === 'expense' ? 'red': 'green'}">$${operation.sum}</span>
                <span class="${operation.type === 'expense' ? 'red': 'green'}">${operation.type}</span>
            </div>
            `).join('')}
    `).join('')
}

const filterCategories = (data) => {
    filteredCategories = [... new Set(data.map(day => day.operations.map(operation => operation.category)).flat())]
    filteredCategories.unshift('All')
    return filteredCategories.map(category => `
                <div class="option category-option" data-value="category">${category}</div>
            `).join('')
}

const filterOperationsByCategory = (category) => {
    if (category === 'All') {
        filteredOperationsByCategory = filteredOperations
    } else {
        filteredOperationsByCategory = filteredOperations.map(day => {
            const matched = day.operations.filter(operation => operation.category === category)
            if (matched.length > 0) {
                return {
                    date: day.date,
                    operations: matched
                }
            }
            return null
        }).filter(Boolean)
    }

}

export const setupTransactions = () => {
    const dateOptions = document.querySelectorAll('.date-option')
    const categories = document.querySelector('.category-options')
    const transactionsBlock = document.querySelector('.transactions-list')
    const selectedPeriod = document.querySelector('.period')
    const selectedCategory = document.querySelector('.category')

    dateOptions.forEach(option => {
        option.addEventListener('click', () => {
            const type = option.textContent
            selectedPeriod.textContent = option.textContent
            selectedCategory.textContent = 'All'

            filterOperationsByPeriod(type)
            categories.innerHTML = filterCategories(filteredOperations)
            filterOperationsByCategory(selectedCategory.textContent)
            renderTransactionsList(transactionsBlock, filteredOperationsByCategory)

            document.querySelectorAll('.category-option').forEach(catOpt => {
                catOpt.addEventListener('click', () => {
                    selectedCategory.textContent = catOpt.textContent
                    filterOperationsByCategory(selectedCategory.textContent)
                    renderTransactionsList(transactionsBlock, filteredOperationsByCategory)
                })
            })
        })
    })

    filterOperationsByPeriod('Last month')
    selectedPeriod.textContent = 'Last month'
    selectedCategory.textContent = 'All'
    categories.innerHTML = filterCategories(filteredOperations)
    filterOperationsByCategory(selectedCategory.textContent)
    renderTransactionsList(transactionsBlock, filteredOperationsByCategory)

    document.querySelectorAll('.category-option').forEach(catOpt => {
        catOpt.addEventListener('click', () => {
            selectedCategory.textContent = catOpt.textContent
            filterOperationsByCategory(selectedCategory.textContent)
            renderTransactionsList(transactionsBlock, filteredOperationsByCategory)
        })
    })
}

