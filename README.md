[![Build Status](https://travis-ci.org/hbouvier/redisctl.png)](https://travis-ci.org/hbouvier/redisctl)
[![dependency Status](https://david-dm.org/hbouvier/redisctl/status.png?theme=shields.io)](https://david-dm.org/hbouvier/redisctl#info=dependencies)
[![devDependency Status](https://david-dm.org/hbouvier/redisctl/dev-status.png?theme=shields.io)](https://david-dm.org/hbouvier/redisctl#info=devDependencies)
[![NPM version](https://badge.fury.io/js/redisctl.png)](http://badge.fury.io/js/redisctl)

redisctl
===

A redis client to manipulate key on multiple server

## Installation

	brew install redis
	sudo npm install -g redisctl

## REDIS CONFIGURATION

	REDIS_URLS  (default: 127.0.0.1:6379)

## Usage

### Version

    redisctl version

### set

    redisctl set msg '{"message":"this is a message"}'

### get

    redisctl get msg

### del

    redisctl del msg