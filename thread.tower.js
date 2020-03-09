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
                        break;
                    }
                    if (towerName == "heal") {
                        let target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                            filter: object => object.hits < object.hitsMax
                        });
                        if (target == null) continue;
                        tower.heal(target);
                        break;
                    }
                    if (towerName == "repair") { //not include wall
                        let target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: object => object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax
                        });
                        if (target == null) continue;
                        tower.repair(target);
                        break;
                    }
                    if (towerName == "wall") {
                        let target = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: object => object.hits < object.hitsMax
                        });
                        if (target == null) continue;
                        tower.repair(target);
                        break;
                    }
                }
            }
        }
    }
}

module.exports = Export;