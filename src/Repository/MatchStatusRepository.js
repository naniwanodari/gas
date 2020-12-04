//マッチング履歴を取得を担当
class MatchStatusRepository {
    constructor(sheet, config) {
        this.sheet = sheet.getSheetByName(config.sheetName)
        this.start = config.start
        this.end = config.end
    }

    get() {
        const elements = this.getElements()
        return new MatchStatus(elements)
    }

    getElements() {
        return this.sheet.getRange(this.start + ":" + this.end).getValues()
    }
}