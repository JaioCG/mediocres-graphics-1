'use strict';

$(() => {

	loadFromSpeedControl();

	function loadFromSpeedControl() {
		const speedcontrolBundle = 'nodecg-speedcontrol';

		let gameTitle = $('#game-name');
		let gameCategory = $('#game-category');
		let gameSystem = $('#game-platform');
		let gameYear = $('#game-year');
		let gameEstimate = $('#game-estimate');

		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal, oldVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		function updateSceneFields(runData) {
			let currentTeamsData = runData.teams;
			gameSystem.html(runData.system);
			gameYear.html(runData.release);
			gameEstimate.html(runData.estimate);

			fadeHtml('#game-name', runData.game, true);
			fadeHtml('#game-category', runData.category, true);

			$('.runner-name').add('.pronouns').text('');
			$('.runner-details').data('teamID', '');
			let i = 0;

			for (let team of currentTeamsData) {
				for (let player of team.players) {
					let pronoun = '[' + player.pronouns + ']';
					if (pronoun === '[undefined]')
						pronoun = '';
					let runnerNameFull = player.name + ' ' + pronoun;

                    fadeText('#runner-name' + (i + 1), runnerNameFull, true);
					$('#runner-details' + (i + 1)).data('teamID', player.teamID);
					i += 1;
				}
			}
		}
	}
});