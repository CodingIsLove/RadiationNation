import chai from 'chai'
import {describe, it, before} from "mocha";
import rest from 'restler'
import {baseUrl} from "./testingVariables";
import {mockData} from '../misc/mockData'
import {GameRoom} from "../model/GameRoom";
import {gameRoomTemplates} from "../misc/roomTemplates";

const should = chai.should()
const users = mockData.users
import {setupDb} from '../config/setupDb'

describe('Gameroom API testing', function () {
    /**
     * What should happen?
     * 0. You can read data from an existing room (default conditions)
     * 1. Person 1 enters the room
     * 2. Request the new DB state and verify, that now you have a differnt user 1
     * 3. Write the second user to the Dh
     * 4. Update the map to a new version
     * 5. Validate all the changes
     * 6. Close the room and set all the values on default
     * 7. Verify the default state of the Gameroom
     */

    // Clean up the records
    before(function (done) {
        done()
    })

    it('Read the default data from an existing Room (Room 0)', function () {
        throw new Error('not implemented yet')
    })

    it('should update the room for User 1 entered the room', function () {
        throw new Error('not implemented yet')
    })

    it('should return the updated DB state', function () {
        throw new Error('not implemented yet')
    })

    it('Write a second user to the db', function () {
        throw new Error('not implemented yet')
    })

    it('should update the Map', function () {
        throw new Error('not implemented yet')
    })

    it('should validate all the changes', function () {
        throw new Error('not implemented yet')
    })

    it('should close the room and set all the values back to default', function () {
        throw new Error('not implemented yet')
    })

    it('should validate, that values are back on the default state', function () {
        throw new Error('not implemented yet')
    })
});
