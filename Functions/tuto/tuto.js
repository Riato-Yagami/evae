const { copyFileSync } = require("fs")

module.exports = async (interaction) => {

    const page = await fun.getTuto(interaction)

    const command = interaction.commandName
    const options = interaction.options.data

    var args = []
    
    options.forEach(option => {
        if(option.name) args.push({name : option.name, value : option.value})
    });

    // console.log(command)
    // console.log(args)
    // console.log(page.objectives)
    
    page.objectives.forEach(obj => {
        var completed = testObjective(obj.objective,command,args)
        // console.log(obj.objective.command,completed)
    });
}

function testObjective(obj,cmd,args){
    if(!obj.command){
        return false
    }

    const isCmd =  testCommand(obj,cmd,args)

    return isCmd
}

function testCommand(obj,cmd,args){
    if(obj.command != cmd) return false
    if(!obj.args) return true

    var argOk = true

    obj.args.every(arg => {
        argOk = testArg(arg,args)
        return argOk
    })

    return argOk
}

function testArg(arg,args){
    // console.log(arg)
    // console.log(args)
    var argOk = false
    args.some(function(a) {
        argOk = arg.name == a.name
        if(argOk && arg.value != null) argOk = testValue(arg,a)
        return argOk
    });

    return argOk
}

function testValue(arg,a) {
    return arg.value == a.value
}