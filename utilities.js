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
    }
}