import {describe, it, before, after} from "mocha";
import {baseUrl} from "./testingVariables";
import rest from 'restler'
import chai from 'chai'
const should = chai.should()



describe('Testing Socket Data Connection', function () {

    // 1. Setup the Room Values => There should be n+1 rooms (one for each game and one for global lobby)
    // 2. Validate, that there are (n+1) documents in the Collection
    // 3. Read the value from global lobby
    // 4. Increment the global lobby element 3 times
    // 5. Decrement the global lobby element 2 times
    // 6. Clean all up

    before(function (done) {
        // Delete all the rooms and do a setup again
        rest.del(`${baseUrl}/api/socket_data/all`)
            .on('fail', (data, response) => {
                throw new Error(`Could not setup socket_data because of: ${data}`)
            })
            .on('success', (data, response) => {
                rest.post(`${baseUrl}/api/socket_data/setup`)
                    .on('fail', (data1, response1) => {
                        throw new Error(`Could not setup socket_data because of: ${data1}`)
                    })
                    .on('success', (data1, response1) => {
                        done()
                    })
                    .on('error', (err) => {
                        done(err)
                    })
            })
            .on('error', (err) => {
                done(err)
            })
    })

    after(function (done) {
        // Delete all the rooms and do a setup again
        rest.del(`${baseUrl}/api/socket_data/all`)
            .on('fail', (data, response) => {
                throw new Error(`Could not setup socket_data because of: ${data}`)
            })
            .on('success', (data, response) => {
                rest.post(`${baseUrl}/api/socket_data/setup`)
                    .on('fail', (data1, response1) => {
                        throw new Error(`Could not setup socket_data because of: ${data1}`)
                    })
                    .on('success', (data1, response1) => {
                        done()
                    })
                    .on('error', (err) => {
                        done(err)
                    })
            })
            .on('error', (err) => {
                done(err)
            })
    })

    // TODO: We defined 10 rooms, probablly we have to outsurce this variable later
    it('should have 11 documents in collection (10 Rooms + 1 globall chat)', function (done) {
        rest.get(`${baseUrl}/api/socket_data/allDocs`)
            .on('fail', (data, response) => {
                throw new Error(`failed because of: ${data}`)
            })
            .on('success', (data, response) => {
                data.length.should.be.equal(11)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should return the amount of connected Clients)', function (done) {
        rest.get(`${baseUrl}/api/socket_data/clientAmount/global`)
            .on('fail', (data, response) => {
                throw new Error(`failed because of: ${data}`)
            })
            .on('success', (data, response) => {
                data.amountOfClients.should.be.equal(0)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should read the value from the global Chat', function (done) {
        rest.get(`${baseUrl}/api/socket_data/allDocs`)
            .on('fail', (data, response) => {
                throw new Error(`failed because of: ${data}`)
            })
            .on('success', (data, response) => {
                data.length.should.be.equal(11)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should read the value from room global ', function (done) {
        rest.get(`${baseUrl}/api/socket_data/global`)
            .on('fail', (data, response) => {
                throw new Error(`failed because of: ${data}`)
            })
            .on('success', (data, response) => {
                data.amountOfClients.should.be.equal(0)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should increment the global lobby element 1 time', function (done) {
        rest.put(`${baseUrl}/api/socket_data/inc/global`)
            .on('fail', (data, response) => {
                throw new Error(`failed because of: ${data}`)
            })
            .on('success', (data, response) => {
                data.amountOfClients.should.be.equal(1)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })
    it('should decrement the global lobby element 1 time', function (done) {
        rest.put(`${baseUrl}/api/socket_data/dec/global`)
            .on('fail', (data, response) => {
                throw new Error(`failed because of: ${data}`)
            })
            .on('success', (data, response) => {
                data.amountOfClients.should.be.equal(0)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })
})