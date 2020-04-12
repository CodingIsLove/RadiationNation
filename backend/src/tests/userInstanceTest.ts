import chai from 'chai'
import {describe,it} from "mocha";
import rest from 'restler'
const assert = chai.assert;

suite('User API Tests', ()=>{
    const base = "http://localhost:8080";

    test('this call was generated, to understand how to work with testing',(done)=>{
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            assert(data.userId,"123");
            assert(data.username, "chrisiBoy");
            assert(data.password, "secret");
            assert(data.email, "chris@gmail.com");
            done();
        })
    });

    test('/getUserData',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

    test('/register',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

     test('/login',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

     test('/getVerificationMail',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

     test('/updateUser',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });
});

