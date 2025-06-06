// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
// Adiciona suporte a arquivos .cjs para que o Metro possa resolvê-los
defaultConfig.resolver.sourceExts.push("cjs");
// Desabilita a resolução de exports via "package.json" para backward compatibility
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
