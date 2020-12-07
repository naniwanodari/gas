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
        return this.table[coordinate.column][coordinate.row] === '' ? true : false
    }

    //xを値が小さいIDに統一([id1, id2]は[id2, id1]は等価のため)
    static selectCoordinate(id1, id2) {
        //座標は[0,0]スタートなのでズレを修正
        id1 = id1 - 1
        id2 = id2 - 1
        if (id1 > id2) {
            return {row: id2, column: id1}
        }
        return {row: id1, column: id2}
    }
}