//参加者の取得を担当
class MemberRepository {
    constructor(sheet, config){
        this.sheet = sheet.getSheetByName(config.sheetName)
        this.start = config.start
        this.end = config.end
        return this;
    }

    //朝会に参加する人を取得
    getActive() {
        const elements = this.getElements()
        const members = []
        for(let i = 0; i < elements.length; i++) {
            const member = new Member(elements[i])
            if (member.isActive()) {
                members.push(member)
            }
        }
        return members
    }

    //スプレッドシートから要素を取得
    getElements() {
        return this.sheet.getRange(this.start + ":" +this.end).getValues()
    }

}