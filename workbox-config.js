module.exports = {
  globDirectory: "public/",//defines where to get files from
  globPatterns: ["**/*.{css,ico,html,png,js,json,woff2}"],//defines what type of files to cache
  swDest: "./public/sw.js",//service worker destination
  skipWaiting: true,//skipping default sw lifecycle
  clientsClaim: true,
  templatedUrls: {
    "/hoodie/client.js": ".hoodie/client.js"
  }
};