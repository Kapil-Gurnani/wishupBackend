const express = require('express');
const router = express.Router();
const {executeQuery} = require('./../db/db.js');


/* GET home page. */
router.put('/user/:name', function(req, res, next) {
  let name = req.params.name;
  let query = `INSERT INTO Users (user_name, created_at,plan_id,start_date) Values("${name}","${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}","FREE","${new Date().toISOString().split('T')[0]}");`;

  executeQuery(query).then((data)=>{
    res.status(200).send();
  }).catch((error)=>{
    res.sendStatus(500).send(error);
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
  // let query = `UPDATE Users SET plan_id="${req.body.plan_id}", start_date="${req.body.start_date}" WHERE user_name="${req.body.user_name}"`;
  let query = `INSERT INTO Users (user_name, created_at,plan_id,start_date) Values("${req.body.user_name}","${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}","${req.body.plan_id}","${req.body.start_date}");`;

  executeQuery(query).then((data)=>{
    if(data.affectedRows === 1){
      query = `SELECT cost FROM Plan WHERE plan_id="${req.body.plan_id}";`
      executeQuery(query).then((data)=>{
        res.status(200).send({status:"SUCCESS",amount:data[0].cost});
      })
    }else res.status(200).send({status:"FAILURE"});
  }).catch((error)=>{
    res.sendStatus(500).send(error);
  })
});

router.get('/subscription/:name?/:date?', function(req, res, next) {
  let query = `SELECT p.validity,p.plan_id,u.start_date FROM Users u, Plan p WHERE u.user_name="${req.params.name}" AND p.plan_id=u.plan_id;;`;

  executeQuery(query).then((data)=>{
    if(req.params.date){
      let index;
      for(let i=0 ;i<data.length; i++){
        if(data[i].validity!=='Infinite'){
          res.status(200).send({plan_id:data[i].plan_id,days_left: data[i].validity - (new Date(req.params.date) - new Date(data[i].start_date))/(1000 * 60 * 60 * 24)});
          return;
        }else index=i;
      }
      res.status(201).send({
        plan_id:data[index].plan_id,
        start_date:data[index].start_date,
        valid_till:"Lifetime"
      });
    }else {
      let output = [];
      for(let i=0 ; i<data.length ; i++){
        if(data[i].validity !== 'Infinite') output.push({
          plan_id:data[i].plan_id,
          start_date:data[i].start_date,
          valid_till:new Date(new Date(data[i].start_date).getTime() + parseInt(data[i].validity)*24*60*60*1000).toISOString().split('T')[0]
        })
        else output.push({
          plan_id:data[i].plan_id,
          start_date:data[i].start_date,
          valid_till:"Lifetime"
        })
      }
      res.status(200).send(output);
    }
  }).catch((error)=>{
    res.sendStatus(500).send(error);
  })
});

module.exports = router;
