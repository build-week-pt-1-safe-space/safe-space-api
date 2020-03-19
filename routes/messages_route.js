const router = require('express').Router();
const Messages = require('../models/messages_model');

const missing_id = require('../utils/requests/missing_id');

router.get('/', async (req, res) => {
    try {
        const messages = await Messages.get();

        res.status(200).json(messages);
    } catch(err) {
        res.status(500).json({ error: "Failed To Retrieve Messages", message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if(missing_id(req.params.id)) res.status(400).json({ error: "Missing ID", value: req.params.id });

        const message_id = req.params.id;
        const message = await Messages.findBy(message_id);

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ error: "Failed To Retrieve Message", message: err })
    }
});

router.post('/', async (req, res) => {
    try {
        if(!req.body) res.status(400).json({ error: "Missing Data", value: req.body });

        const messageData = req.body;
        const addedMessage = await Messages.insert(messageData);

        res.status(201).json(addedMessage);
    } catch(err) {
        res.status(500).json({error: "Failure to Add Message", message: err})
    }
});

router.put('/:id', async (req, res) => {
    try {
        if(missing_id(req.params.id)) res.status(400).json({ error: "Missing ID", value: req.params.id });
        if(!req.body) res.status(400).json({ error: "Missing Update", value: req.body })

        const message_id = req.params.id;
        const message_update = req.body;

        const updated_message = await Messages.update(message_id, message_update);

        res.status(200).json(updated_message);
    } catch(err) {
        res.status(500).json({error: "Failure To Update Message", message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if(missing_id(req.params.id)) res.status(400).json({ error: "Missing ID", value: req.params.id });

        const message_id = req.params.id;
        const removal_message = await Messages.remove(message_id);

        res.status(200).json(removal_message);
    } catch(err) {
        res.status(500).json({ error: "Failure To Remove Message", message: err });
    }
});

module.exports = router;