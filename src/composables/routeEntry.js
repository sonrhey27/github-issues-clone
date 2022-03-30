const routeEntry = (route) => {
    let state = 'open'
    let page = 1

    let queryRoute = Object.entries(route)
    if ( queryRoute.length ) {
        state = route.state
        page = Number(route.page)
    }

    return { state, page }
}

export default routeEntry