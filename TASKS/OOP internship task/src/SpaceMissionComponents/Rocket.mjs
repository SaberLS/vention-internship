class Rocket {
  #fuelLevel = 100;
  name;
  payloadCapacityKg;
  reusable;

  /**
   *
   * @param {string} name
   * @param {number} payloadCapacityKg
   * @param {boolean} reusable
   */
  constructor(name, payloadCapacityKg, reusable) {
    this.name = name;
    this.payloadCapacityKg = payloadCapacityKg;
    this.reusable = reusable;
  }

  /**
   * @returns {void}
   */
  refuel() {
    this.#fuelLevel = 100;
  }

  /**
   *
   * @param {number} amount
   * @returns {void}
   */
  consumeFuel(amount) {
    if (amount < 0) throw new Error(`Rocket can't consume ${amount} of fuel`);
    this.#fuelLevel -= amount;

    if (this.#fuelLevel < 0)
      throw new Error(`Fuel below critical level ${this.#fuelLevel}`);
  }

  /**
   *
   * @returns {boolean}
   */
  isReadyToLaunch() {
    return this.#fuelLevel >= 80;
  }

  /**
   *
   * @returns {string}
   */
  toString() {
    return `🚀 ${this.name} | Capacity: ${this.payloadCapacityKg}kg | Reusable: ${this.reusable ? "Yes" : "No"} | Fuel: ${this.#fuelLevel}%`;
  }
}

export { Rocket };
