//朝会のグループを決定する
class AsakaiGroup {
    //グループを作成する
    static oldCreate(args, config) {
        const members = args.members
        const limit = 100;
        let groups = []
        for(let i = 0; i < limit; i++) {
            Logger.log(i)
            groups = this.grouping(members, config)
            if(this.validate(groups, config)){
                break
            }
        }
        for(let i = 0; i < groups.length; i++){
            groups[i].sort(this.compareById)
        }
        return groups
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
    //履歴と比較して条件をクリアしているかチェックする
    static validate(groups, config) {
        return GroupValidator.validate(groups, config);
    }

    //グループ分けする
    static grouping(members, config) {
        const prepareGroups = this.prepareGrouping(members, config)
        const groups = this.setMembersForGroups(prepareGroups, config)
        return groups
    }

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
    
    static prepareGrouping(members, config) {
        //ラボ毎に切り分け
        let prepareGroups = this.separate(members, config)
        //ラボに切り分けた小グループをシャッフル
        prepareGroups = prepareGroups.map(group => this.shuffle(group))
        //ひとつの配列に戻す
        prepareGroups = this.summarizePrepareGroups(prepareGroups)
        return prepareGroups
    }

    //ひとつの配列に戻す
    static summarizePrepareGroups(prepareGroups) {
        let summarize = []
        for(let i = 0; i < prepareGroups.length; i++) {
            for(let j = 0; j < prepareGroups[i].length; j++) {
                summarize.push(prepareGroups[i][j])
            }
        }
        return summarize
    }

    //条件に沿って小グループを作成
    static separate(members, config) {
        const separated = config.labo.map(labo => this.splitByLabo(members, labo))
        return separated
    }

    //ラボ毎にグループ分け
    static splitByLabo(members, laboName) {
        const splited = members.filter((member) => {
            return member.labo === laboName
        })
        return splited
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