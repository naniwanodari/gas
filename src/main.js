function getSpreadSheet(url) {
  return SpreadsheetApp.openByUrl(url)
}

// function writeSheet(sheet, groups) {
//   sheet.getRange("A1").setValue(groups[0][0].name)
// }

function run() {
  //スプレッドシートの取得
  const spreadSheet = getSpreadSheet(config.url)
  //スプレッドシートとの接続
  const membersRepo = new MemberRepository(spreadSheet, config.member)
  const matchStatusRepo = new MatchStatusRepository(spreadSheet, config.matchStatus)
  const groupHistoryRepo = new GroupHistoryRepository(spreadSheet, config.history)
  //判定に必要な情報の取得
  const args = {
    members: membersRepo.getActive(),
    matchStatus: matchStatusRepo.get(),
    history: groupHistoryRepo.get(),
  }
  args.group = [args.members[0], args.members[1], args.members[2], args.members[3], args.members[4]],
  Logger.log("--scoretest")
  Logger.log(GroupScore.scoring(args))
  Logger.log("--scoretest")
  //グループ作成の実行
  const groups = AsakaiGroup.create(args, config)
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