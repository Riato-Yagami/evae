module.exports = (id, type = 'roll') => {
    const query = `INSERT INTO ${type}Queue (id)
    VALUES ('${id}')`

    fun.queryDb(query)
}