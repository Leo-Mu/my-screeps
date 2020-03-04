/*
creep.memory.task ={
    type = "get",
    target = {
        id,
        pos={
            room,
            x,
            y
        }
    }
}
*/

let Export = {
    run: function (creep) {
        /*task dependance*/
        if (creep.store.getFreeCapacity() == 0) {
            delete creep.memory.task;
            return;
        }
        /*task dependance*/

        if (creep.room.name == creep.memory.task.target.pos.room) {
            let target = Game.getObjectById(creep.memory.task.target.id);
            if (target == null) {
                delete creep.memory.task;
                return;
            }

            /* task main */
            if (Math.abs(creep.pos.x - target.pos.x) <= 1 && Math.abs(creep.pos.y - target.pos.y) <= 1) {
                if (target.structureType || "deathTime" in target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) != OK) {
                        delete creep.memory.task;
                    }
                } else {
                    if (creep.harvest(target) != OK) {
                        delete creep.memory.task;
                    }
                }
            } else {
                if (creep.moveTo(target) == ERR_NO_PATH) {
                    delete creep.memory.task;
                }
            }
            /* task main */

        } else {
            let target = new RoomPosition(creep.memory.task.target.pos.x, creep.memory.task.target.pos.y, creep.memory.task.target.pos.room);
            creep.moveTo(target);
        }
    }
}

module.exports = Export;