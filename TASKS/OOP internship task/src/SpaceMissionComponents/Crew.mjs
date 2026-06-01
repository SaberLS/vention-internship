/**
 *
 * @typedef {{name: string, role: string}} CrewMember
 */

class Crew {
  /** @type {CrewMember[]} */
  #members = [];
  maxSize;

  constructor(maxSize = 7) {
    this.maxSize = maxSize;
  }

  /**
   *
   * @param {CrewMember} newMember
   */
  addMember(newMember) {
    if (this.#members.length >= this.maxSize)
      throw new Error("Crew maxSize exceded");

    this.#members.push(newMember);
  }

  hasCommander() {
    for (const member of this.#members)
      if (member.role === "Commander") return true;

    return false;
  }

  isReady() {
    try {
      this.validate();
      return true;
    } catch (error) {
      return false;
    }
  }

  validate() {
    if (this.getSize() === 0) throw new Error("Not enough crew members!");
    if (!this.hasCommander()) throw new Error("No Commander assigned!");
  }

  getManifest() {
    const header = `=== Crew (${this.#members.length}/${this.maxSize}) ===`;

    if (this.#members.length === 0) return header;

    const formattedMembers = this.#members
      .map((member, index) => `${index + 1}. ${member.name} — ${member.role}`)
      .join("\n");

    return header + "\n" + formattedMembers;
  }

  toString() {
    return `MaxSize: ${this.maxSize} | Size: ${this.getSize()} | Ready: ${this.isReady() ? "Yes" : "No"}`;
  }

  getSize() {
    return this.#members.length;
  }
}

export { Crew };
