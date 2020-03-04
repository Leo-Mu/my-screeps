function newTaskTarget(target) {
    this.id = target.id;
    this.pos = {};
    this.pos.room = target.pos.roomName;
    this.pos.x = target.pos.x;
    this.pos.y = target.pos.y;
}

let Export = {
    run: function () {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (!creep.memory.task) {
                if (creep.store.getUsedCapacity() != 0) {
                    for (const putName of global.PUT_SEQUENCE) {
                        let random = _.random(3);
                        if (putName == "repaire" && random == 3) {
                            if (_.size(Game.creeps) < 10) continue;
                            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: object => object.hits < object.hitsMax
                            });
                            if (target == null) continue;
                            creep.memory.task = {};
                            creep.memory.task.type = "repaire";
                            creep.memory.task.target = new newTaskTarget(target);
                            break;
                        }
                        if (putName == "build" && random == 2) {
                            if (_.size(Game.creeps) < 10) continue;
                            let target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
                            if (target == null) continue;
                            creep.memory.task = {};
                            creep.memory.task.type = "build";
                            creep.memory.task.target = new newTaskTarget(target);
                            break;
                        }
                        if (putName == "spawn" && random >= 1) {
                            //if (_.size(Game.creeps) > 10) continue;
                            let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                }
                            });
                            if (target == null) continue;
                            creep.memory.task = {};
                            creep.memory.task.type = "put";
                            creep.memory.task.target = new newTaskTarget(target);
                            break;
                        }
                        if (putName == "controller") {
                            let target = creep.room.controller;
                            if (target == null) continue;
                            creep.memory.task = {};
                            creep.memory.task.type = "put";
                            creep.memory.task.target = new newTaskTarget(target);
                            break;
                        }
                    }
                } else {
                    for (const getName of global.GET_SEQUENCE) {
                        if (getName == "tombstone") {
                            let target = creep.pos.findClosestByPath(FIND_TOMBSTONES);
                            if (target == null) continue;
                            creep.memory.task = {};
                            creep.memory.task.type = "get";
                            creep.memory.task.target = new newTaskTarget(target);
                            break;
                        }
                        if (getName == "source") {
                            let target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                            if (target == null) continue;
                            creep.memory.task = {};
                            creep.memory.task.type = "get";
                            creep.memory.task.target = new newTaskTarget(target);
                            break;
                        }
                    }
                }
            }
        }
    }
}

module.exports = Export;