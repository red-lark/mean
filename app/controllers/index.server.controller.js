exports.render = function(req, res){
  
    if(!req.session.lastVisit){
        req.session.lastVisit = new Date();
        req.session.beginnViewing = new Date();
        
    }else{
        req.session.lastVisit = new Date();
    }
  
    res.render('index',{
        title: 'Titel',
        message: 'Das ist Test3',
        lastVisit: req.session.lastVisit,
        beginn: req.session.beginnViewing
    })
};