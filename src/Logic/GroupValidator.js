class GroupValidator {
    static validate(groups, config){
        const history = config.history
        let result = true
        for(let i = 0; i < groups.length; i++) {
            for(let j = 0; j < history.length; j++){
                if(this.isDuplicateMember(groups[i], history[j])) {
                    result = false
                    break
                }
            }
        }
        return result
    }

    //過去二回と比較してメンバーが被っていないか
    static isDuplicateMember(group, history) {
        const AllowableDuplicateNum = 3
        const memberIds = group.map(member => parseInt(member.id))

        let duplicateNum = 0;
        for(let i = 0; i < history.length; i++) {
            duplicateNum = 0
            for(let j = 0; j < memberIds.length; j++) {
                if(history[i].includes(memberIds[j])){
                    duplicateNum++
                }
                if (duplicateNum >= AllowableDuplicateNum) {
                    return true
                }
            }
        }
        return false
    }

}