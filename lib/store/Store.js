/**
 * Created by peng.xue on 2017/8/2.
 */
const Redis = require("ioredis");
const Store = require("koa-session2/libs/store");
var NODE_ENV = process.env.NODE_ENV || "product";//默认开发目录
// console.log("session:"+NODE_ENV);
const config = require("../config/Config")[NODE_ENV];

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            host: config.redisUrl,
            port: config.redisPort,
            password: config.redisPass,
        });
    }

    get(sid) {
        return this.redis.get(`SESSION:${sid}`).then(data => JSON.parse(data));
    }

    set(session, opts) {
        if(!opts.sid) {
            opts.sid = this.getID(24);
        }

        return this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session)).then(() => {
            return opts.sid
        });
    }

    destroy(sid) {
        return this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;