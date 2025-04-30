module.exports = async (user,args) => {
    // console.log(user)
    // console.log(user.send)
    success = true

    if(!user.send){
        success = false
        return success
    }
    await user.send(args).catch(err => {
        // console.log(err)
        success = false
    })

    // console.log(success)

    return success
}