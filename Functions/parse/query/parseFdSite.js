module.exports = (fdQuery) =>{
    var fd = {
        title : fun.decode(fdQuery.fdName),
        tag : fun.decode(fdQuery.fdTag),
        pC : fdQuery.pageCount
    }

    if(fdQuery.enabled != null){
        fd.wL = fdQuery.enabled == 1
    }else{
        fd.wL = fdQuery.whitelist == 1 && fd.pC > 500
    }

    fd.link = `https://${fd.tag}.fandom.com`

    return fd
}