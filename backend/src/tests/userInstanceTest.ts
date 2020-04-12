import chai from 'chai'
import {describe,it} from "mocha";
import rest from 'restler'
const assert = chai.assert;

suite('User API Tests', ()=>{
    const base = "http://localhost:8080";

    test('Should be able to create basic get call',(done)=>{
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            assert(data.userId,"123");
            assert(data.username, "chrisiBoy");
            assert(data.password, "secret");
            assert(data.email, "chris@gmail.com");
            done();
        })
    });

    test('Should be able to create basic get call',(done)=>{
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            assert(data.userId,"123");
            assert(data.username, "chrisiBoy");
            assert(data.password, "secret");
            assert(data.email, "chris@gmail.com");
            done();
        })
    })
});

