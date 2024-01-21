const supertest = require('supertest')
const app = require('../../index')
const User = require('../../models/userModel')
const News = require('../../models/newsModel')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

let token = null
beforeAll(async () => {
    await User.deleteMany()
    await News.deleteMany()

    await api.post('/users/signup')
        .send({
            username: 'testuser1',
            password: 'test123',
            firstname: 'test',
            lastname: 'test',
            email: "test",
            password: "test"
        })

    const res = await api.post('/users/signin')
        .send({
            username: 'testuser1',
            password: 'test123'
        })

    token = res.body.token
})

afterAll(async () => await mongoose.connection.close())

describe('Know Your Rife : News requests', () => {
    test('Should allow without authentication', () => {
        return api.get('/news')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.success).toBe(true)
            })
    })

    test('Should be able to add news', () => {
        return api.post('/news')
            .set('authorization', `bearer ${token}`)
            .send({
                title: 'Good news',
                writer: "test",
                content: "test"
            })
            .then((res) => {
                expect(res.statusCode).toBe(201)
                expect(res.body.title).toMatch('Good news')
                expect(res.body.writer).toMatch('test')
                expect(res.body.content).toMatch('test')
            })
    })

    test('Should be able to edit news with token', () => {
        const updatedData = {
            title: 'Bad news',
            writer: "test",
            content: "test",
         };
        return api.put('/news')
            .set('authorization', `bearer ${token}`)
            .send(updatedData)
            .then((res) => expect(res.statusCode).toBe(200))
    })

    test('Should not be able to edit news without token', () => {
        const updatedData = {
            title: 'Bad news',
            writer: "test",
            content: "test",
         };
        return api.put('/news')
            .send(updatedData)
            .then((res) => expect(res.statusCode).toBe(405))
    })

    test('Should be able to delete news', () => {
        return api.delete('/news')
            .then((res) => {
                const expectedResponse = {
                    acknowledged: true,
                    deletedCount: 1
                };
                expect(res.body).toMatchObject(expectedResponse)
                expect(res.statusCode).toBe(200)
            })
        })
})







