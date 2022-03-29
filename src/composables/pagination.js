const pagination = (pagination, page, issues) => {

    if(pagination == "previous"){
        if(page > 1){
            page -= 1
            issues = []
        }
    }else{
        page += 1
        issues = []
    }

    return { page, issues }
    // previous(){
        
    // },
    // next(){
    //     this.page += 1
    //     this.issues = []
    // }
}

export default pagination