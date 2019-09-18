# Dependancy Injection


### Usage 
This DI needs a configuration as 
```
{
    factories: {
        Messenger: {
            ref: opts => new Messages(opts),
            params: { token: process.env.FB_TOKEN, verify_token: process.env.FB_VERIFY_TOKEN }
        },
        ...
        Brain: {
            ref: opts => new Brain(opts),
            inject: ['NLU', 'User', 'Messenger']
        },
        SubscribeController: {
            ref: () => subscribe
        }
    },
    const: {
        service_url: '',
        port: process.env.PORT || 3000
    }
}
```

