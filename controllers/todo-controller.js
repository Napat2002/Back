const db = require('../models/db')

exports.getByUser = async (req, res, next) => {
  try {
    const todos = await db.todo.findMany({
      where : { userId : req.user.id}
    })
    res.send({todos})
  } catch (error) {
    next(error)
  }

}

exports.createTodo = async (req, res, next) => {
  // validate req.body
  const data =req.body
  try{
    const rs = await db.todo.create({ 
      data : {...data,userId : req.user.id}
    })
    res.json({ msg: 'Create Ok' , result : rs })
  }catch(err) {
    next(err)
  }
}

exports.updateTodo = async (req, res, next) => {
  // validate req.params + req.body
  const {id} = req.params
  const data = req.body
  try {
    const rs = await db.todo.update({
      data :  {...data},
      where: { id : +id , userId : req.user.id} 
    })
    res.json({msg: 'Update ok', result: rs})
  }catch(err){
    next(err)
  }
}

exports.deleteTodo = async (req, res, next) => {
  const {id} = req.params
  try {
    const rs = await db.todo.delete({ where : {id : +id, userId: req.user.id}})
    res.json({msg: 'Delete ok', result : rs})
  }catch(err) {
    next(err)
  }
}