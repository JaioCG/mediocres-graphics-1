// Name Replicants
const commFullRep = nodecg.Replicant('commFull');
const hasCommsRep = nodecg.Replicant('hasComms');

function updateComms() {
    // Commentator 1 Name
    let comm1pronouns = '[' + document.getElementById('comm1-pronouns').value + ']';
	if (comm1pronouns == '[]')
        comm1pronouns = '';
	let comm1Full = document.getElementById('comm1-name').value + ' ' + comm1pronouns;

    // Commentator 2 Name
    let comm2pronouns = '[' + document.getElementById('comm2-pronouns').value + ']';
    if (comm2pronouns == '[]')
        comm2pronouns = '';
    let comm2Full = document.getElementById('comm2-name').value + ' ' + comm2pronouns;

    // Commentator 3 Name
    let comm3pronouns = '[' + document.getElementById('comm3-pronouns').value + ']';
    if (comm3pronouns == '[]')
        comm3pronouns = '';
    let comm3Full = document.getElementById('comm3-name').value + ' ' + comm3pronouns;

    // Putting names together
    if(comm1Full != ' ') {
        if(comm2Full != ' ') {
            if(comm3Full != ' ') {
                commFullRep.value = comm1Full + ', ' + comm2Full + ', ' + comm3Full;
                hasCommsRep.value = 1;
            } else {
                commFullRep.value = comm1Full + ', ' + comm2Full;
                hasCommsRep.value = 1;
            }
        } else {
            commFullRep.value = comm1Full;
            hasCommsRep.value = 1;
        }
    } else {
        commFullRep.value = '';
        hasCommsRep.value = 0;
    }

    console.log(comm1Full);
    console.log(comm2Full);
    console.log(comm3Full);
    console.log(commFullRep.value);
}