

export enum Sheets {
  JOIN,
  CONTACT,
  EVENTS
}

export function convertToString(s: Sheets) {
  switch (s) {
    case Sheets.JOIN:
      return "Jelentkezesek"
    case Sheets.CONTACT:
      return "Kapcsolat"
    case Sheets.EVENTS:
      return "Esemenyek"
  }
}