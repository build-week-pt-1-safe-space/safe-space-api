const router = require('express').Router();
const Users = require('../models/users_model');

const missing_id = require('../utils/requests/missing_id');

router.get('/', async (req, res) => {
    try {
        const users = await Users.get();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed To Retrieve Users", message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if(missing_id(req.params.id)) res.status(400).json({ error: "Missing ID", value: req.params.id });

        const user_id = { id: Number(req.params.id)};
        const user = await Users.getBy(user_id);

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Failed To Retrieve Users", message: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if(missing_id(req.params.id)) res.status(400).json({ error: "Missing ID", value: req.params.id });
        if(!req.body) res.status(400).json({ error: "Missing Update", value: req.body })

        const user_id = Number(req.params.id);
        const update_data = req.body;

        const update = await Users.update(user_id, update_data);

        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: "Failed To Update", message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if(missing_id(req.params.id)) res.status(400).json({ error: "Missing ID", value: req.params.id });

        const user_id = Number(req.params.id);
        const removalMessage = await Users.remove(user_id);

        res.status(200).json(removalMessage);
    } catch (err) {
        res.status(500).json({ message: "Failed To Delete", message: err });
    }
});

module.exports = router;