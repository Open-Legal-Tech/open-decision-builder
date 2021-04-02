/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  env: {
    API_URL: "http://localhost:8010/proxy"
  },
  mount: { public: { url: "/", static: true }, src: { url: "/dist" } },
  plugins: [
    "@snowpack/plugin-react-refresh",
    // "@snowpack/plugin-typescript",
    ["@canarise/snowpack-eslint-plugin", {globs: ['src/**/*.tsx', 'src/**/*.ts']}],
    "@snowpack/plugin-postcss",
  ],
  routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
  optimize: {
    // bundle: true,
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
