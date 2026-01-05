
// Color codes for different types of version notes:
// ! - Important (red)
// * - New Feature (green)
// - - Improvement (yellow)
// ? - Note (blue)
// # - Deprecated (gray)

export const versionHistory: Record<string, string[]> = {
  "v.1.0.3": [
    "*Added Item Editor with import/export functionality.",
    "?You will have to clear your database and reimport your data to see the changes.",
    "-Improved form controls for better usability.",
    "-Fixed several bugs related to data importing and UI components."
  ],
  "v.1.0.2": [
    "-Fixed Move PP not being imported correctly.",
    "?You may need to clear the database or reimport your data to see the changes.",
  ],
  "v.1.0.1": [
    "*Added database clearing to settings.",
    "-Fixed abilities not properly updating.",
    "-Fixed base stats being flipped around.",
    "?You may need to clear the database or reimport your data to see the changes.",
  ],
};

export const getCurrentVersion = (): string => {
  return Object.keys(versionHistory)[0];
}
