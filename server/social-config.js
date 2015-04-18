ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '477519285757663',
    secret: 'ceb13bda191e10ebd0a7ef9c5bd6572f'
});

ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '662704096000-ihk0u2jj6sfatlj88o6c0altuqbkldka.apps.googleusercontent.com',
    secret: 'cupKmJ3hV9WEPD3T3cbtDpX1'
});

