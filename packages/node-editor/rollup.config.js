import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react"],
  plugins: [
    external(),
    url(),
    svgr(),
    typescript({ typescript: require("typescript") }),
    postcss({
      modules: true,
      extract: true,
      sourceMap: true,
      minimize: true,
      plugins: [
        require("postcss-preset-env")({
          stage: 3,
          features: {
            "nesting-rules": true,
          },
        }),
      ],
    }),
    resolve(),
    commonjs(),
  ],
};