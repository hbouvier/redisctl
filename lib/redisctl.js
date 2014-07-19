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
                    try {
                        JSON.parse(options.args[2]);
                        $this.set(options.args[1], options.args[2]);
                    } catch (e) {
                        console.log("Usage: set key JSON --> INVALID JSON [", e, "]: ", options.args[2]);
                    }
                } else
                    console.log("Usage: set key JSON");
                break;
            case "get":
                if (options.args.length === 2)
                    $this.get(options.args[1]);
                else
                    console.log("Usage: get key");
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
    }

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
