# 🚀 JS OOP Task: Space Mission Manager

## Overview

Build a mini space mission system inspired by real SpaceX/NASA launches. You'll
model a rocket, a crew, and a mission — then simulate a launch.

---

## Step 1 — `Rocket`

- Constructor: `name`, `payloadCapacityKg`, `reusable`
- Private `#fuelLevel` (starts at `100`)
- `refuel()` — resets fuel to 100
- `consumeFuel(amount)` — reduces fuel, throws if it goes below 0
- `isReadyToLaunch()` — returns `true` if `fuelLevel >= 80`
- `toString()` — readable summary

```js
const falcon9 = new Rocket('Falcon 9', 22800, true)

falcon9.consumeFuel(30)
console.log(falcon9.isReadyToLaunch()) // false

falcon9.refuel()
console.log(falcon9.isReadyToLaunch()) // true
console.log(falcon9.toString())
// "🚀 Falcon 9 | Capacity: 22800kg | Reusable: Yes | Fuel: 100%"
```

---

## Step 2 — `Crew`

- Constructor: `maxSize` (default `7`)
- Private `#members` array
- `addMember({ name, role })` — adds a crew member, throws if full
- `hasCommander()` — returns `true` if any member has role `'Commander'`
- `isReady()` — `true` if at least 1 member AND has a Commander
- `getManifest()` — returns a formatted list of crew members

```js
const crew = new Crew(4)
crew.addMember({ name: 'Eileen Collins', role: 'Commander' })
crew.addMember({ name: 'Jim Voss', role: 'Flight Engineer' })

console.log(crew.isReady()) // true
console.log(crew.getManifest())
// "=== Crew (2/4) ===
//  1. Eileen Collins — Commander
//  2. Jim Voss — Flight Engineer"
```

---

## Step 3 — `Mission` + `CrewedMission`

Create a base `Mission` class, then extend it with `CrewedMission`.

### `Mission`

- Constructor: `name`, `rocket` (Rocket instance), `payloadKg`
- Private `#status`: `'planned'` → `'success'` | `'failed'`
- Static `generateId()` → `'MSN-001'`, `'MSN-002'` …
- `validate()` — throws if rocket isn't ready OR payload exceeds capacity
- `launch()` — calls `validate()`, consumes 80 fuel, simulates result (70%
  success via `Math.random()`), updates status, returns result string
- `toString()` — includes id, name, status

### `CrewedMission extends Mission`

- Constructor also accepts `crew` (Crew instance)
- Override `validate()` — call `super.validate()`, then also check
  `crew.isReady()`
- Override `toString()` — include crew size

```js
const rocket = new Rocket('Crew Dragon', 6000, true)
const crew = new Crew(4)
crew.addMember({ name: 'Eileen Collins', role: 'Commander' })

const mission = new CrewedMission('Crew-8', rocket, 5000, crew)

console.log(mission.toString())
// "🧑‍🚀 MSN-001 'Crew-8' | Status: planned | Crew: 1"

console.log(mission.launch())
// "✅ MSN-001 'Crew-8' launched successfully!" or
// "💥 MSN-001 'Crew-8' failed on launch."

// No commander — should throw:
const badCrew = new Crew()
badCrew.addMember({ name: 'Bob', role: 'Pilot' })
new CrewedMission('Bad Trip', rocket, 100, badCrew).launch()
// ❌ Error: "Crew is not ready: no Commander assigned"
```

---

## Bonus 🌟

Add a `#log` array to `Mission`. Every state change appends
`{ event, timestamp }`. Add `getLog()` that prints a readable timeline:

```
[2024-03-14 09:22:01] planned
[2024-03-14 09:22:05] launched → success
```

---

## Checklist

- [x] Private fields (`#`) used for `fuelLevel`, `members`, `status`
- [x] `CrewedMission` calls `super.validate()` before its own checks
- [x] `toString()` overridden in all classes
- [ ] `successRate` handles 0 launched missions (no `NaN`)
- [ ] All errors have clear, descriptive messages

---

## Real missions to use as data 🛰️

| Mission            | Rocket      | Payload  |
| ------------------ | ----------- | -------- |
| Crew Dragon Demo-2 | Falcon 9    | 5000 kg  |
| Polaris Dawn       | Falcon 9    | 5000 kg  |
| Artemis I          | SLS Block 1 | 27000 kg |
