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
            if(sortOrder == 'asc'){
                return result.sort((a, b) => {
                    const aValue = a[sortHeader];
                    const bValue = b[sortHeader];
                    return aValue.localeCompare(bValue);
                  });
            }else{
                return result.sort((a, b) => {
                    const aValue = a[sortHeader];
                    const bValue = b[sortHeader];
                    return bValue.localeCompare(aValue);
                  });
            }
        case 'number':
            if(sortOrder == 'asc'){
                return result.sort( (a,b) => eval(`a.${sortHeader} - b.${sortHeader}`))
            }else{
                return result.sort((a,b) => eval(`b.${sortHeader} - a.${sortHeader}`))
            }
        case 'boolean':
            if(sortOrder == 'asc'){
                return result.sort((a, b) => {
                   // Handle case where a[sortHeader] is undefined
                   if (a[sortHeader] === undefined) {
                    return 1; // Move undefined values to the end
                  }
                  
                  // Handle case where b[sortHeader] is undefined
                  if (b[sortHeader] === undefined) {
                    return -1; // Move undefined values to the end
                  }
                
                  // Compare boolean values if both are defined
                  if (a[sortHeader] === b[sortHeader]) {
                    return 0;
                  } else if (a[sortHeader]) {
                    return -1; // true comes before false
                  } else {
                    return 1; // false comes after true
                  }
                });
                
            }else{
                return result.sort((a, b) => {
                    // Handle case where a[sortHeader] is undefined
                    if (a[sortHeader] === undefined) {
                        return -1; // Move undefined values to the end
                      }
                      
                      // Handle case where b[sortHeader] is undefined
                      if (b[sortHeader] === undefined) {
                        return 1; // Move undefined values to the end
                      }
                    
                    
                  
                    // Compare boolean values if both are defined
                    if (a[sortHeader] === b[sortHeader]) {
                      return 0;
                    } else if (a[sortHeader]) {
                      return 1; // true comes after false and undefined
                    } else {
                      return -1; // false comes before true and undefined
                    }
                  });
            }
        default:
            console.log('default sort case')
    }
}


module.exports = sortMethod