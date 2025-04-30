module.exports = async query => {
    let user = {
        id : query.user,
        username : query.username,
        discriminator : 'web',
        displayAvatarURL : function displayAvatarURL() {
            return fun.decode(query.picture)
        },
    }

    const res = await fun.addUser(user)

    let interaction = {
        user : await fun.getUser(query.user),
        guild : {id : 'web', name : "web"}
    }
    
    await fun.handleInteraction(interaction)
    
    // const player = await fun.getPlayer({id : 'web'},interation.user)
    const player = interaction.player
    return {res : 'connected', player}
}