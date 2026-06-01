import { CrewedMission } from "./SpaceMission/index.mjs";
import { Rocket, Crew } from "./SpaceMissionComponents/index.mjs";

// --- CREW ---
const bigCrew = new Crew(4);
bigCrew.addMember({ name: "Eileen Collins", role: "Commander" });
bigCrew.addMember({ name: "Bob", role: "Flight Engineer" });
bigCrew.addMember({ name: "Another Bob", role: "Flight Engineer" });
bigCrew.addMember({ name: "Jim Voss", role: "Pilot" });

// --- SMALL CREW ---
const smallCrew = new Crew(1);
smallCrew.addMember({ name: "Eileen Collins", role: "Commander" });

// --- BAD CREW (no commander) ---
const badCrew = new Crew(3);
badCrew.addMember({ name: "Bob", role: "Pilot" });

// --- ROCKETS ---
const falcon9 = new Rocket("Falcon 9", 5000, true);
const slsBlock1 = new Rocket("SLS Block 1", 30000, false);

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
launchMission(polarisDawn);
launchMission(artemisI);
launchMission(crewDragon);

/**
 *
 * @param {import("./SpaceMission/CrewedMission.mjs").CrewedMission} mission
 */
function launchMission(mission) {
  console.log("==============================");
  console.log("Attempting to launch: ", mission.toString());
  console.log("Rocket: ", mission.rocket.toString());
  console.log(mission.crew.getManifest());
  try {
    console.log(mission.launch());
  } catch (error) {
    console.log("Error: ", error.message);
  } finally {
    console.log("Log: ", mission.getLog());
  }
  console.log("==============================");
}
