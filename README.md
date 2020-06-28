
# RadiationNation

This is a game, we develop for the Web Engineering Course at our university of applied sciences

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## How to Play
### Login / Register
First you have to register yourself in order to get to the Lobby. Your Logindata will be stored in our MongoDB Atlas Database (encrypted). Usernames / Emails cannot be used twice. After registering simply type in the correct Username and Password.

### Lobby
In the Lobby you can join a Game. Each Game Session shows which User has joined and if it is empty or full. A maximum of 2 People can join a game and play against eachother. When 2 People are in a Game Session, the Game will automaticly start. If both players leave, the Game Session will close.

### Game
Each Player gets assigned a Nation (USA-Red vs. Russia-Blue). They both have the same starting Gold (100) and Health (50). They can send a Unit listed below the Game Screen (Swordfighter, Knight, Spearfighter, Bowman), each send costs 10 Gold. The sent Units run towards eachother and fight. The Fight is decided like the following:

Swordfighter: Wins against Spearfighter, Loses against Knight, Random against Bowman.
Knight: Wins against Swordfighter, Loses against Spearfighter, Random against Bowman.
Spearfighter: Wins against Knight, Loses against Swordfighter, Random against Bowman.
Bowman: Random against Swordfighter, Random against Knight, Random against Spearfighter, Loses against Bowman.

If a Unit reaches the enemy's Base, the enemy loses 10 Health.

Winning / Losing Condition: The first Player who reaches 0 Health loses the Game, the other wins. When a Game is won, both Players will be sent back to the Lobby.

### Installing

The Installation Manual can be found in the [Installation Guide (Wiki)](https://github.com/CodingIsLove/RadiationNation/wiki/Installation-Guide).

## Deployment

We have deployed RadiationNation in our Local Network. For that we used 2 Raspberry Pi's (1x Backend / 1x Frontend). Then we opened Ports and forwarded them to run it and possibly accessing it remotely.

## Technologies used

A full list of technologies used, architecture of the game and of the network protocol can be found in the [Stack, Architecture and Protocol (Wiki)](https://github.com/CodingIsLove/RadiationNation/wiki/Stack,-Architecture-and-Protocol).

## Authors

* **Christopher Germann** - *Initial work* - [CodingIsLove](https://github.com/CodingIsLove)
* **Benjamin Wyss** - *Initial work* - [BenWyss](https://github.com/BenWyss)

See also the list of [contributors](https://github.com/CodingIsLove/RadiationNation/contributors) who participated in this project.
