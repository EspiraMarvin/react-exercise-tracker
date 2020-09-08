const router = require('express').Router();
let User = require('../models/user.model');

//localhost/5000/users/
router.route('/').get((req, res) => {
    User.find() // mongoose method to find all the users
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error ${err}`));
});

router.route('/add').post((req, res) => {
   const username = req.body.username;

   //create a new instance of user
   const newUser = new User({username});

   newUser.save()
       .then(() => res.json('User Added!'))
       .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;
