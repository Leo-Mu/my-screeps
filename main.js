//config
const constThreads = ["spawn", "schedule"];
Memory.missionThreads = [];
global.GET_SEQUENCE = ["tombstone", "source"/*, "spawn"*/];
global.PUT_SEQUENCE = ["repaire", "build", "spawn", "controller"];

//require threads
let Thread = {};
Thread.spawn = require("./thread.spawn");
Thread.schedule = require("./thread.schedule");
//require tasks
let Tasks = {};
Tasks.get = require("./task.get");
Tasks.put = require("./task.put");
Tasks.build = require("./task.build");
Tasks.repaire = require("./task.repaire");

module.exports.loop = function () {
	//Clearing non-existing creep memory
	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	//constThreads
	for (const thread of constThreads) {
		Thread[thread].run();
	}

	//creep tasks
	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
		if (!creep.memory.task) continue;
		Tasks[creep.memory.task.type].run(creep);
	}
}