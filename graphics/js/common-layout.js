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

            // Set console, year, and category
			fadeHtml('#game-name', runData.game, true);
			fadeHtml('#game-category', runData.category, true);
            fadeHtml('#game-console', runData.system, true);
            
            // Set estimate thing
            let estimate = 'Est: ' + runData.estimate;
            fadeHtml('#game-estimate', estimate, true);

            // Pronouns
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

    // Commentator Names
    const commFullRep = nodecg.Replicant('commFull');
    const hasCommsRep = nodecg.Replicant('hasComms');

    commFullRep.on('change', (newVal) => {
        fadeHtml('#commentary-text', newVal, true);
    });

    hasCommsRep.on('change', (newVal) => {
        if (newVal == 1) {
            document.getElementById('commentary-img').style.display = 'block';
        } else {
            document.getElementById('commentary-img').style.display = 'none';
        }
    });
});