import { filterDays, operations } from "./utilites.js"


const currentDate = new Date()
let labels // ось x для графика затрат
let data // ось y для графика затрат
let expensesByCategories // объект, содержащий в себе категории затрат с общими затратами по ним за определенный период (отфильтрованные)
let filteredDays // отфильтрованные операции за выбранный период

const colorPalette = [
    "#fcd123",
    "#34a8ff",
    "#a1e57b",
    "#d942e3",
    "#4fbc72",
    "#ff5757",
    "#91a3ff",
    "#ffc107",
    "#7a00ff",
    "#00e0c2"
]

// отрисовка dashboard
export const renderDashboard = () => {
    return `
        <section class="stats">
        <div class="indicator">
            <span class="block-name">Balance:</span>
            <span class="count balance">2000$</span>
        </div>
        <div class="indicator income">
            <span class="block-name">Income:</span>
            <span class="count income-summary">300$</span>
        </div>
        <div class="indicator expenses">
            <span class="block-name">Expenses:</span>
            <span class="count expenses-summary">700$</span>
        </div>
    </section>

    <section class="graph">
        <div class="graph-header">
            <span class="header">Expenses</span>
            <div class="select">
                <div class="select-header">
                    <span class="placeholder">Last 1 month</span>
                    <div class="show-btn"><img src='Dashboard/images/select-triangle.png' /></div>
                </div>
                <div class="options">
                    <div class="option" data-value="1 month">Last 1 month</div>
                    <div class="option" data-value="3 months">Last 3 months</div>
                    <div class="option" data-value="6 months">Last 6 months</div>
                    <div class="option" data-value="12 months">Last 12 months</div>
                </div>
            </div>
        </div>
        <canvas id="myChart" width="100%" height="20"></canvas>
    </section>

    <div class="detalized-block">
        <section class="history">
            <span class="history-header">Financial Summary</span>
            <div class="history-content"></div>
        </section>

        <section class="categories">
            <span class="categories-header">Expenses by Category</span>
            <canvas id="category-chart" width="100%"></canvas>
        </section>
    </div>
    `
}

// динамическое отображение суммарного дохода по периодам
const setIncome = (el) => {
    const income = filteredDays.reduce((acc, day) => {
        const dayTotal = day.operations
            .filter(operation => operation.type === 'addition')
            .reduce((acc, operation) => acc + operation.sum, 0)
        return acc + dayTotal
    }, 0)
    el.textContent = String(income) + '$'
}

// динамическое отображение суммарного расхода по периодам
const setExpenses = (el) => {
    const expenses = filteredDays.reduce((acc, day) => {
        const dayTotal = day.operations
            .filter(operation => operation.type === 'expense')
            .reduce((acc, operation) => acc + operation.sum, 0)
        return acc + dayTotal
    }, 0)
    el.textContent = String(expenses) + '$'
}

// отображение графика по периодам
const setGraph = (chart) => {
    labels = filteredDays.map(day => day.date)
    data = filteredDays.map(day => {
        return day.operations
            .filter(operation => operation.type === 'expense')
            .reduce((accumulator, operation) => accumulator + operation.sum, 0)
    })
    chart.data.labels = labels
    chart.data.datasets[0].data = data
    chart.update()
}

// фильтрация списка операций за указанный период
const setOperations = (el) => {
    const htmlHistory = filteredDays.map(day => {

        const totalIncomes = day.operations
            .filter(operation => operation.type === 'addition')
            .reduce((accumulator, operation) => accumulator + operation.sum, 0)

        const totalExpenses = day.operations
            .filter(operation => operation.type === 'expense')
            .reduce((accumulator, operation) => accumulator + operation.sum, 0)

        const net = totalIncomes - totalExpenses

        return `
            <div class="day-history">
                <div class="date-block">
                    <span>${day.date}</span>
                    <span class="${net < 0 ? 'red' : 'green'}">${net}$</span>
                </div>
                <div class="operations-block">
                    ${day.operations.map(operation => `
                        <div class="operation">
                            <span>${operation.category}</span>
                            <span class=${operation.type === 'expense' ? "red" : "green"}>$${operation.sum}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `
    }).join('')

    el.innerHTML = htmlHistory
}

//  отображение категорий на диаграмме, фильтрация операций и категорий
const updateCategoryBlock = (period, chart) => {
    const currentDateCopy = new Date(currentDate)
    const startPeriod = new Date(currentDateCopy.setMonth(currentDate.getMonth() - period))

    filteredDays = filterDays(operations, startPeriod, currentDate)
    const categories = filteredDays.map(day => {
        return day.operations.filter(operation => operation.type === 'expense').map(operartion => operartion.category)
    }).flat()
    const filteredOperations = filteredDays.map(day => {
        return day.operations
    }).flat()

    const filteredCategories = [...new Set(categories)]

    expensesByCategories = filteredCategories.map(category => ({
        category: category,
        expenses: filteredOperations.filter(operation => operation.category === category).reduce((accumulator, operation) => accumulator + operation.sum, 0)
    }))
    chart.data.labels = expensesByCategories.map(expense => expense.category + ' ' + '$' + String(expense.expenses))
    chart.data.datasets[0].data = expensesByCategories.map(expense => expense.expenses)
    chart.update()
}


// инициализация необходимых данных и переменных для дашборда
export const setupDashboard = () => {
    const options = document.querySelectorAll('.option')
    const text = document.querySelector('.placeholder')
    const financialHistory = document.querySelector('.history-content')
    const expensesSummary = document.querySelector('.expenses-summary')
    const incomeSummary = document.querySelector('.income-summary')

    const ctx = document.getElementById('myChart').getContext('2d')
    const cctx = document.getElementById('category-chart').getContext('2d')

    if (!ctx || !cctx) return

    // график трат
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: null,
            datasets: [{
                label: 'Expenses',
                data: null,
                borderColor: '#cc1818',
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    })

    // диаграмма категорий
    const categoryChart = new Chart(cctx, {
        type: 'doughnut',
        data: {
            labels: null,
            datasets: [{
                data: null,
                backgroundColor: colorPalette
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    font: {
                        size: 16
                    }
                }
            }
        }

    })

    // select с опциями (фильтрами)
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            if (e.target.matches('[data-value]')) {
                text.textContent = e.target.textContent
            }

            const periods = {
                'Last 1 month': 1,
                'Last 3 months': 3,
                'Last 6 months': 6,
                'Last 12 months': 12
            }

            const selected = periods[text.textContent]

            if (selected) {
                updateCategoryBlock(selected, categoryChart)
                setOperations(financialHistory)
                setGraph(myChart)
                setExpenses(expensesSummary)
                setIncome(incomeSummary)

            }
        })
    })

    text.textContent = 'Last 1 month'
    const selected = 1
    updateCategoryBlock(selected, categoryChart)
    setOperations(financialHistory)
    setGraph(myChart)
    setExpenses(expensesSummary)
    setIncome(incomeSummary)
}

