module.exports = {
    age: (timestamp) => {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        // if > 0  = is not your birthday
        const month = today.getMonth() - birthDate.getMonth()
        const day = today.getDate() - birthDate.getDate()

        if (month < 0 || month == 0 && day < 0) {
            age = age - 1
        }

        return age
    },
    formatter: new Intl.DateTimeFormat("pt-BR", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }),
    date: (timestamp) => {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`
        }
    }
}