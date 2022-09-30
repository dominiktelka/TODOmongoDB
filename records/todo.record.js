/*
Tutaj trzymamy dane zwiazane z sama klasa TODOrecord ktora jest nasza klowna kalsa tworzaca obiekt oraz sprawdzajaca waldiacje
 */

const {ObjectId} = require("mongodb");

class TodoRecord {
    constructor(obj) {
        this._id = ObjectId(obj._id);
        this.title = obj.title;

        this._validate();
    }

    _validate(){
        if (this.title.trim() < 5) {
            throw new Error(`Todo tittle should be at least 5 characters.`);
        }

        if (this.title.length > 150) {
            throw new Error('Todo title should be at most 150 characters.');
        }
    }
}


module.exports = {
    TodoRecord,
}