import {gameRoomTemplates} from './roomTemplates'

export const mockData = {
    users: [
        {
            username: "chris",
            password: "chris",
            email: "christopher.germann@mail.com"
        },
        {
            username: "beni",
            password: "beni",
            email: "beni.wyss@mail.com"
        },
        {
            username: "armin",
            password: "armin",
            email: "armin.windlin@mail.com"
        } ,
        {
            username: "jonas",
            password: "jonas",
            email: "jonas.augsburger@mail.com"
        } ,
        {
            username: "mary",
            password: "mary",
            email: "mary.germann@mail.com"
        } ,
        {
            username: "kevin",
            password: "kevin",
            email: "kevin.hablützel@mail.com"
        }
    ],
    map: gameRoomTemplates.maps.default_level.map
}
