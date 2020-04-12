import chai from 'chai'
import {describe,it} from "mocha";
import rest from 'restler'
const assert = chai.assert;

suite('GameInstance API Testing', ()=>{
    const base = "http://localhost:8080";


    test('/getGameState',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

    test('/newGame',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

    test('/updateGameState',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });

    test('/killGameInstance',(done)=>{
        //todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
        })
    });
});
