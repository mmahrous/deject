class DIContainer {
    constructor(fnArgs, config) {
        this.factories = {}
        this.dependencies = {}
        this.fnArgs = fnArgs
        if (config) {
            if ('factory' in config) {
                // register factory from config
                Object.keys(config.factories).map(key => {
                    this.factory(key, config.factories[key])
                })
            }
            if ('register' in config) {
                // register from config
                Object.keys(config.register).map(key => {
                    this.register(key, config.register[key])
                })
            }
        }
    }
    /*
        Register a new factory
    */
    factory(name, factory) {
        let Deps = {}
        if ('inject' in config) Deps = this._resolveInjection(name, config.inject)
        this.factories[name] = config.ref({ ...Deps, ...config.params })
        this.factories[name] = factory
    }
    /*
        Register a new dependancy
    */
    register(name, dep) {
        this.dependencies[name] = dep
    }

    get(name) {
        // check if dependency is not resolved and still in factory
        if (!name in dependencies && name in this.factories) {
            const factory = this.factories[name]
            // inject depenceny and resolve factory
            this.dependencies[name] = factory && this._inject(factory)
        }
        // if 
        if (!name in dependencies) {
            throw new Error(`Can't find ${name} dependaency.`)
        }
        return this.dependencies[name]
    }

    _inject(factory) {
        let args = this.fnArgs(factory).map( name => this.get[name])
        return factory.apply(null, args)
    }
}

module.exports = (fnArgs, config) => new DIContainer(fnArgs, config)