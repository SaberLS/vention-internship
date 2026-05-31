type Status = State["status"];

// This structure needs to be rewritten as a Discriminated Union
type State = StateLoading | StateError | StateSuccess;

interface StateSuccess {
  status: "success";
  data: string[];
}

interface StateError {
  status: "error";
  errorMessage: string;
}

interface StateLoading {
  status: "loading";
}

function renderUI(state: State) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Data: ${state.data.join(", ")}`;
    case "error":
      return `Error: ${state.errorMessage.toUpperCase()}`;

    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
