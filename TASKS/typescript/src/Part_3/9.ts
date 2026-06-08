interface StoreState {
  theme: string;
  volume: number;
  isMuted: boolean;
}

type EventMap = {
  [K in keyof StoreState as `${K}Changed`]: StoreState[K];
};
type Event = keyof EventMap;

// Event names should be auto-generated: "themeChanged", "volumeChanged", "isMutedChanged"
function subscribe<TEvent extends Event>(
  event: TEvent,
  callback: (val: EventMap[TEvent]) => void,
) {
  // Implementation is irrelevant — focus on typing the signature correctly
}

subscribe("themeChanged", (val) => console.log(val)); // Should work
subscribe("volumeChanged", (val) => {});
subscribe("isMutedChanged", (val) => {});

subscribe("passwordChanged", (val) => {}); // TS should throw an error!
