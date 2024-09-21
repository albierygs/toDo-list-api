const mongoose = require('mongoose');
const app = require('../app')
const supertest = require('supertest');
const User = require('../models/user');


const api = supertest(app)


describe('Testes de usuário', () => {
    describe('')
})


afterAll(async () => {
    await mongoose.connection.close()
})