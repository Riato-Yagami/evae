module.exports = (embed,pageCount,page,counterName,count) => {

    var footer = {
        text : emojies.owned
    }

    const oldFooter = embed.data.footer

    if(oldFooter){
        if(oldFooter.text) footer.text = `${oldFooter.text} `
        if(oldFooter.icon_url) footer.iconURL = oldFooter.icon_url
    }

    // console.log(oldFooter.text)
    // console.log(page,pageCount)
    const addCount = (count 
        && ((pageCount+1 != count) 
            || (pageCount == 0 
                // && count != 1
                )
            )
        )

    footer.text += ((pageCount > 0)? ` page: ${page+1} / ${pageCount+1}` : '')
    + (((pageCount > 0) && addCount)? ` --` : '')
    + (addCount? ` ${count} ${counterName}${count > 1? 's' : ''}` : ``)

    // console.log(footer.text)
    embed.setFooter(footer)
}