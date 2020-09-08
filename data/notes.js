const fs = require('fs');
const util = require('util');
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync('data/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('data/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then(notes => {
            let updateNotes;
            try {
                updateNotes = [].concat(JSON.parse(notes))
            }
            catch (err) {
                updateNotes = [];
            }
            return updateNotes;
        })
    }
    addPostNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Title/Text REQUIRED')
        }
        const newNote = { title, text, id: uuidv1() }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNote => this.write(updateNote))
            .then(() => newNote);
    }
    eraseNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(updateNote => this.write(updateNote));
    }
}

module.exports = new Notes();