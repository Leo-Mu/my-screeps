/*
creep.memory.task ={
    type = "build",
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
        if (creep.store.getUsedCapacity() == 0) {
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
            if (Math.abs(creep.pos.x - target.pos.x) <= 3 && Math.abs(creep.pos.y - target.pos.y) <= 3) {
                if (creep.build(target) != OK) {
                    delete creep.memory.task;
                }
            } else {
                creep.moveTo(target);
            }
            /* task main */

        } else {
            let target = new RoomPosition(creep.memory.task.target.pos.x, creep.memory.task.target.pos.y, creep.memory.task.target.pos.room);
            creep.moveTo(target);
        }
    }
}

module.exports = Export;