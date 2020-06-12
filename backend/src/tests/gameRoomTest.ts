import chai from 'chai'
import {describe, it, before} from "mocha";
import rest from 'restler'
import {baseUrl} from "./testingVariables";
import {mockData} from '../misc/mockData'
import {gameRoomTemplates} from "../misc/roomTemplates";
const should = chai.should()

describe('Gameroom API testing', function () {
    const users = mockData.users

    // Clean up the records
    before(function (done) {
        rest.del(`${baseUrl}/api/game/allRooms`)
            .on('success',(data,response)=>{
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
            .on('fail',(data,response)=>{
                throw new Error(`DelAllUserError: statusCode:${response.statusCode} and errmsg: ${data}`)
            })
            .on('error', (err)=>{
                done(err)
            })
    })

    it('Read the default data from an existing Room (Room 0)', function (done) {
        rest.get(`${baseUrl}/api/game/gameState/0` )
            .on('fail', (data, response) => {
                throw new Error(`Could not get state from room 0 bcs of ${data} \n further infos ${response}`)
            })
            .on('success', (data, response) => {
                console.log(data)
                data.roomId.should.be.eql("0")
                data.player1.should.be.eql('freeSlot')
                data.player2.should.be.eql('freeSlot')
                data.map.should.be.eql(gameRoomTemplates.maps.default_level)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should update the room for User 1 entered the room', function (done) {
        throw new Error('not implemented yet')
    })

    it('should return the updated DB state', function (done) {
        rest.get(`${baseUrl}/api/game/gameState/0` )
            .on('fail', (data, response) => {
                throw new Error(`Could not get state from room 0 bcs of ${data} \n further infos ${response}`)
            })
            .on('success', (data, response) => {
                console.log(data)
                data.roomId.should.be.eql("0")
                data.player1.should.be.eql(users[0].username)
                data.player2.should.be.eql('freeSlot')
                data.map.should.be.eql(gameRoomTemplates.maps.default_level)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('Write a second user to the db', function () {
        throw new Error('not implemented yet')
    })

    it('should update the Map', function () {
        throw new Error('not implemented yet')
    })

    it('should validate all the changes', function (done) {
        rest.get(`${baseUrl}/api/game/gameState/0` )
            .on('fail', (data, response) => {
                throw new Error(`Could not get state from room 0 bcs of ${data} \n further infos ${response}`)
            })
            .on('success', (data, response) => {
                console.log(data)
                data.roomId.should.be.eql("0")
                data.player1.should.be.eql(users[0].username)
                data.player2.should.be.eql(users[1].username)
                data.map.should.be.eql(gameRoomTemplates.maps.other_level)
                done()
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should close the room and set all the values back to default', function () {
        throw new Error('not implemented yet')
    })

    it('should validate, that values are back on the default state', function () {
        throw new Error('not implemented yet')
    })
});
