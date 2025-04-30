module.exports = arr =>{
    const count = arr.length;
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;
    const sortedArr = arr.sort((a, b) => a - b);
    const mid = Math.floor(count / 2);
    const median =
        count % 2 === 0
        ? (sortedArr[mid - 1] + sortedArr[mid]) / 2
        : sortedArr[mid];
    const min = sortedArr[0];
    const max = sortedArr[count - 1];
    const range = max - min;
    const variance =
        arr.reduce((acc, curr) => acc + (curr - mean) ** 2, 0) / (count - 1);
    const stdDev = Math.sqrt(variance);

    return {
        count,
        sum,
        mean,
        median,
        min,
        max,
        range,
        variance,
        stdDev,
    };
}