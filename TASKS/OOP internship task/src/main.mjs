import { CrewedMission } from "./SpaceMission/index.mjs";
import { Rocket, Crew } from "./SpaceMissionComponents/index.mjs";

// --- CREW ---
const bigCrew = new Crew(4);
bigCrew.addMember({ name: "Eileen Collins", role: "Commander" });
bigCrew.addMember({ name: "Bob", role: "Flight Engineer" });
bigCrew.addMember({ name: "Another Bob", role: "Flight Engineer" });
bigCrew.addMember({ name: "Jim Voss", role: "Pilot" });

console.log(bigCrew.getManifest());
console.log(bigCrew.isReady()); // true

// --- SMALL CREW ---
const smallCrew = new Crew(1);
smallCrew.addMember({ name: "Eileen Collins", role: "Commander" });

console.log(smallCrew.isReady()); // true

// --- BAD CREW (no commander) ---
const badCrew = new Crew(3);
badCrew.addMember({ name: "Bob", role: "Pilot" });

console.log(badCrew.isReady()); // false

// --- ROCKETS ---
const falcon9 = new Rocket("Falcon 9", 5000, true);
const slsBlock1 = new Rocket("SLS Block 1", 30000, false);

console.log(falcon9.toString());

// --- MISSIONS ---
const artemisI = new CrewedMission("Artemis I", slsBlock1, 27000, badCrew);
const polarisDawn = new CrewedMission("Polaris Dawn", falcon9, 5000, smallCrew);
const crewDragon = new CrewedMission(
  "Crew Dragon Demo-2",
  falcon9,
  5000,
  bigCrew,
);

// --- LAUNCH SIMULATION ---
console.log(polarisDawn.toString());
console.log(polarisDawn.launch());

console.log(artemisI.toString());
// this one may throw if crew is invalid or rocket not ready

// --- LOG EXAMPLE ---
console.log(polarisDawn.getLog());
