const middleware = (req, res, next) => {
    const body = req.body;

    if(req.headers['apikey'] == undefined || req.headers['apikey'].length == 0){
        return res.status(403).json('please provide an APIKEY in the header')
    }
    if(body.spreadSheetId == undefined || body.spreadSheetId.length == 0){
        return res.status(403).json('please provide an SPREAD SHEET ID')
    }
    if(body.sheetIndex == undefined){
        return res.status(403).json('please provide an SHEET INDEX')
    }
    if(body.sheetIndex < 0){
        return res.status(403).json('SHEET INDEX cannot be negative')
    }

    if(body.sort != undefined){
        const sortArray=['asc','desc']
        if(!body.sort.includes(':')){
            return res.ststus(403).json(`invalid sort query, it must be like (header) : (asc or desc)`)
        }
        const [sortHeader,sortOrder] = sort.split(':')
        if(sortOrder.length == 0){
            return res.status(403).json('please provide an sorting order')
        }
        if (!sortArray.includes(sortOrder)){
            return res.ststus(403).json(`it must be either ascending = asc (or) descending = desc`)
        }
    }
    next()
}   

module.exports = middleware