const memberService = require('../services/MemberService');  

const memberController = {};

memberController.register = async (req, res, next) => {
    try {
        //@TODO sanitize post data
        const formData = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password,
        };
        // check if email already exists
        const existingMember = await memberService.lookupEmail(formData.email);
        if(existingMember) {
            req.flash('message', 'Sorry, an that email already exists. Try another.');
            return res.status(409).redirect('back');
        }
        // Register a new member
        const newMember = await memberService.register(formData); 
        if(newMember) {
            req.flash('message', 'Congrats! You\'re an official Diamond King Collectibles member.');
            res.status(201).redirect('/signin');
        }
        req.flash('message', 'Well, this is embarrassing...');
        return res.status(400).redirect('back');
    } catch (err) {
        console.log("There was an issue with your request." + err);
        next();
    }
};

memberController.auth = (req, res, next) => {
    try {
        const options = { successRedirect: '/', failureRedirect: '/login', failureFlash: true };
        return passport.authenticate('local', options);
    } catch {
        next();
    }
};

module.exports = memberController;
