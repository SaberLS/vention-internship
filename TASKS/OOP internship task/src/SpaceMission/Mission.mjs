/**
 * @typedef {'planned' | 'success' | 'failed'} MissionStatus
 */

/**
 *
 * @param {Date} date
 * @returns
 */
const formatLogDate = (date) =>
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0") +
  " " +
  String(date.getHours()).padStart(2, "0") +
  ":" +
  String(date.getMinutes()).padStart(2, "0") +
  ":" +
  String(date.getSeconds()).padStart(2, "0");

class Mission {
  /** @type {MissionStatus} */
  #status;
  /** @type {{event: MissionStatus, timestamp: number}[]} */
  #log = [];
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
    this.#setStatus("planned");

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
      this.#setStatus("success");
      return `${commonPart} launched successfully!`;
    }

    this.#setStatus("failed");
    return `${commonPart} failed on launch.`;
  }

  toString() {
    return `${this.id} ${this.name} | Status: ${this.#status}`;
  }

  /**
   *
   * @param {MissionStatus} newStatus
   */
  #setStatus(newStatus) {
    this.#log.push({
      event: newStatus === "planned" ? "planned" : `launched → ${newStatus}`,
      timestamp: Date.now(),
    });
    this.#status = this.#status;
  }

  getLog() {
    return this.#log
      .map(
        ({ timestamp, event }) =>
          `[${formatLogDate(new Date(timestamp))}] ${event}`,
      )
      .join("\n");
  }
}

export { Mission };
