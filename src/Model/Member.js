class Member {
    constructor(info) {
        this.id = info[0]
        this.labo = info[1]
        this.name = info[2]
        this.status = info[3]
        return this
    }

    isActive() {
        return this.status === 1
    }
}