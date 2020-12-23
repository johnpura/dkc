const Member = require('../models/MemberModel');

const memberService = {};

/*
* Register a new member
*/
memberService.register = (memberObj) => {
    const memeberDoc = new Member(memberObj);
    memeberDoc.encryptPassword(memberObj.password);
    return memeberDoc.save(member => {
        if(member) {
            return member;
        }
        return null;
    });
       
};

/*
* Find a member by email address
*/
memberService.lookupEmail = (email) => {
    return Member.findOne({email: email}, member => {
        if(member) {
            return member;
        }
        return null;
    });
};

/*
* Finds all members
*/
memberService.showAll = () => {
    return Member.find({}, members => {
        if(members) {
            return members;
        }
        return null;
    });
};

/*
* Find a single member by Id
*/
memberService.show = (id) => {
    return Member.findById(id, '_id firstName lastName email', member => {
        if(member) {
            return member;
        }
        return null;
    });
};

/*
* Update member info
*/
memberService.update = {};

/*
* Deletes a member
*/
memberService.remove = {};

module.exports = memberService;