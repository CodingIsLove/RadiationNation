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
        }
    ],
    map: gameRoomTemplates.default_level
}
