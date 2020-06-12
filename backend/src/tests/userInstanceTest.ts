import chai from 'chai'
import {describe, it, before} from "mocha";
import rest from 'restler'
import {mockData} from '../misc/mockData'
import {User} from "../model/User";
import {baseUrl} from './testingVariables'
import {wipeUser} from '../config/setupDb'

const should = chai.should()

describe('User API Tests', function () {
    const users = mockData.users;
    this.timeout(10000)
    before(function (done) {
        rest.del(`${baseUrl}/api/user/allUsers`)
            .on('fail', (data, response) => {
                throw new Error(`Failed to delete all users with error: ${response}`)
            })
            .on('success', (data, response) => {
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })
// testing
    it('should not find a user, because  the db is empty (=> throw err: 404)', function (done) {
        rest.get(`${baseUrl}/api/user/getUserData`, {data: users[0]})
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
        rest.post(`${baseUrl}/api/user/register`, {data: users[0]})
            .on('fail', (data, response) => {
                throw new Error(`could not create a new user... Error Code => ${response.statusCode} and response: ${JSON.stringify(data)}`)
            })
            .on('success', (data, response) => {
                response.statusCode.should.be.equal(201);
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })
    it('should throw an error, since this user is already registered', function (done) {
        rest.post(`${baseUrl}/api/user/register`, {data: users[0]})
            .on('fail', (data, response) => {
                response.statusCode.should.be.equal(409)
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
    it('should delete the already registered user', function (done) {
        throw new Error('not implemented')
    })
})
;

