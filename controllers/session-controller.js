function validateSession(req, res, next, sessionId){
  res.locals.sessionId = sessionId;
  next()
}

function viewHandler(req, res){
  res.render('index.ejs', { 
    sessionId: res.locals.sessionId
  });
}

module.exports =  {
  validateSession,
  viewHandler
}