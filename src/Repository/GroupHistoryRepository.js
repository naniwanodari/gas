//履歴の取得を担当
class GroupHistoryRepository {
    constructor(sheet, config) {
        this.sheet = sheet.getSheetByName(config.sheetName)
        this.readAreas = config.readAreas
        this.asakaiNumCell = config.asakaiNumCell
        this.asakaiNum = parseInt(this.sheet.getRange(this.asakaiNumCell).getValue())
        return this
    }

    //指定の履歴を取得
    get() {
        const readAreas = this.readAreas
        const histories = [];
        for(let i = 0; i < readAreas.length; i++) {
            const history = this.getHistory(readAreas[i].start, readAreas[i].end)
            histories.push(history)
        }
        return histories
    }

    save(groups) {
        const area = this.selectSaveArea(this.asakaiNum)
        this.cleanArea(area)
        for(let i = 0; i < groups.length; i++) {
            const writeRow = area.start.row + i
            this.writeGroupHistory(groups[i], writeRow, area.start.column)
        }
        this.addAsakaiNum()
    }

    addAsakaiNum() {
        this.sheet.getRange(this.asakaiNumCell).setValue(++this.asakaiNum)
    }

    cleanArea(area) {
        this.sheet.getRange(area.start.row, area.start.column, area.end.row, area.end.column).clearContent()
    }

    writeGroupHistory(group, row, startColumn) {
        for(let i = 0; i < group.length; i++) {
            const column = startColumn + i
            this.sheet.getRange(row, column).setValue(group[i].id)
        }
    }

    selectSaveArea(asakaiNum) {
        const index = asakaiNum % 2
        return this.readAreas[index]
    }

    //一つの履歴を取得
    getHistory(start, end) {
         let preHistory = this.sheet.getRange(start.row, start.column, end.row, end.column).getValues()
         const history = preHistory.map(group => this.organize(group))
         return history
    }

    organize(group) {
        let organized = this.removeEmpty(group)
        organized = this.toInt(organized)
        return organized
    }

    //数値へ変換
    toInt(array) {
        return array.map(item => parseInt(item))
    }

    //空白の要素を削除
    removeEmpty(array) {
        return array.filter(function(v) {
            return v != ""
        })
    }
}