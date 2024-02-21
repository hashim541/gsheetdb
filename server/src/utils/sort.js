const sortMethod = (sort,result,schemaKeys) => {
    const sortArray=['asc','desc']
    if(!sort.includes(':')){
        throw new Error(`invalid sort query, it must be like header:(asc || desc)`)
    }
    const [sortHeader,sortOrder] = sort.split(':')
    console.log(sortHeader,sortOrder)
    const type = schemaKeys[sortHeader].type
    // console.log(result,type)
    if (type == undefined){
        throw new Error(`you cannot sort by ${sortHeader},beacuse it dosen't exists in header.`)
    }
    if(type == 'array' || type == 'object' ){
        throw new Error(`you cannot sort by ${type}`)
    }
    if (!sortArray.includes(sortOrder)){
        throw new Error(`you cannot sort in order by ${sortOrder}`)
    }
    switch(type){
        case 'string':
            return
        case 'number':
            console.log('number case')
            if(sortOrder == 'asc'){
                return result.sort( (a,b) => eval(`a.${sortHeader} - b.${sortHeader}`))
            }else{
                return result.sort((a,b) => eval(`b.${sortHeader} - a.${sortHeader}`))
            }
        case 'boolean':
            return
        default:
            console.log('default sort case')
    }
}

module.exports = sortMethod