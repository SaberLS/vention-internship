/**
 * @typedef {'success' | 'failed'} MissionResult
 */

/**
 * @typedef {'planned' | MissionResult} MissionStatus
 */

/** @typedef {'planned' | `launched → ${MissionResult}`} LogEvent*/

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
  /** @type {{event: LogEvent, timestamp: number}[]} */
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
    this.#status = "planned";
    this.#addLog("planned");

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
    const missionResult = Math.random() >= 0.7 ? "success" : "failed";

    this.#addLog(`launched → ${missionResult}`);
    this.#status = missionResult;

    return `${this.id} ${this.name} ${missionResult === "success" ? "launched successfully!" : "failed on launch."}`;
  }

  toString() {
    return `${this.id} ${this.name} | Status: ${this.#status}`;
  }

  /**
   *
   * @param {LogEvent} event
   */
  #addLog(event) {
    this.#log.push({
      event,
      timestamp: Date.now(),
    });
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
