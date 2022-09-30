/*
Tutaj trzymamy nasze funckej tkore odpowiadaja za poszczegolne akcje typu usun, wysiwetl itd
 */

const {TodoRecord} = require("../records/todo.record");
const {todos} = require("../utils/db");
const {ObjectId} = require("mongodb");

class TodoRepository{

    static _checkRecord(record){
        if(!(record instanceof TodoRecord)){
            throw new Error('Record must be an instance of TodoRecord');
        }
    }
   static async insert(record){
       TodoRepository._checkRecord(record);
/*
        poniewaz funckja insert zwraca nam informacje o nowym Id mozemy to przechwycic i ustawic jako _id w TodoRecord, zeby nie miec za duzo paramterów ID w bazie.
 */
       const {insertedId} = await todos.insertOne(record)
       record._id = insertedId;
       return insertedId
    }

    static async update(record) {
        TodoRepository._checkRecord(record);

        await todos.replaceOne({
            _id: record._id
        }, {
            /*
            Ustawiamy konkretnie parametr na tytul aby nikt z zewnatrz nie mogl dodwac nieporzadanych pol do pliku oraz zabezpieczamy sie stringiem
             */

            title: String(record.title),
        });
    }

    static async delete(record) {
        TodoRepository._checkRecord(record);

        await todos.deleteOne({
            _id: record._id
        })
    }

    static async find(id) {
        /*
            sproawdzamy do tego, ze wyszkuje nam po objektId ktore musi by stringiem, dodatkowo zabezpiecza nas to przed niepozadanymi zmianami w kodzie przez uzytkownika
         */
        const item =  await todos.findOne({_id:ObjectId(String(id))})

        return item === null ? null : new TodoRecord(item)
    }

    static async findAll(){
        return (await todos.find()).toArray();
    }
}

module.exports = {
    TodoRepository
}