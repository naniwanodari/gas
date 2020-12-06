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
      //保存、採点に利用する履歴の回数
      historyNum: 2,
      //履歴読み取り時の計算の基準になる値
      readAreaBase: {start:{column:3, row: 3}, range: {column: 10, row: 10}}
    },
    matchStatus: {
      sheetName: "対面状況",
      start: {x: 2, y: 2},
      end: {x: 31, y: 31}
    },
    group: {
      outputSheetName: "出力テスト",
      writeAreaBase: {start: {row: 2, column: 1}, range: {column: 10, row: 10}}
    }
}