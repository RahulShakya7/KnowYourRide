const supertest = require("supertest");
const server = require("../index");
const { default: mongoose } = require('mongoose');
const User = require("../models/userModel");

const api = supertest(server);

beforeAll(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Routes', () => {
    const newUser = {
        username: "testingg",
        email: "testingg@gmail.com",
        password: "test123",
        firstname: "Te2st User",
        lastname: "Te2st User"
    }

    test("should register a new user", async () => {
        const response = await api.post("/users/signup").send(newUser);
        expect(response.statusCode).toBe(201);
    });

    test('should not allow duplicate usernames', () => {
        return api.post('/users/signup')
            .send(newUser)
            .then((res) => {
                expect(res.statusCode).toBe(200)
            })
    });

    test('should not allow empty fields', () => {
        return api.post('/users/signup')
            .send({})
            .then((res) => {
                expect(res.statusCode).toBe(500)
            })
    });

    test("should login with valid credentials", async () => {
        const userCredentials = {
            username: "testingg",
            password: "test123",
        };
        const response = await api.post("/users/signin").send(userCredentials);
        expect(response.statusCode).toBe(200);

    });
});