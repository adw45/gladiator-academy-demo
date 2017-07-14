var phaseControl = (phase) => {
    if (phase.type === 'form-team'){
        return formTeam(phase);
    }
    if (phase.type === 'blind-pick'){
        console.log('blind pick')
    }
};

var formTeam = (phase) => {
    if (phase.ready.red && phase.ready.blue) {
        return {
            type: 'blind-pick',
            ready: {
                red: false,
                blue: false
            }
        }
    }
    return phase;
};

module.exports = phaseControl;