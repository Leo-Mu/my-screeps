let Export = {
    run: function () {
        for (const spawnName in Game.spawns) {
            let room = Game.spawns[spawnName].room;
            let towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            for (const tower of towers) {
                for (const towerName of global.TOWER_SEQUENCE) {
                    if (towerName == "attack") {
                        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                        if (target == null) continue;
                        tower.attack(target);
                    }
                    if (towerName == "heal") {
                        let target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                            filter: object => object.hits < object.hitsMax
                        });
                        if (target == null) continue;
                        tower.heal(target);
                    }
                    if (towerName == "repair") {
                        let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: object => object.hits < object.hitsMax
                        });
                        if (target == null) continue;
                        tower.repair(target);
                    }
                }
            }
        }
    }
}

module.exports = Export;