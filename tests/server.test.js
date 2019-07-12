const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')


beforeEach((done) => {
    Todo.remove({}).then(() => done())
})

describe('POST /addtodos', () => {
    it('should create a new todo', (done) => {
        const note = 'Text todo text'

        request(app)
            .post('./addtodos')
            .send({note})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(note)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].note)
                    done()
                }).catch((e) => done(e))
            })
    })
})