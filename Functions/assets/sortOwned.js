module.exports = async ( assets, user, message) => {

    assets.owned = []
    assets.notOwned = []

    for await (const asset of assets.found) {
        const owner = await fun.owner(asset, message)
        // console.log(owner)
        if(owner == user){
            assets.owned.push(asset)
        }else{
            assets.notOwned.push(asset)
        }
    }

    return assets
}