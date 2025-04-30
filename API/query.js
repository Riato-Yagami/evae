module.exports = async query => {

    if(!query){
        return {error : 'missing query'}
    }

    if(query.action == "connect"){
        const response = await api.connect(query)
        return response
    }

    let interation = {
        user : await fun.getUser(query.user),
        guild : {id : 'web'}
    }
    
    await fun.handleInteraction(interation)

    if(!api[query.action]) return {error :'unrecognised action'}

    const response = await api[query.action](interation,query)

    return response
}