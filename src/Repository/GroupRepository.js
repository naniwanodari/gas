//グループを管理　現状出力のみ
class GroupRepository {
    constructor(sheet, config) {
        this.outputSheet = sheet.getSheetByName(config.outputSheetName)
        this.writeAreaBase = config.writeAreaBase
    }

    //出力シートに名前を出力(仮)
    output(groups) {
        this.cleanArea(this.writeAreaBase)
        for(let i = 0; i < groups.length; i++) {
            for(let j = 0; j < groups[i].length; j++) {
              const writeRow = j + this.writeAreaBase.start.row
              const writeColumn = i + this.writeAreaBase.start.column
              this.outputSheet.getRange(writeRow, writeColumn).setValue(groups[i][j].name)
            }
          }
    }

    //範囲を消去
    cleanArea(area) {
        this.outputSheet.getRange(area.start.row, area.start.column, area.range.row, area.range.column).clearContent()
    }
}