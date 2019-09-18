class DI {
    constructor(config) {
        this.factories = {}
        this.const = {}
        Object.keys(config.factories).map(key => {
            this.setFactory(key, config.factories[key])
        })
        Object.keys(config.const).map(key => {
            this.setConst(key, config.const[key])
        })
    }

    setFactory(name, config) {
        let Deps = {}
        if ('inject' in config) Deps = this._resolveInjection(name, config.inject)
        this.factories[name] = config.ref({ ...Deps, ...config.params })
    }

    setConst(name, value) {
        this.const[name] = value
    }

    get(name) {
        return this.const[name] || this.factories[name]
    }

    _resolveInjection(name, injection) {
        let dependencies = {}
        injection.map(name => dependencies[name] = this.get(name))
        return dependencies
    }
}

module.exports = DI