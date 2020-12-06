//マッチしたかどうかを管理する（マトリクス）
class MatchStatus {
    constructor(table) {
        this.table = table
    }

    //idの組み合わせが同じグループになったことがあるか？
    isUnmatch(id1, id2) {
        //同一人物は省く
        if (id1 === id2) {
            return false
        }
        const coordinate = MatchStatus.selectCoordinate(id1, id2)
        return this.table[coordinate.x][coordinate.y] === '' ? true : false
    }

    //xを値が小さいIDに統一([id1, id2]は[id2, id1]は等価のため)
    static selectCoordinate(id1, id2) {
        //座標は[0,0]スタートなのでズレを修正
        id1 = id1 - 1
        id2 = id2 - 1
        if (id1 > id2) {
            return {x: id2, y: id1}
        }
        return {x: id1, y: id2}
    }
}