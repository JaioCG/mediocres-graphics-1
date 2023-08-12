// Updating run contents
let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(loadFromSpeedControl);

function getNextRuns(runData, amount) {
	let nextRuns = [];
	let indexOfCurrentRun = findIndexInRunDataArray(runData);
	for (let i = 1; i <= amount; i++) {
		if (!runDataArray.value[indexOfCurrentRun + i]) {
			break;
		}
		nextRuns.push(runDataArray.value[indexOfCurrentRun + i]);
	}
	return nextRuns;
}

function findIndexInRunDataArray(run) {
	let indexOfRun = -1;
	if (run) {
		for (let i = 0; i < runDataArray.value.length; i++) {
			if (run.id === runDataArray.value[i].id) {
				indexOfRun = i; break;
			}
		}
	}
	return indexOfRun;
}

function loadFromSpeedControl() {
	runDataActiveRun.on('change', (newVal, oldVal) => {
		refreshNextRunsData(newVal);
	});

	runDataArray.on('change', (newVal, oldVal) => {
		refreshNextRunsData(runDataActiveRun.value);
	});

}

function refreshNextRunsData(currentRun) {
	let nextRuns = getNextRuns(currentRun, 2);

	let i = 0;
	for (let run of nextRuns) {
		if (i >= 2) {
			break;
		}
		let onDeckGame = '#on-deck-game' + (i + 1);
		let onDeckRunner = '#on-deck-info' + (i + 1);
		fadeHtml(onDeckGame, run.game, true);
		fadeHtml(onDeckRunner, getNamesForRun(run).join(', '), true);
		i += 1;
	}
}

// Updating Cookie Counter
let cookieCountRep = nodecg.Replicant("cookie-count");
cookieCountRep.on('change', (newVal) => {
    document.getElementById('cookie-count-text').innerHTML = newVal;
});

// Switching the content of the omnibar
var divs = $('div[id^="content-"]').hide(), i = 0;
(function cycle() { 
    divs.eq(i).fadeIn(1000)
	    .delay(20000)
	    .fadeOut(1000, cycle);

	i = ++i % divs.length;
})();
