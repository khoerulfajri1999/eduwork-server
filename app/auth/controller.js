const User = require('../user/model');

const register = async(req, res, next) => {
    try{

        const payload = req.body;

        let user = new User(payload);

        await user.save();

        return res.json(user);
    }   catch(err) {

        // (1) cek kemungkinan kesalahan terkait validasi
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        // (2) error lainnya
        next(err);
    }
}

module.exports = {
    register
}