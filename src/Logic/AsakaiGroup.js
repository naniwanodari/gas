//朝会のグループを決定する
class AsakaiGroup {
    //グループを作成する
    static create(args, config) {
        const members = args.members
        const trialNum = config.trialNum;
        let randomGroups = [];
        for(let i = 0; i < trialNum; i++) {
            const groups = this.createRandomGroups(members, config)
            randomGroups.push(groups)
        }
        let bestScore = 0;
        let winnerGroups = [];
        for(let i = 0; i < randomGroups.length; i++){
            const groupsScore = this.score(randomGroups[i], args)
            if (bestScore <= groupsScore) {
                bestScore = groupsScore
                winnerGroups = randomGroups[i]
            }
        }
        const finallyGroups = winnerGroups.sort(this.compareById)
        return finallyGroups
    }

    //id順にソート
    static compareById(a, b) {
        a = parseInt(a.id)
        b = parseInt(b.id)
        let comparison = 0;
        if (a > b) {
            comparison = 1
        } else if (a < b) {
            comparison = -1
        }
        return comparison
    }

    //グループに点数をつける
    static score(groups, args) {
        let score = 0
        for (let i = 0; i < groups.length; i++) {
            args.group = groups[i]
            score = score + GroupScore.scoring(args)
        }
        return score
    }

    //グループ分けする
    static createRandomGroups(members, config) {
        const prepareGroups = this.prepareGrouping(members)
        const groups = this.setMembersForGroups(prepareGroups, config)
        return groups
    }

    //グループに参加者をセット
    static setMembersForGroups(prepareGroups, config) {
        const groupNum = config.groupNum
        const groups = this.makeEmptyArray(config.groupNum)
        let groupIndex = 0
        for(let i = 0; i < prepareGroups.length; i++) {
            if (this.isMultiple(groupNum, groupIndex)) {
                groupIndex = 0;
            }
            groups[groupIndex].push(prepareGroups[i])
            groupIndex++
        }
        return groups;
    }

    //指定の数の倍数かどうか判定
    static isMultiple(num, targetNum) {
        return targetNum % num === 0 ? true : false
    }

    //指定の数、空の配列を作成
    static makeEmptyArray(num) {
        let array = []
        for(let i = 0; i < num; i++) {
            array.push([])
        }
        return array
    }
    
    //グループ分けの準備
    static prepareGrouping(members) {
        //参加者をシャッフル
        const prepareGroups = members.map(member => this.shuffle(member))
        return prepareGroups
    }

    //配列要素をシャッフル
    static shuffle(array) {
        //Fisher-Yatesアルゴリズム
        for(let i = array.length - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * (i + 1));
            [array[i], array[random]] = [array[random], array[i]];
        }
        return array
    }
}