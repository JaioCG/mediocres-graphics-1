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

    // Commentator Texts
    const comm1name = nodecg.Replicant('comm1-name');
    const comm1pronouns = nodecg.Replicant('comm1-pronouns');
    const comm2name = nodecg.Replicant('comm2-name');
    const comm2pronouns = nodecg.Replicant('comm2-pronouns');
    const comm3name = nodecg.Replicant('comm3-name');
    const comm3pronouns = nodecg.Replicant('comm3-pronouns');

    comm1name.on('change', (newVal) => {
        const comm1pronounsFull = '[' + comm1pronouns.value + ']';
        if(comm1name != '') {
            if(comm1pronounsFull === '[undefined]')
                comm1pronounsFull = '';
            const comm1nameFull = newVal + ' ' + comm1pronounsFull;
        } else {
            const comm1nameFull = '';
        }
        updateComms();
    });
    comm2name.on('change', (newVal) => {
        const comm2pronounsFull = '[' + comm2pronouns.value + ']';
        if(comm2name != '') {
            if(comm2pronounsFull === '[undefined]')
                comm2pronounsFull = '';
            const comm2nameFull = newVal + ' ' + comm1pronounsFull;
        } else {
            const comm2nameFull = '';
        }
        updateComms();
    });
    comm3name.on('change', (newVal) => {
        const comm3pronounsFull = '[' + comm3pronouns.value + ']';
        if(comm3name != '') {
            if(comm3pronounsFull === '[undefined]')
                comm3pronounsFull = '';
            const comm3nameFull = newVal + ' ' + comm1pronounsFull;
        } else {
            const comm3nameFull = '';
        }
        updateComms();
    });

    function updateComms() {
        const commentaryText = document.getElementById('commentary-text');

        if(comm1nameFull != '') {
            if(comm2nameFull != '') {
                if(comm3nameFull != '') {
                    commentaryText.innerHTML = comm1nameFull + ', ' + comm2nameFull + ', ' + comm3nameFull;
                } else {
                    commentaryText.innerHTML = comm1nameFull + ', ' + comm2nameFull;
                }
            } else {
                commentaryText.innerHTML = comm1nameFull;
            }
        } else {
            commentaryText.innerHTML = '';
        }
    }
});