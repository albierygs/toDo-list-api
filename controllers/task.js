const taskRouter = require('express').Router()
const Task = require('../models/task')
const { extrairToken, extrairUser } = require('../utils/middleware')

// Encontrar tarefas de um usuário com token dele
taskRouter.get('/', extrairToken, async (request, response) => {
  const tokenId = request.token.id
  
  const tasks = await Task.find({ user: tokenId })
  
  response.status(200).json(tasks)
})

// Não sei se vai usar!!!!
// Encontrar tarefa específica pelo id e com o token do usuário
taskRouter.get('/:id', extrairToken, extrairUser, async (request, response) => {
  const id = request.params.id
  const user = request.user
  
  if (!(user.tasks.includes(id))) {
    return response.status(401).send({ error: 'Não autorizado' })
  }
  
  const task = await Task.findById(id)
  
  if (!task) {
    return response.status(400).send({ error: 'Tarefa não encontrada' })
  }
  
  response.status(200).json(task)
})

// Criar tarefa com o token do usuário
taskRouter.post('/', extrairToken, extrairUser, async (request, response) => {
  const { name, date, description, done, important, userID } = request.body
  
  const user = request.user
  
  if (userID !== user.id) {
    return response.status(401).send({ error: 'Token e userID diferentes' })
  }
  
  const task = new Task({
    name,
    date,
    description,
    done,
    important,
    userID: user.id
  })
  
  const taskSalva = await task.save()
  
  user.tasks = user.tasks.concat(taskSalva.id)
  await user.save()
  
  response.status(200).json(taskSalva)
})

// Atualiza uma tarefa pelo id e com o token do usuário
taskRouter.put('/:id', extrairToken, extrairUser, async (request, response) => {
  
  const id = request.params.id
  const { name, date, description, done, important } = request.body
  const user = request.user
  
  if (!(user.tasks.includes(id))) {
    return response.status(401).send({ error: 'Não autorizado' })
  }
  
  const taskAtualizada = await Task.findByIdAndUpdate(
    id,
    { name, description, date, done, important },
    { new: true, runValidators: true, context: 'query' }
  )
  
  if (!taskAtualizada) {
    return response.status(400).send({ error: 'Tarefa não encontrada' })
  }
  
  response.status(200).json(taskAtualizada)
})

// Deleta uma tarefa pelo id e com o token do usuário
taskRouter.delete('/:id', extrairToken, extrairUser, async (request, response) => {
  
  const id = request.params.id
  const user = request.user
  
  if (!(user.tasks.includes(id))) {
    return response.status(401).send({ error: 'Não autorizado' })
  }
  
  const taskDeletada = await Task.findByIdAndDelete(id)
  
  if (!taskDeletada) {
    return response.status(400).send({ error: 'Tarefa não encontrada' })
  }
  
  response.json(204).end()
})

module.exports = taskRouter