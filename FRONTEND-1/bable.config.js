export default {
  presets: [
    '@babel/preset-env',  // For transforming modern JavaScript (ES6+)
    '@babel/preset-react' // For transforming JSX syntax
  ],
  plugins: [
    '@babel/plugin-transform-runtime'  // Optional, for supporting async/await and other features
  ]
};
