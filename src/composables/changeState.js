const changeState = (value, state, issues) => {
    const inputValue = value.split(" ")
    const trimValue = inputValue[1].split(":")
    state = trimValue[1]
    issues = []

    return { state, issues }
}

export default changeState