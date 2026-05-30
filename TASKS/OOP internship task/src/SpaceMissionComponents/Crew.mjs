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
    if (this.#members.length >= this.maxSize) throw new Error("Crew is full");

    this.#members.push(newMember);
  }

  hasCommander() {
    for (const member of this.#members)
      if (member.role === "Commander") return true;

    return false;
  }

  isReady() {
    return this.hasCommander();
  }

  getManifest() {
    const header = `=== Crew (${this.#members.length}/${this.maxSize}) ===`;

    if (this.#members.length === 0) return header;

    const formattedMembers = this.#members
      .map((member, index) => `${index + 1}. ${member.name} — ${member.role}`)
      .join("\n");

    return header + "\n" + formattedMembers;
  }

  getSize() {
    return this.#members.length;
  }
}

export { Crew };
