import express from 'express';
const router = express.Router();
const users = [{ 'id': 1, 'firstname': 'John', 'lastname': 'Doe', 'address': 'Wallstreet', 'place': 'nyc' },
    { 'id': 2, 'firstname': 'Hans', 'lastname': 'Muster', 'address': 'Mustergasse', 'place': 'Zurich' }];

router.route('/users')
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res) => {
        const {firstname,lastname,address,place} = req.body;
        const userId = users[users.length - 1].id + 1;

        users.push(
            {
                id: userId,
                firstname,lastname,address,place
            }
        );

        res.json({
                id: userId,
                firstname,lastname,address,place
            });
    });
router.route('/users/:id')
    .get((req, res) => {
        const id = req.params.id;
        let found = false;
        let counter = 0;
        while(counter < users.length && !found){
            if(users[counter].id === Number(req.params.id)){
                found = true;
                res.json(users[counter]);
            }
            counter++;
        }

        if(!found){
            res.status(404).send('Not found');
        }
    })
    .put((req, res) => {
        const id = req.params.id;
        const {firstname,lastname,address,place} = req.body;

        users.forEach((user, i) => {
            if(user.id === Number(req.params.id)){
                users[i] = Object.assign(user,{firstname,lastname,address,place});
            }
        })

        res.status(200).send('Update ok');
    })
    .delete((req, res) => {
        const id = req.params.id;

        users.forEach((user, i) => {
            if(user.id === Number(req.params.id)){
                users.splice(i,1);
                res.status(200).send('Deleted')
            }
        })
        if(!res.headersSent){
            res.status(404).send('Not found')
        }
    });

export default router;