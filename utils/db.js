const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

client.connect();

const db = client.db('megak_todo');

const todos = db.collection('todos')

module.exports = {
    db,
    todos,
    client,
}


