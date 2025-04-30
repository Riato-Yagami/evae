module.exports = message => {
    if(message.member.permissions.serialize().ManageMessages){
        message.delete()
    }
}