class DIContainer {
    constructor(fnArgs, config) {
        this.factories = {}
        this.dependencies = {}
        this.fnArgs = fnArgs
        if (config) {
            if ('register' in config) {
                // register from config
                Object.keys(config.register).map(key => {
                    this.register(key, config.register[key])
                })
            }
            if ('factory' in config) {
                // register factory from config
                Object.keys(config.factory).map(key => {
                    this.factory(key, config.factory[key])
                })
            }
        }
    }
    /*
        Register a new factory
    */
    factory(name, factory) {
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
        if (!this.dependencies[name]) {
            const factory = this.factories[name]
            if (!factory) {
                throw new Error(`Can't find ${name} dependaency.`)
            }
            // inject depenceny and resolve factory
            this.dependencies[name] = factory && this._inject(factory)
        }
        return this.dependencies[name]
    }

    _inject(factory) {
        let args = this.fnArgs(factory).map(name => this.get(name))
        return factory.apply(null, args)
    }

}

module.exports = (fnArgs, config) => new DIContainer(fnArgs, config)