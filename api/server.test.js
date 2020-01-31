const db = require("../database/dbConfig")
const server = require("./server")
const supertest = require("supertest")

beforeEach(async () => {
    await db('users').truncate()
})

const userData = {
    username: "oweijfiowejf",
    password: "wefjw09fjk0wkf"
}

it("Register", () => {
    test("register", async () => {
        const res = await supertest(server)
            .post('/api/auth/register')
            .send(userData)
        expect(res.status).toBe(200)
    })

    test("register fail", async () => {
        const res = await supertest(server)
            .post('/api/auth/register')
            .send({ username: "Bagby" })
        expect(res.status).toBe(500)
    })
})

it("Log in", () => {
    test("login", async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send(userData)
        expect(res.headers.connection).toBe('close')
    })

    test("login2", async () => {
        const res = await supertest(server)
            .post('/api/auth/login')
            .send(userData)
        expect(res.status).toBe(404)
    })
})

