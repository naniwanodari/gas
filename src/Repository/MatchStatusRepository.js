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
        return this.sheet.getRange(this.start.x, this.start.y, this.end.x, this.start.y).getValues()
    }

    save(groups) {
        for(let i = 0; i < groups.length; i++) {
            this.writeMatchResult(groups[i])
        }
    }

    writeMatchResult(group) {
        for(let i = 0; i < group.length; i++) {
            for(let j = 0; j < group.length; j++) {
                const coordinate = MatchStatus.selectCoordinate(group[i].id, group[j].id)
                this.sheet.getRange(this.start.x + coordinate.x, this.start.y + coordinate.y).setValue('o')
            }
        }
    }
}