export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

export const getImageUrl = (imagePath) => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  return `${BASE_URL}/${cleanPath}`;
};

export const getAssetUrl = (assetPath) => {
  if (assetPath.startsWith('http')) return assetPath;
  
  const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  return `${BASE_URL}/${cleanPath}`;
};

const config = {
  BASE_URL,
  getImageUrl,
  getAssetUrl
};

export default config;