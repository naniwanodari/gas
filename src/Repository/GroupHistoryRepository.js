//グループ履歴の取得を担当
class GroupHistoryRepository {
    constructor(sheet, config) {
        this.sheet = sheet.getSheetByName(config.sheetName)
        this.historyNum = config.historyNum
        this.readAreaBase = config.readAreaBase
        this.asakaiNumCell = config.asakaiNumCell
        this.asakaiNum = parseInt(this.sheet.getRange(this.asakaiNumCell).getValue())
        return this
    }

    //グループ履歴を取得
    get() {
        const histories = [];
        for(let i = 0; i < this.historyNum; i++) {
            const targetArea = this.calcHistoryArea(i)
            const history = this.getHistory(targetArea)
            histories.push(history)
        }
        const finallyHistories = this.removeEmptyArray(histories)
        return finallyHistories
    }

    //履歴の範囲を取得
    calcHistoryArea(historyNum) {
        const areaBase = this.readAreaBase
        //初回はそのまま
        if (historyNum === 0) {
            return areaBase
        }
        const area = {
            start: {
                row: areaBase.start.row + (areaBase.range.row * historyNum),
                column: areaBase.start.column
            },
            range: areaBase.range
        }
        return area
    }

    //履歴を保存
    save(groups) {
        const area = this.selectSaveArea(this.asakaiNum)
        this.cleanArea(area)
        for(let i = 0; i < groups.length; i++) {
            const writeRow = area.start.row + i
            this.writeGroupHistory(groups[i], writeRow, area.start.column)
        }
        this.addAsakaiNum()
    }

    //朝会回数を加算
    addAsakaiNum() {
        this.sheet.getRange(this.asakaiNumCell).setValue(++this.asakaiNum)
    }

    //指定範囲の内容を削除
    cleanArea(area) {
        this.sheet.getRange(area.start.row, area.start.column, area.range.row, area.range.column).clearContent()
    }

    //履歴を記載
    writeGroupHistory(group, row, startColumn) {
        for(let i = 0; i < group.length; i++) {
            const column = startColumn + i
            this.sheet.getRange(row, column).setValue(group[i].id)
        }
    }

    //保存エリアの指定
    selectSaveArea(asakaiNum) {
        const historyNum = asakaiNum % this.historyNum
        return this.calcHistoryArea(historyNum)
    }

    //一つの履歴を取得
    getHistory(area) {
         let preHistory = this.sheet.getRange(area.start.row, area.start.column, area.range.row, area.range.column).getValues()
         preHistory = preHistory.map(group => this.organize(group))
         const history = this.removeEmptyArray(preHistory)
         return history
    }

    //要素の整形
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

    //空白の配列を削除
    removeEmptyArray(array) {
        return array.filter(function(targetArray) {
            return targetArray.length !== 0
        })
    }
}