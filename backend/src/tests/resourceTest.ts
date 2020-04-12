import chai from 'chai'
import {describe,it} from "mocha";
import rest from 'restler'
const assert = chai.assert;

suite('GameInstance API Testing', ()=>{
    const base = "http://localhost:8080";

    test('/getResource',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });
});
