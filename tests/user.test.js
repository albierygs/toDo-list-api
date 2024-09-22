const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const app = require('../app')
const supertest = require('supertest');
const User = require('../models/user');
const { initialUsers } = require('../utils/testHelper')

const api = supertest(app)



beforeAll(async () => {
    for (const user of initialUsers) {
        const userToSave = new User({
            name: user.name,
            email: user.email,
            password: await bcryptjs.hash(user.password, 10)
        })

        await userToSave.save()

        const responsePost = await api
            .post('/login')
            .send({ email: user.email, password: user.password })
            .expect(200)

        user.token = responsePost.body.token
        
        const responseGet = await api
            .get('/user')
            .auth(user.token, { type: 'bearer' })
            .expect(200)

        user.id = responseGet.body.id
    }
}, 100000)

describe('Testes da rota de usuários', () => {

    describe('Requisições GET', () => {

        test('Bem suscedida se o token adequado for fornecido', async () => {
            const user = initialUsers[0]

            const response = await api
                .get('/user')
                .auth(user.token, { type: 'bearer' })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.id).toBe(user.id)
        })

        test('Falha com código 401 se o token não for fornecido', async () => {
            const response = await api
                .get('/user')
                .expect(401)

            expect(response.body.error).toBe('token não enviado')
        })

    })

    describe('Requisições POST', () => {

        test('Falha com código 400 se o nome não for fornecido', async () => {
            const user = {
                email: 'test@gmail.com',
                password: '123456'
            }

            const response = await api
                .post('/user')
                .send(user)
                .expect(400)

            expect(response.body.error).toContain('nome é requerido')
        })

        test('Falha com código 400 se o email não for fornecido', async () => {
            const user = {
                name: 'test',
                password: '123456'
            }

            const response = await api
                .post('/user')
                .send(user)
                .expect(400)

            expect(response.body.error).toContain('email é requerido')
        })

        test('Falha com código 400 se a senha não for fornecida', async () => {
            const user = {
                email: 'test@gmail.com',
                name: 'test'
            }

            const response = await api
                .post('/user')
                .send(user)
                .expect(400)

            expect(response.body.error).toContain('password é requerida')
        })

        test('Falha com código 400 se a senha tiver menos que 6 caracteres', async () => {
            const user = {
                email: 'test@gmail.com',
                name: 'test',
                password: '12345'
            }

            const response = await api
                .post('/user')
                .send(user)
                .expect(400)

            expect(response.body.error).toContain('password deve ter no mínimo 6 caracteres')
        })

        test('Falha com código 400 se o email já estiver cadastrado', async () => {

            const response = await api
                .post('/user')
                .send(initialUsers[0])
                .expect(400)

            expect(response.body.error).toContain('expected `email` to be unique')
        })

        test('Bem suscedida retorna código 201', async () => {
            const user = {
                email: 'test@gmail.com',
                name: 'test',
                password: '123456'
            }

            const response = await api
                .post('/user')
                .send(user)
                .expect(201)

            expect(response.body.email).toBe(user.email)
        })
        
    })
})


afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
})