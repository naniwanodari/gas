//マッチしたかどうかを管理する（マトリクス）
class MatchStatus {
    constructor(table) {
        this.table = table
    }

    //idの組み合わせが同じグループになったことがあるか？
    isUnmatch(x, y) {
        //同一人物は省く
        if (x === y) {
            return false
        }
        //座標は0スタートなのでズレを修正
        x = x - 1
        y = y - 1
        return this.table[x][y] === '' ? true : false
    }

}