import chai from 'chai'
import {describe,it} from "mocha";
import rest from 'restler'
const assert = chai.assert;

suite('ChatInstance API Testing', ()=>{
    const base = "http://localhost:8081";


    test('/connectToGameInstance',(done)=>{
        // todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            console.log("Hello")
        })
    });

    test('/killChatInstance',(done)=>{
        // todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            console.log("Hello")
        })
    });

    test('/connect2globalChat',(done)=>{
        // todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            console.log("Hello")
        })
    });

    test('/disconnectGlobalChat',(done)=>{
        // todo: write this test
        rest.post(`${base}/api/user`,{}).on('success',(data)=>{
            console.log("Hello")
        })
    });
});
