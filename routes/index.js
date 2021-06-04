const express = require('express');
const router = express.Router();
const {executeQuery} = require('./../db/db.js');


/* GET home page. */
router.put('/user/:name', function(req, res, next) {
  let name = req.params.name;
  let query = `INSERT INTO Users (user_name, created_at) Values("${name}","${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}");`;

  executeQuery(query).then((data)=>{
    res.status(200).send();
  }).catch((error)=>{
    console.log(error);
    // res.sendStatus(500).send(error);
  })
});

router.get('/user/:name', function(req, res, next) {
  let name = req.params.name;
  let query = `SELECT user_name,created_at FROM Users WHERE user_name="${name}";`;

  executeQuery(query).then((data)=>{
    res.status(200).send(data[0]);
  }).catch((error)=>{
    // res.sendStatus(500).send(error);
  })
});

router.post('/subscription', function(req, res, next) {
  // let name = req.params.name;
  let query = `UPDATE Users SET plan_id="${req.body.plan_id}", start_date="${req.body.start_date}" WHERE user_name="${req.body.user_name}"`;

  executeQuery(query).then((data)=>{
    if(data.affectedRows === 1){
      query = `SELECT cost FROM Plan WHERE plan_id="${req.body.plan_id}";`
      executeQuery(query).then((data)=>{
        res.status(200).send({status:"SUCCESS",amount:data[0].cost});
      })
    }else res.status(200).send({status:"FAILURE"});
  }).catch((error)=>{
    console.log(error);
    // res.sendStatus(500).send(error);
  })
});

router.get('/subscription/:name/:date', function(req, res, next) {
  // let name = req.params.name;
  console.log(req.params);
  let query = `SELECT p.validity,p.plan_id,u.start_date FROM Users u, Plan p WHERE u.user_name="${req.params.name}" AND p.plan_id=u.plan_id;;`;

  executeQuery(query).then((data)=>{

    res.status(200).send({plan_id:data[0].plan_id,days_left: data[0].validity - (new Date(req.params.date) - new Date(data[0].start_date))/(1000 * 60 * 60 * 24)});
  }).catch((error)=>{
    res.sendStatus(500).send(error);
  })
});

module.exports = router;
