## WISP-WRAPPER

## About

wisp-wrapper is a package that helps you interact with the [WISP](https://wisp.gg/) API by abstracting the communication process. This library is still in development, so we will keep updating it.
  
## Usage

Here is an example usage of this package.
```sh
// Requiring the package
const wispwrapper = require("wisp-wrapper");

// Creating a new panel
const panel = new wispwrapper.Panel();

// Trigerred when connection is established
panel.on("ready", () => {
    // All your servers
    const servers = panel.servers;

    servers.forEach((server) => {
        const serverName = server.name;
        const serverUUID = server.uuid;
        const serverUUIDShort = server.uuid_short;

        console.log(`${serverName}'s UUID is ${serverUUID} (Short UUID: ${serverUUIDShort})`);
    });
});

// Replace the "DOMAIN-NAME" with the domain name of the game panel your using
// Replace the "API-TOKEN" with the API TOKEN that you can get from your game panel
panel.connect("DOMAIN-NAME", "API-TOKEN")
```

## Contributing

If you encounter any issue, confusion or a lacking feature, feel free to contribute to our package!

## Support

If you need help understanding something about the package, join our [Discord server](https://discord.gg/6HY4Y8WQF4) to get some support! We will be glad to help you!
