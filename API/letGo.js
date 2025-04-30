module.exports = async (interation,query) => {
    let owner = await fun.owner({id : query.asset}, interation)

    var success = false
    if(owner && owner.includes(interation.user.id)){
        fun.letGo(interation,interation.user,{id : query.asset})
        success = true
    }
    
    return {
        res : success? 'asset removed' : 'asset not owned',
        success : success,
        assetId : query.asset
    }
}