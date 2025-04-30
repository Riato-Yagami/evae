module.exports = (time = 1000) => { // time is in ms
    return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
}