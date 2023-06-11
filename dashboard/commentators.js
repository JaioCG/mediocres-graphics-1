// Name Replicants
const comm1name = nodecg.Replicant('comm1-name');
const comm1pronouns = nodecg.Replicant('comm1-pronouns');
const comm2name = nodecg.Replicant('comm2-name');
const comm2pronouns = nodecg.Replicant('comm2-pronouns');
const comm3name = nodecg.Replicant('comm3-name');
const comm3pronouns = nodecg.Replicant('comm3-pronouns');

function updateComms() {
    comm1name.value = document.getElementById('comm1-name').value;
    comm1pronouns.value = document.getElementById('comm1-pronouns').value;
    comm2name.value = document.getElementById('comm2-name').value;
    comm2pronouns.value = document.getElementById('comm2-pronouns').value;
    comm3name.value = document.getElementById('comm3-name').value;
    comm3pronouns.value = document.getElementById('comm3-pronouns').value;

    console.log('Comms updated');
}