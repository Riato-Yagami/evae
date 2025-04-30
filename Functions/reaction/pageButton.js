module.exports = async (message,page,pageCount) => {
    var next =  fun.confirmButton( message, false, emojies.next,'next')
    var previous =  fun.confirmButton( message, false, emojies.previous,'previous')
    return new Promise((resolve, reject) => {
        if(next || previous){
            page += next? 1 : -1
            page %= pageCount
            resolve(page)
        }else{
            resolve(null)
        }
    })

    return page
}
