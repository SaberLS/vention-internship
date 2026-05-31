type DeepReadonly<T> = T extends object
  ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
  : T;

interface AppConfig {
  version: string;
  settings: {
    theme: string;
    features: {
      beta: boolean;
    };
  };
}

const config: Readonly<AppConfig> = {
  version: "1.0",
  settings: {
    theme: "light",
    features: { beta: true },
  },
};

config.version = "2.0"; // TS Error — correct!
config.settings.theme = "dark"; // TS allows this — but we need to forbid it!
config.settings.features.beta = false; // Error — two levels deep, was previously allowed!

const readonllyConfig: DeepReadonly<AppConfig> = {
  version: "1.0",
  settings: {
    theme: "light",
    features: { beta: true },
  },
};

readonllyConfig.version = "2.0"; // TS Error — correct!
readonllyConfig.settings.theme = "dark"; // TS allows this — but we need to forbid it!
readonllyConfig.settings.features.beta = false; // Error — two levels deep, was previously allowed!
