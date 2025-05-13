// форматирование даты
const formatDate = (date) => {
    const [day, month, year] = date.split('.').map(Number)
    const formattedDate = new Date(year, month - 1, day)
    return formattedDate.getTime()
}

// фильтрация дней по датам
export const filterDays = (data, start, end) => {
    return data.days.filter(el => start <= formatDate(el.date) && end >= formatDate(el.date))
}

export const operations = {
    days: [
        {
            date: '12.12.2024',
            operations: [
                {
                    type: 'expense',
                    sum: 500,
                    category: 'GYM'
                },
                {
                    type: 'addition',
                    sum: 500,
                    category: 'Replenishment'
                }
            ]
        },
        {
            date: '12.1.2025',
            operations: [
                {
                    type: 'expense',
                    sum: 500,
                    category: 'Fuel'
                }
            ]
        },
        {
            date: '23.3.2025',
            operations: [
                {
                    type: 'expense',
                    sum: 300,
                    category: 'Supermarkets',
                }
            ]
        },
        {
            date: '1.4.2025',
            operations: [
                {
                    type: 'addition',
                    sum: 8000,
                    category: 'Salary',
                },
                {
                    type: 'expense',
                    sum: 3500,
                    category: 'Network'
                },
                {
                    type: 'expense',
                    sum: 200,
                    category: 'Supermarkets'
                }
            ]
        },
        {
            date: '9.4.2025',
            operations: [
                {
                    type: 'addition',
                    sum: 300,
                    category: 'Replenishment',
                },
                {
                    type: 'expense',
                    sum: 20,
                    category: 'Cinema',
                }
            ]
        },
        {
            date: '10.4.2025',
            operations: [
                {
                    type: 'expense',
                    sum: 300,
                    category: 'Fuel'
                }
            ]
        },
        {
            date: '1.5.2025',
            operations: [
                {
                    type: 'expense',
                    sum: 300,
                    category: 'Fuel'
                }
            ]
        },
        {
            date: '30.4.2025',
            operations: [
                {
                    type: 'expense',
                    sum: 300,
                    category: 'Movie'
                }
            ]
        }
    ]
}