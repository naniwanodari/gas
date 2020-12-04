//履歴の取得を担当
class GroupHistoryRepository {
    constructor(sheet, config) {
        this.sheet = sheet.getSheetByName(config.sheetName)
        this.mapping = config.mapping
        return this
    }

    //指定の履歴を取得
    get() {
        const mapping = this.mapping
        Logger.log(mapping)
        const histories = [];
        for(let i = 0; i < mapping.length; i++) {
            const history = this.getHistory(mapping[i].start, mapping[i].end)
            histories.push(history)
        }
        return histories
    }

    //一つの履歴を取得
    getHistory(start, end) {
         let preHistory = this.sheet.getRange(start + ":" + end).getValues()
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