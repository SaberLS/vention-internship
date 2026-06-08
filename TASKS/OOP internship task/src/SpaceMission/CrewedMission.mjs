import { Mission } from "./Mission.mjs";

class CrewedMission extends Mission {
  crew;

  /**
   *
   * @param {import('../SpaceMissionComponents/Crew.mjs').Crew} crew
   * @param {string} name
   * @param {import('../SpaceMissionComponents/Rocket.mjs').Rocket} rocket
   * @param {number} payloadKg
   */
  constructor(name, rocket, payloadKg, crew) {
    super(name, rocket, payloadKg);

    this.crew = crew;
  }

  validate() {
    super.validate();

    try {
      this.crew.validate();
    } catch (error) {
      if ("message" in error && typeof error.message === "string")
        throw new Error(`Crew is not ready: ${error.message}`);

      throw new Error(`Unknown crew error`, { cause: error });
    }
  }

  toString() {
    return super.toString() + ` | Crew: ${this.crew.getSize()}`;
  }
}

export { CrewedMission };
