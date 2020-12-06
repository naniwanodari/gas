const config = {
    url: "https://docs.google.com/spreadsheets/d/1_M8WCVytlHVZwFGBvsyUD0N3WtNJ6NEtUdXcP0z5bww/edit?usp=sharing",
    trialNum: 10,
    groupNum: 5,
    member: {
      sheetName: "メンバー",
      start: "A2",
      end: "D26",
      active: 1
    },
    history: {
      sheetName: "グループ履歴",
      asakaiNumCell: "B1",
      historyNum: 2,
      readAreaRange: {column: 10, row: 10},
      readAreas: [
        {start: {column: 3, row: 3}, end: {column: 7, row: 10}},
        {start: {column: 3, row: 11}, end: {column: 7, row: 15}}
      ]
    },
    matchStatus: {
      sheetName: "対面状況",
      start: {x: 2, y: 2},
      end: {x: 31, y: 31}
    }
}