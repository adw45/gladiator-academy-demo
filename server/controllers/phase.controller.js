const getInitialPhase = () => {
    return {
        type: 'form-team',
        ready: {
            red: false,
            blue: false
        }
    }
}

module.exports = {
    getInitialPhase
}