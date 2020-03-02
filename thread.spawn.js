//let stringToFind = require("./lib.stringToFind");
const MAX_SCREEPS = 25;

function spawnCreep(role, spawn) {
    let room = spawn.room;
    let random = Game.time;
    let maxBody = 300;
    let extensions = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    if (extensions.length > 0) maxBody += extensions.length * extensions[0].store.getCapacity(RESOURCE_ENERGY);
    if (role == "MCW") {
        let newName = "MCW" + random;
        let m = Math.floor(maxBody / 3);
        let M = Math.floor(m / 50);
        maxBody -= M * 50;
        let c = Math.floor(maxBody / 2);
        let C = Math.floor(c / 50);
        maxBody -= C * 50;
        let W = Math.floor(maxBody / 100);
        let body = [];
        for (let i = 0; i < M; i++) {
            body.push(MOVE);
        }
        for (let i = 0; i < W; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < C; i++) {
            body.push(CARRY);
        }
        spawn.spawnCreep(body,newName);
        return;
    }
}

let Export = {
    run: function () {
        if (_.size(Game.creeps) > MAX_SCREEPS) return;
        for (const spawnName in Game.spawns) {
            let spawn = Game.spawns[spawnName];
            let room = spawn.room;
            for (const getName of global.GET_SEQUENCE) {
                if (getName == "source") {
                    let sources = room.find(FIND_SOURCES_ACTIVE);
                    if (sources.length > 0) {
                        spawnCreep("MCW", spawn);
                        break;
                    }
                }
                if (getName == "spawn") {
                    let spawns = room.find(FIND_MY_SPAWNS, {
                        filter: (spawn) => {
                            return spawn.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
                        }
                    });
                    if (spawns.length > 0) {
                        spawnCreep("MCW", spawn);
                        break;
                    }
                }
            }
        }
    }
}

module.exports = Export;