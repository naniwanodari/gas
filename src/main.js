function getSpreadSheet(url) {
  return SpreadsheetApp.openByUrl(url)
}

// function writeSheet(sheet, groups) {
//   sheet.getRange("A1").setValue(groups[0][0].name)
// }

function run() {
  const spreadSheet = getSpreadSheet(config.url)
  const members = new MemberRepository(spreadSheet, config.member).getActiveMembers()
  const groups = AsakaiGroup.create(members, config)
  const writeSheet = spreadSheet.getSheetByName("サンプルシート")
  for(let i = 0; i < groups.length; i++) {
    for(let j = 0; j < groups[i].length; j++) {
      const row = j + 1
      const column = i + 1
      writeSheet.getRange(row, column).setValue(groups[i][j].name)
    }
  }
  Logger.log(groups)
}