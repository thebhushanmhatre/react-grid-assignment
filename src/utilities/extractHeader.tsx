export function extractHeader(camelCaseText: string) {
  const columnHeader = camelCaseText
    .split(/(?=[A-Z])/) // ?= is a regex to look ahead, ie it matches when next character follows the condition that is upperCase
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return columnHeader;
}
