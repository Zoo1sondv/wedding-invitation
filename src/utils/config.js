export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const getAssetUrl = (assetPath) => {
  const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return `${BASE_URL}/${cleanPath}`;
};

const config = {
  BASE_URL,
  getAssetUrl
};

export default config;