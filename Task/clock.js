const interval = 60 * 60 * 1000 // 1h
// const interval = 60 * 1000 // 1min
// const interval = 10 * 1000 // 10s
module.exports = async _ => {
    run()
}

function run(){
    let delay = nextInterval()
    // console.log(new Date())
    setTimeout(() => {
        task()
        run()
    }, delay);
}

function nextInterval(){
    return interval - new Date().getTime() % interval
}

function task(){
    // console.log("execute task")
    fun.voteNotification()
    fun.rollNotification()
}

