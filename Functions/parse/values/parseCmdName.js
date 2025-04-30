module.exports = command => { //</help:1076120196017823806>
    if(command.id) return `</${command.name}:${command.id}>`
    
    return `/${command.name}`
}