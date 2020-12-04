//グループの評価を行う
class GroupScore {
    //評価実行
    static scoring(args) {
        const group = args.group
        const matchStatus = args.matchStatus
        const histories = args.history
        const laboScore = this.labo(group)
        const matchStatusScore = this.matchStatus(group, matchStatus)
        const historyScore = this.history(group, histories)
        return laboScore + matchStatusScore + historyScore
    }

    //含まれるラボの種類で加点
    static labo(group) {
        const labo = [];
        for(let i = 0; i < group.length; i++) {
            if (labo.includes(group[i].labo)){
                continue
            }
            labo.push(group[i].labo)
        }
        const score = labo.length
        return score
    }

    //同じグループになったことがない人がいれば加点
    static matchStatus(group, matchStatus) {
        let score = 0;
        for(let i = 0; i < group.length; i++) {
            for(let j = 0; j < group.length; j++) {
                if(matchStatus.isUnmatch(group[i].id, group[j].id)) {
                    score++
                }
            }
        }
        return score
    }

    //過去の履歴と被っている最大人数分減点
    static history(group, histories) {
        let duplicateNum = 0;
        for(let i = 0; i < histories.length; i++) {
            duplicateNum = duplicateNum + this.countDuplicateNum(group, histories[i])
        }
        const score = duplicateNum * -1
        return score
    }

    //履歴と被っている人数を数える
    static countDuplicateNum(group, history) {
        const memberIds = group.map(member => parseInt(member.id))
        let duplicateNum = 0;
        for(let i = 0; i < history.length; i++) {
            let tmpNum = 0;
            for(let j = 0; j < memberIds.length; j++) {
                Logger.log(`history${i}:${history[i]} includes ${memberIds[j]}:${history[i].includes(memberIds[j])}`)
                if(history[i].includes(memberIds[j])){
                    tmpNum++
                }
            }
            //最大値を返却
            if (duplicateNum < tmpNum) {
                duplicateNum = tmpNum
            }
        }
        return duplicateNum
    }
}