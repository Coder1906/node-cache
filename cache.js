/**
 * Created by Zn on 2017/6/28.
 * Email: 312073339@qq.com
 * 缓存类，全局唯一
 */
function cache (option) {
	option = option || {}
    this.data = {}
    this.size = 0
    this.maxSize = option.size || 100
    this.defaultTime = option.time || 0
    this.defaultTime *= 1000
}
cache.prototype.set = function (key, val, ttl) {
    if (this.size >= this.maxSize){
        return false
    }
    this.data[key] = this._wrap(val, ttl)
    this.size++
    return true
}
cache.prototype.get = function (key) {
    if (!this.data[key]) {
        return false
    }
    let val = this._unwrap(this.data[key])
    if (val === false) {
        delete this.data[key]
        this.size--
    }
    return val
}
cache.prototype._wrap = function (val, ttl) {
    return {
        data: val,
        expires: ttl? Date.now() + ttl*1000: this.defaultTime
    }
}
cache.prototype._unwrap = function (data) {
    return (data.expires === 0 || data.expires >= Date.now())? data.data: false
}
module.exports = cache;