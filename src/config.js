const config = {
    url: "https://docs.google.com/spreadsheets/d/1_M8WCVytlHVZwFGBvsyUD0N3WtNJ6NEtUdXcP0z5bww/edit?usp=sharing",
    trialNum: 100,
    groupNum: 5,
    member: {
      sheetName: "メンバー",
      start: "A2",
      end: "D26",
      active: 1
    },
    history: {
      sheetName: "グループ履歴",
      mapping: [
        {start: "C3", end: "G7"},
        {start: "C11", end: "G15"}
      ]
    },
    matchStatus: {
      sheetName: "対面状況",
      start: "B2",
      end: "AE31"
    },
    labo: [
      "TO",
      "SA",
      "KO",
      "SY",
      "KA",
      "MI"
    ]
}