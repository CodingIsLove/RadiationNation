import chai from 'chai'
import {describe, it, before,after} from "mocha";
import rest from 'restler'
import {baseUrl} from "./testingVariables";
import {mockData} from '../misc/mockData'
import {gameRoomTemplates} from "../misc/roomTemplates";
import {wipeGameRoom} from "../config/setupDb"

const should = chai.should()
const users = mockData.users;


describe('Game Room Test', function () {
    this.timeout(5000)
    before((done) => {
        wipeGameRoom()
        rest.put(`${baseUrl}/api/game/resetAllRooms`)
            .on('fail', (data, response) => {
                throw new Error(`Could not reset the Rooms because of ${data}`)
            })
            .on('success', (data, response) => {
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    after(function (done) {
        rest.put(`${baseUrl}/api/game/resetRoom/0`, {data: users[1]})
            .on('fail', (data, response) => {
                throw new Error(`failed with error ${data}`)
            })
            .on('success', (data, response) => {
                data.player1.should.be.equal('freeSlot')
                data.player2.should.be.equal('freeSlot')
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    describe('Join Gameroom', function () {

        it('should make an request without a body and therefore throw an error', function (done) {
            rest.put(`${baseUrl}/api/game/joinGameRoom/0`)
                .on('fail', (data, response) => {
                    response.statusCode.should.be.equal(402); // 402 = Payment Required
                    done()
                })
                .on('success', (data, response) => {
                    throw new Error('JoinRoom should not be possible without a payload')
                })
                .on('error', (err) => {
                    done(err)
                })
        })

        it('should add User1 to the Document', function (done) {
            rest.put(`${baseUrl}/api/game/joinGameRoom/0`, {data: users[0]})
                .on('fail', (data, response) => {
                    throw new Error('joinGameRoom should not fail with User 0')
                })
                .on('success', (data, response) => {
                    rest.get(`${baseUrl}/api/game/gameState/0`)
                        .on('fail', (data1, response1) => {
                            throw new Error(`Loading state GameRoom 0 errormsg:${data}`)
                        })
                        .on('success', (data1, response1) => {
                            data1.player1.should.be.equal(users[0].username)
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

        it('should add User1 again and throw error, since user is already in room', function (done) {
            rest.put(`${baseUrl}/api/game/joinGameRoom/0`, {data: users[0]})
                .on('fail', (data, response) => {
                    done()
                })
                .on('success', (data, response) => {
                    throw new Error(`You should not be able to add the same user twice to the room!`)
                })
                .on('error', (err) => {
                    done(err)
                })
        })
        it('Add User 2 to the room', function (done) {
            rest.put(`${baseUrl}/api/game/joinGameRoom/0`, {data: users[1]})
                .on('fail', (data, response) => {
                    throw new Error('joinGameRoom should not fail with User 2')
                })
                .on('success', (data, response) => {
                    rest.get(`${baseUrl}/api/game/gameState/0`)
                        .on('fail', (data1, response1) => {
                            throw new Error(`Loading state GameRoom 0 errormsg:${data}`)
                        })
                        .on('success', (data1, response1) => {
                            data1.player2.should.be.equal(users[1].username)
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
        it('should add User 3 to the room, but since there is only space for 2 throw an error ', function (done) {
            rest.put(`${baseUrl}/api/game/joinGameRoom/0`, {data: users[1]})
                .on('fail', (data, response) => {
                    response.statusCode.should.be.equal(400)
                    done()
                })
                .on('success', (data, response) => {
                    throw new Error(`room is full, why could i join? error: ${data}`)
                })
                .on('error', (err) => {
                    done(err)
                })
        })
    })

    describe('Gameroom API testing', function () {
        // Clean up the records
        before(function (done) {
            rest.del(`${baseUrl}/api/game/allRooms`)
                .on('success', (data, response) => {
                    rest.put(`${baseUrl}/api/game/resetAllRooms`)
                        .on('fail', (data2, response2) => {
                            throw new Error(`Failed to delete all rooms with error: ${response2}`)
                        })
                        .on('success', (data2, response2) => {
                            done()
                        })
                        .on('error', (err) => {
                            done(err)
                        })
                })
                .on('fail', (data, response) => {
                    throw new Error(`DelAllUserError: statusCode:${response.statusCode} and errmsg: ${data}`)
                })
                .on('error', (err) => {
                    done(err)
                })
        })

        it('Read the default data from an existing Room (Room 0)', function (done) {
            rest.get(`${baseUrl}/api/game/gameState/0`)
                .on('fail', (data, response) => {
                    throw new Error(`Could not get state from room 0 bcs of ${data} \n further infos ${response}`)
                })
                .on('success', (data, response) => {
                    data.roomId.should.be.eql("0")
                    data.player1.should.be.eql('freeSlot')
                    data.player2.should.be.eql('freeSlot')
                    data.map.should.be.eql(gameRoomTemplates.maps.default_level.map)
                    done()
                })
                .on('error', (err) => {
                    done(err)
                })
        })

        it('should add User 1 and User 2 to the room', function (done) {
            rest.put(`${baseUrl}/api/game/joinGameRoom/0`, {data: users[0]})
                .on('fail', (data, response) => {
                    throw new Error('joinGameRoom should not fail with User 1')
                })
                .on('success', (data, response) => {
                    rest.put(`${baseUrl}/api/game/joinGameRoom/0`, {data: users[1]})
                        .on('fail', (data1, response1) => {
                            throw new Error('joinGameRoom should not fail with User 2')
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

        it('should update the Map', function (done) {
            rest.putJson(`${baseUrl}/api/game/updateMap/0`,gameRoomTemplates.maps.other_level)
                .on('fail', (data, response) => {
                    throw new Error(`Could not get state from room 0 bcs of ${JSON.stringify(data)} \n further infos ${response}`)
                })
                .on('success', (data, response) => {
                    data.roomId.should.be.eql("0")
                    data.player1.should.be.eql(users[0].username)
                    data.player2.should.be.eql(users[1].username)
                    data.map.should.be.eql(gameRoomTemplates.maps.other_level.map)
                    done()
                })
                .on('error', (err) => {
                    done(err)
                })
        })

        it('should return the updated GameRoomState ', function (done) {
            rest.get(`${baseUrl}/api/game/gameState/0`)
                .on('fail', (data, response) => {
                    throw new Error(`Could not get state from room 0 bcs of ${data} \n further infos ${response}`)
                })
                .on('success', (data, response) => {
                    data.roomId.should.be.eql("0")
                    data.player1.should.be.eql(users[0].username)
                    data.player2.should.be.eql(users[1].username)
                    data.map.should.be.eql(gameRoomTemplates.maps.other_level.map)
                    done()
                })
                .on('error', (err) => {
                    done(err)
                })
        })

        it('should validate all the changes', function (done) {
            rest.get(`${baseUrl}/api/game/gameState/0`)
                .on('fail', (data, response) => {
                    throw new Error(`Could not get state from room 0 bcs of ${data} \n further infos ${response}`)
                })
                .on('success', (data, response) => {
                    data.roomId.should.be.eql("0")
                    data.player1.should.be.eql(users[0].username)
                    data.player2.should.be.eql(users[1].username)
                    data.map.should.be.eql(gameRoomTemplates.maps.other_level.map)
                    done()
                })
                .on('error', (err) => {
                    done(err)
                })
        })
    });
})

