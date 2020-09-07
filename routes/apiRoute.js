const router = require('express').Router();
const { notes } = require(`../data/db.json`);

router.get('/notes', (req, res) => {
    notes.getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json(err))
});

router.post('/notes', (req, res) => {
    notes.addCreatedNote(req.body)
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json(err))
});

router.delete('/notes/:id', (req, res) => {
    notes.deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(400).json(err))
});

module.exports = router;