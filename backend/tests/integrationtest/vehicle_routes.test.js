const supertest = require('supertest')
const app = require('../../index')
const User = require('../../models/userModel')
const Vehicles = require('../../models/vehicleModel')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

let token = null
beforeAll(async () => {
    await User.deleteMany()
    await Vehicles.deleteMany()

    await api.post('/users/signup')
        .send({
            username: 'testuser2',
            password: 'test123',
            firstname: 'test',
            lastname: 'test',
            email: "test",
            password: "test"
        })

    const res = await api.post('/users/signin')
        .send({
            username: 'testuser2',
            password: 'test123'
        })

    token = res.body.token
})

afterAll(async () => await mongoose.connection.close())

describe('Know Your Rife : Vehicle requests', () => {
    test('Should allow without authentication', () => {
        return api.get('/vehicle')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body.success).toBe(true)
            })
    })

    test('Should be able to add vehicle', () => {
        return api.post('/vehicle')
            .set('authorization', `bearer ${token}`)
            .send({
                model: 'Good vehicle',
                specs: "test",
                manufacturer: "test",
                year: 2022,
            })
            .then((res) => {
                expect(res.statusCode).toBe(201)
                expect(res.body.model).toMatch('Good vehicle')
                expect(res.body.specs).toMatch('test')
                expect(res.body.manufacturer).toMatch('test')
            })
    })

    test('Should be able to edit vehicle with token', () => {
        const updatedData = {
            model: 'Good vehicle',
            specs: "test",
            manufaturer: "test",
            year: "test",
         };
        return api.put('/vehicle')
            .send(updatedData)
            .then((res) => expect(res.statusCode).toBe(405))
    })

    test('Should not be able to edit vehicle without token', () => {
        const updatedData = {
            model: 'Bad vehicle',
            specs: "test",
            manufaturer: "test",
            year: "test",
         };
        return api.put('/vehicle')
            .set('authorization', `bearer ${token}`)
            .send(updatedData)
            .then((res) => expect(res.statusCode).toBe(405))
    })

    test('Should be able to delete vehicle', () => {
        return api.delete('/vehicle')
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







