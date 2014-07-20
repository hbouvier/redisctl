module.exports = function () {

    function RedisCtl(config) {
        var $this = this;
        this.config  = config;
        this.meta    = config.meta;
        this.version = config.version;
        this.logger  = config.logger;
    }

    RedisCtl.prototype.exec = function (options) {
        var $this = this,
            args  = options.args;

        switch (options.args[0]) {
            case "version":
                $this.version();
                break;
            case "set":
                if (options.args.length === 3) {
                    $this.set(options.args[1], options.args[2]);
                } else
                    console.log("Usage: set key value");
                break;
            case "get":
                if (options.args.length === 2)
                    $this.get(options.args[1]);
                else
                    console.log("Usage: get key");
                break;
            case "keys":
                if (options.args.length === 2)
                    $this.keys(options.args[1]);
                else
                    console.log("Usage: keys pattern");
                break;
            case "mget":
                if (options.args.length >= 2)
                    $this.mget(options.args.splice(1));
                else
                    console.log("Usage: mget keys");
                break;
            case "mgetkeys":
                if (options.args.length === 2)
                    $this.mgetkeys(options.args[1]);
                else
                    console.log("Usage: mgetkeys pattern");
                break;
            case "del":
                if (options.args.length === 2)
                    $this.del(options.args[1]);
                else
                    console.log("Usage: del key");
                break;
            default:
                console.log("Unknow command ", options.args[0]);
                break;
        }
    };

    RedisCtl.prototype.version = function () {
        console.log('Version ', $this.version);
    };

    RedisCtl.prototype.get = function (key) {
        var $this = this;

        var redis = require('redisd').create($this.config);
        redis.connect(function () {
            redis.get(key, function (err, value) {
                console.log(err ?"FAIL": value);
                redis.close();
            });
        });
    };
    RedisCtl.prototype.keys = function (pattern) {
        var $this = this;

        var redis = require('redisd').create($this.config);
        redis.connect(function () {
            redis.keys(pattern, function (err, values) {
                console.log(err ?"FAIL": JSON.stringify(values));
                redis.close();
            });
        });
    };
    RedisCtl.prototype.mget = function (keys) {
        var $this = this;
        var redis = require('redisd').create($this.config);
        redis.connect(function () {
            redis.mget(keys, function (err, values) {
                console.log(err ?"FAIL": values);
                redis.close();
            });
        });
    };
    RedisCtl.prototype.mgetkeys = function (pattern) {
        var $this = this;

        var redis = require('redisd').create($this.config);
        redis.connect(function () {
            redis.mgetkeys(pattern, function (err, values) {
                console.log(err ?"FAIL": JSON.stringify(values));
                redis.close();
            });
        });
    };
    RedisCtl.prototype.set = function (key, value) {
        var $this = this;

        var redis = require('redisd').create($this.config);
        redis.connect(function () {
            redis.set(key, value, function (err, value) {
                console.log(err ?"FAIL":"OK");
                redis.close();
            });
        });
    };
    RedisCtl.prototype.del = function (key) {
        var $this = this;

        var redis = require('redisd').create($this.config);
        redis.connect(function () {
            redis.del(key, function (err, value) {
                console.log(err ?"FAIL":"OK");
                redis.close();
            });
        });
    };

    function create(config) {
        return new RedisCtl(config);
    }

    return {
        create : create
    };
}();
