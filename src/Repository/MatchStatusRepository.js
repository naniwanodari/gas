//マッチング履歴を取得を担当
class MatchStatusRepository {
    constructor(sheet, config) {
        this.sheet = sheet.getSheetByName(config.sheetName)
        this.areaBase = config.areaBase
    }

    //マッチング履歴を取得
    get() {
        const elements = this.getElements()
        return new MatchStatus(elements)
    }

    //スプレッドシートから要素を取得
    getElements() {
        return this.sheet.getRange(this.areaBase.start.row, this.areaBase.start.column, this.areaBase.range.row, this.areaBase.range.column).getValues()
    }

    //マッチング履歴を保存
    save(groups) {
        for(let i = 0; i < groups.length; i++) {
            this.writeMatchResult(groups[i])
        }
    }

    //スプレッドシートマッチング履歴を出力
    writeMatchResult(group) {
        for(let i = 0; i < group.length; i++) {
            for(let j = 0; j < group.length; j++) {
                const coordinate = MatchStatus.selectCoordinate(group[i].id, group[j].id)
                this.sheet.getRange(this.areaBase.start.row + coordinate.row, this.areaBase.start.column + coordinate.column).setValue('o')
            }
        }
    }
}