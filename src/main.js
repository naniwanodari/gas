function run() {
  //スプレッドシートの取得
  const spreadSheet = SpreadsheetApp.openByUrl(config.url)
  //スプレッドシートとの接続
  const membersRepo = new MemberRepository(spreadSheet, config.member)
  const matchStatusRepo = new MatchStatusRepository(spreadSheet, config.matchStatus)
  const groupHistoryRepo = new GroupHistoryRepository(spreadSheet, config.history)
  const groupRepo = new GroupRepository(spreadSheet, config.group)

  //判定に必要な情報の取得
  const args = {
    members: membersRepo.getActive(),
    matchStatus: matchStatusRepo.get(),
    history: groupHistoryRepo.get(),
  }
  //グループ作成の実行
  const groups = AsakaiGroup.create(args, config)
  //記録
  matchStatusRepo.save(groups)
  groupHistoryRepo.save(groups)

  //出力
  groupRepo.output(groups)
  
  Logger.log(groups)
}