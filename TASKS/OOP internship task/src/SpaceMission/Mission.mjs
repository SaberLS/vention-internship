class Mission {
  /** @type  {'planned' | 'success' | 'failed'}*/
  #status;
  id;
  name;
  rocket;
  payloadKg;
  static missionCounter = 1;

  /**
   *
   * @param {string} name
   * @param {import('../SpaceMissionComponents/Rocket.mjs').Rocket} rocket
   * @param {number} payloadKg
   */
  constructor(name, rocket, payloadKg) {
    this.id = Mission.generateId();
    this.#status = "planned";

    this.name = name;
    this.rocket = rocket;
    this.payloadKg = payloadKg;
  }

  static generateId() {
    const id = Mission.missionCounter.toString().padStart(3, "0");

    Mission.missionCounter++;

    return `MSN-${id}`;
  }

  validate() {
    if (!this.rocket.isReadyToLaunch())
      throw new Error("Rocket is not ready to launch");

    if (this.payloadKg > this.rocket.payloadCapacityKg)
      throw new Error("Rocket payload exceeded");
  }

  launch() {
    this.validate();
    this.rocket.consumeFuel(80);

    const successfull = Math.random() > 0.3;

    const commonPart = `${this.id} ${this.name}`;

    if (successfull) {
      this.#status = "success";
      return `${commonPart} launched successfully!`;
    }

    this.#status = "failed";
    return `${commonPart} failed on launch.`;
  }

  toString() {
    return `${this.id} ${this.name} | Status: ${this.#status}`;
  }
}

export { Mission };
