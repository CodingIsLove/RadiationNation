import chai from 'chai'
import {describe, it} from "mocha";
import rest from 'restler'
import {baseUrl} from "./testingVariables";
import {mockData} from '../misc/mockData'
import {GameRoom} from "../model/GameRoom";
import {gameRoomTemplates} from "../misc/roomTemplates";

const should = chai.should()
const users = mockData.users


describe('Gameroom API testing', function () {
    /**
     * What should happen?
     * 0. You can read data from an existing room (default conditions)
     * 1. Person 1 enters the room
     * 2. Request the new DB state and verify, that now you have a differnt user 1
     * 3. Write the second user to the DB
     * 4. Update the map to a new version
     * 5. Validate all the changes
     * 6. Close the room and set all the values on default
     * 7. Verify the default state of the Gameroom
     */
    // Clean up the records
    before(function (done) {
        // wipe gameRoom Collection
        GameRoom.deleteMany({}, (err) => {
            if (err) console.log(done(err));
            console.log(`Sucessfully cleaned all Gamerooms`)
            // insert default values
            for (let i = -1; i < 5; i++) {
                const game = new GameRoom({
                    player0: "free Game Slot",
                    player1: "free Game Slot",
                    roomId: i,
                    map: gameRoomTemplates.default_level
                });
                game.save((err, doc) => {
                    if (err) {
                        console.log(`Could not save GameRoom to MongoDb because of error: ${err}`);
                        done(err)
                    }
                })
            }
        })
        done()
    })

    it('should read the default values from the room ', function(){
        throw new Error('not implemented yet')
    })
    it('should return a brand new map', (done) => {
        // todo: write this test
        rest.put(`${baseUrl}/api/user`, {}).on('success', (data) => {
            console.log(data);
        })
        done()
    });
    it('should return the gameState', function (done) {
        rest.get(`${baseUrl}/api/game/status/0`,)
            .on('success', (data, response) => {
                console.log(data);
                done()
            })
            .on('error', (error, response) => {
                console.log(error);
                done(error)
            })
    });
    it('should update the map (and answer with the new map)', (done) => {
        // todo: write this test
        rest.put(`${baseUrl}/api/user`, {}).on('success', (data) => {
            console.log(data);
        })
        done()
    });
    it('should reset the gamestate to the initial conditions', (done) => {
        // todo: write this test
        rest.put(`${baseUrl}/api/user`, {}).on('success', (data) => {
            console.log(data);
        })
        done()
    });
});
