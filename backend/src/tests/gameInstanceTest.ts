import chai from 'chai'
import {describe,it} from "mocha";
import rest from 'restler'
import {baseUrl} from "./testingVariables";
import {mockData} from '../misc/mockData'
const should = chai.should()
const users = mockData.users


describe('GameInstance API Testing', function () {
    it('should return the gameState',function(done){
        rest.get(`${baseUrl}/api/game/status/1`,)
            .on('success',(data,response)=>{
                console.log(data);
               done()
            })
            .on('error',(error,response)=>{
                console.log(error);
                done(error)
            })
    });


    it('should not find a user, because  the db is empty', function (done) {
        rest.get(`${baseUrl}/api/user/getUserData`)
            .on('fail',(data,response)=>{
                done() // Call should return error msg 404
            })
            .on('success',(data,response)=>{
                done(response)
            })
            .on('error', (err) => {
                done(err)
            })
    })

    it('should return a brand new map',(done)=>{
        // todo: write this test
        rest.put(`${baseUrl}/api/user`,{}).on('success',(data)=>{
            console.log(data);
        })
        done()
    });

    it('should update the map (and answer with the new map)',(done)=>{
        // todo: write this test
        rest.put(`${baseUrl}/api/user`,{}).on('success',(data)=>{
            console.log(data);
        })
        done()
    });

    it('should reset the gamestate to the initial conditions',(done)=>{
        // todo: write this test
        rest.put(`${baseUrl}/api/user`,{}).on('success',(data)=>{
            console.log(data);
        })
        done()
    });
});
