function logged(req, res, next){
    
    if(!!req.session.user){
        return next()    
    }
    req.flash('unauthenticated', 'Log In First');
    res.redirect('/login')   
}

function loggedStatus(req, res, next) {
    res.locals.logged = !!req.session.user; // true jika user ada di session
    next();
}


module.exports = 
{
    logged,
    loggedStatus
}