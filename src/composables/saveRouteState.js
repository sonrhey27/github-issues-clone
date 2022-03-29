const saveRouteState = (router, page, state) => {
    router.push({
        path : '/issues',
        query: {'page' : page, 'state' : state}
    })
}

export default saveRouteState