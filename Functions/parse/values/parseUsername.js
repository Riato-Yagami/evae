module.exports = (user) => {
    text = user.username
    if(user.discriminator && user.discriminator != "0"){
        text += `#${user.discriminator}`
    }
    return text
}