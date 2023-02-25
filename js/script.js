// ignore these functions
function titleCase(str) {
	let splitStr = str.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}

// Tabs switching
const tabs = document.querySelector(".tabs");
const tabButton = document.querySelectorAll(".navTab");
const content = document.querySelectorAll(".content");

tabs.addEventListener("click", (e) => {
	const id = e.target.dataset.toggle;
	if (id) {
		tabButton.forEach((navTab) => {
			navTab.classList.remove("active");
		});
		e.target.classList.add("active");
	}
	content.forEach((content) => {
		content.classList.remove("active");
	});

	const element = document.getElementById(id);
	element.classList.add("active");
});

// Fetch and populate States and Districts
const stateList = document.querySelector(`[data-js="state-list"]`);
const districtList = document.querySelector(`[data-js="district-list"]`);
async function fetchAndPopulateStates() {
	let respState = await fetch("./data/stateList.json");
	let respDist = await fetch("./data/districtList.json");
	let states = await respState.json();
	let districts = await respDist.json();

	for (const state of states.states) {
		stateList.innerHTML += `<option value="${state}">${titleCase(
			state
		)}</option>`;
	}
	return { states, districts };
}

async function main() {
	let { districts } = await fetchAndPopulateStates();

	stateList.addEventListener("change", (e) => {
		
		// filter a certain state from states array
		let selectedState = e.target.value;
		let [respectiveDistricts] = districts.states.filter((state) => {
			return state.state === selectedState;
		});

		// Reset options to default
		districtList.innerHTML = `<option value="none" selected disabled hidden>Select District</option>`;

		// Iterate and populate Districts
		for (const district of respectiveDistricts.districts) {
			districtList.innerHTML += `<option value="${district}">${titleCase(
				district
			)}</option>`;
		}
	});
}

main();
