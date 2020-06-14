import {gameRoomTemplates} from './roomTemplates'

export const mockData = {
    users: [
        {
            username: "chris",
            password: "chris",
            email: "chris@mail.com"
        },
        {
            username: "beni",
            password: "beni",
            email: "beni@mail.com"
        },
        {
            username: "armin",
            password: "armin",
            email: "armin@mail.com"
        } ,
        {
            username: "jonas",
            password: "jonas",
            email: "jonas@mail.com"
        } ,
        {
            username: "mary",
            password: "mary",
            email: "mary@mail.com"
        } ,
        {
            username: "kevin",
            password: "kevin",
            email: "kevin@mail.com"
        }
    ],
    map: gameRoomTemplates.maps.default_level.map
}
