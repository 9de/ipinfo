# Minecraft IP Checker

A Minecraft server that provides detailed IP information to connecting players. When players connect to the server, they receive information about their IP address, including geographical location, ISP details, and timezone.

![Demo](https://img.shields.io/badge/Minecraft-1.8.9-brightgreen)
![License](https://img.shields.io/github/license/9de/minecraft-ip-checker)
![Version](https://img.shields.io/github/v/release/9de/minecraft-ip-checker)

## Features

- Shows player's IP address
- Displays ISP information
- Shows geographical location (country and city)
- Provides IP type information
- Shows timezone
- Supports Minecraft version 1.8.9
- Color-coded responses for better readability

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/9de/minecraft-ip-checker.git
cd minecraft-ip-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

1. Start the Minecraft server using the command above
2. Connect to the server using Minecraft client version 1.8.9
3. Server Address: `localhost:25565` (for local testing)
4. Upon connection, you will receive your IP information

## Configuration

The server configuration can be modified in `src/server.js`:

- Server Port: 25565 (default)
- Minecraft Version: 1.8.9
- API Key: Configure your IP lookup API key

## API

This project uses the Extreme-IP-Lookup API for IP information. The free tier includes:

- Location data
- ISP information
- Timezone details
- IP type classification

## Development

The project structure is organized as follows:
```
minecraft-ip-checker/
├── src/
│   └── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Error Handling

The server includes robust error handling for:
- Failed API requests
- Invalid IP addresses
- Connection issues
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol) for the Minecraft server implementation
- [Extreme-IP-Lookup](https://extreme-ip-lookup.com/) for providing IP information

## Support

For support, issues, or feature requests, please create an issue in the GitHub repository.

## Author

- **9de** - [GitHub Profile](https://github.com/9de)

## Disclaimer

This tool is for educational purposes only. Ensure you have permission to collect IP information before deploying the server in a production environment.
