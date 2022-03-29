const changeState = (value, state, issues) => {
    var inputValue = value.split(" ")
    var trimValue = inputValue[1].split(":")
    state = trimValue[1]
    issues = []

    return { state, issues }
}

export default changeState