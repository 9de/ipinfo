const mc = require('minecraft-protocol');
const axios = require('axios');

class MinecraftIPLookup {
    constructor() {
        this.config = {
            server: {
                'online-mode': false,
                port: 25565,
                motd: '§4§o             Get Info About Your IP',
                version: '1.8.9'
            },
            api: {
                url: 'https://extreme-ip-lookup.com/json',
                key: 'Qn97RtiI2gwjStzJJjuG',
                callback: 'showIP'
            }
        };

        this.colorCodes = {
            ip: '§a',      // Green
            isp: '§4',     // Dark Red
            country: '§2', // Dark Green
            city: '§6',    // Gold
            ipType: '§8',  // Dark Gray
            timezone: '§f', // White
            error: '§c'    // Red
        };
    }

    start() {
        const server = mc.createServer(this.config.server);
        console.log(`Server started on port ${this.config.server.port}`);

        server.on('login', this.handleLogin.bind(this));
        server.on('error', this.handleServerError.bind(this));
    }

    async handleLogin(client) {
        try {
            const ip = this.cleanIPAddress(client.socket.remoteAddress);
            const ipInfo = await this.getIPInfo(ip);
            
            if (ipInfo) {
                const message = this.formatSuccessMessage(ipInfo);
                client.end(message);
            } else {
                throw new Error('Failed to parse IP information');
            }
        } catch (error) {
            this.handleClientError(client, error);
        }
    }

    cleanIPAddress(ip) {
        return ip.replace('::ffff:', '');
    }

    async getIPInfo(ip) {
        const { url, key, callback } = this.config.api;
        const response = await axios.get(`${url}/${ip}`, {
            params: {
                callback,
                key
            }
        });

        if (response.data.toString().startsWith(callback)) {
            const jsonStr = response.data
                .toString()
                .replace(`${callback}(`, '')
                .replace(');', '');
            return JSON.parse(jsonStr);
        }
        return null;
    }

    formatSuccessMessage(data) {
        const fields = [
            { label: 'Your IP', value: data.query, color: this.colorCodes.ip },
            { label: 'Your Isp', value: data.isp, color: this.colorCodes.isp },
            { label: 'Country', value: data.country, color: this.colorCodes.country },
            { label: 'City', value: data.city, color: this.colorCodes.city },
            { label: 'Iptype', value: data.ipType, color: this.colorCodes.ipType },
            { label: 'timezone', value: data.timezone, color: this.colorCodes.timezone }
        ];

        return fields
            .map(field => `${field.color}${field.label}: ${field.value}`)
            .join('\n');
    }

    formatErrorMessage(ip) {
        return [
            `${this.colorCodes.error}Sorry, there was an error getting IP info`,
            `Your IP is: ${ip}`
        ].join('\n');
    }

    handleClientError(client, error) {
        console.error('Client Error:', error);
        const ip = this.cleanIPAddress(client.socket.remoteAddress);
        client.end(this.formatErrorMessage(ip));
    }

    handleServerError(error) {
        console.error('Server Error:', error);
    }
}

// Start the server
try {
    const server = new MinecraftIPLookup();
    server.start();
} catch (error) {
    console.error('Fatal Error:', error);
    process.exit(1);
}
