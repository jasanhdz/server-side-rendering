const fs = require('fs');

const getManifest = () => {
  try {
    const manifest = JSON.parse(
      fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8')
    );
    return manifest;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getManifest;
