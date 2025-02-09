// test_extension.js
// Example using Jest for unit testing

describe("Chrome Extension Tests", () => {
  test("Manifest has correct properties", () => {
    const manifest = require("../chrome-extension/manifest.json");
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.name).toBe("LinkedIn Sanity Filter");
  });
});
