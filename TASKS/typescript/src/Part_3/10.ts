type Awaited_<T> = T extends Promise<infer Payload> ? Awaited_<Payload> : T;

function fetchUserProfile() {
  return Promise.resolve({ id: 1, avatarUrl: "https://..." });
}

// We need to extract { id: number; avatarUrl: string } without duplicating it manually.

type ProfileData = Awaited_<ReturnType<typeof fetchUserProfile>>;
// Hover over ProfileData — it should show { id: number; avatarUrl: string }, not Promise<...>

// This should compile without errors:
const profile: ProfileData = {
  id: 1,
  avatarUrl: "https://example.com/avatar.png",
};

// Bonus — these type aliases should all resolve to the primitive, not a Promise:
type T1 = Awaited_<Promise<string>>; // string
type T2 = Awaited_<Promise<Promise<number>>>; // number
type T3 = Awaited_<boolean>; // boolean (non-Promise passthrough)
