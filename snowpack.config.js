/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: { public: { url: "/", static: true }, src: { url: "/dist" } },
  plugins: [
    "@snowpack/plugin-react-refresh",
    // "@snowpack/plugin-typescript",
    // "@canarise/snowpack-eslint-plugin",
    [
      "@snowpack/plugin-build-script",
      {
        cmd: "postcss",
        input: [".css"],
        output: [".css"],
      },
    ],
  ],
  routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
  devOptions: { open: "none", port: 3000, output: "stream" },
  alias: {
    internalTypes: "./src/types",
    components: "./src/components",
    features: "./src/features",
    utils: "./src/utils",
  },
};
