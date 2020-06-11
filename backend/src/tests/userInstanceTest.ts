import chai from 'chai'
import {describe, it, before} from "mocha";
import rest from 'restler'
import {mockData} from '../misc/mockData'
import {User} from "../model/User";
import {baseUrl} from './testingVariables'

const should = chai.should()

describe('User API Tests', function () {

    const users = mockData.users;
    before(function (done) {
        if (User.count()) {
            User.deleteMany({}, (err) => {
                if (err) {
                    done(err)
                }
            })
        }
        console.log(`Wiped the user database`)
        done()
    })
    it('should not find a user, because  the db is empty (=> throw err: 404)', function (done) {
        rest.get(`${baseUrl}/api/user/getUserData`)
            .on('fail', (data, response) => {
                response.statusCode.should.be.equal(404);
                done()
            })
            .on('success', (data, response) => {
                throw new Error('User should not be found!')
            })
            .on('error', (err) => {
                done(err)
            })
    })
    it('should register a new user', function (done) {
        rest.post(`${baseUrl}/api/user/register`, users[0])
            .on('fail', (data, response) => {
                throw new Error('this function should work')
            })
            .on('success', (data, response) => {
                data.statusCode.should.be.equal(201);
                console.log(response);
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })
    it('should throw an error, since this user is already registered', function (done) {
        rest.post(`${baseUrl}/api/user/register`, users[0])
            .on('fail', (data, response) => {
                response.statusCode.should.be.equal(400)
                done()
            })
            .on('success', (data, response) => {
                throw new Error('user should be already registered... why did that work?')
            })
            .on('error', (err) => {
                done(err)
            })
    })
    it('should find an already registered user', function (done) {
        throw new Error('not implemented yet')
    })
    it('should delete the already registered user', function(done){
        throw new Error('not implemented')
    })
});

