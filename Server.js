const mc = require('minecraft-protocol');
const axios = require('axios').default
const Mcserver = mc.createServer({
    "online-mode": false,
    port:25565,
    motd: "\u00a74\u00a7o             Get Info About Your IP",
    favicon: "data:image/png;base64,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",
    version:"1.8.9"
})

Mcserver.on('login', async (client) => {
    const ip = client.socket.remoteAddress.replace("::ffff:","");
    try {
    const iprequest = await axios.get(`https://extreme-ip-lookup.com/json/${ip}?callback=showIP&key=Qn97RtiI2gwjStzJJjuG`)
    if(iprequest.data.toString().startsWith('showIP')) {
        const dataJSON = JSON.parse(iprequest.data.toString().replace("showIP(","").replace(");",""))
        client.end(`\u00A7aYour IP: ${dataJSON.query}\n\u00A74Your Isp: ${dataJSON.isp}\n\u00A72Country: ${dataJSON.country}\n\u00A76City: ${dataJSON.city}\n\u00A78Iptype: ${dataJSON.ipType}\n\u00A7ftimezone: ${dataJSON.timezone}`);
      
    } else {
        client.end(`\u00A7c Sorry There's Error When Trying To get ip Info\nYour IP is: ${ip}`)
    }
    } catch (err) {
        console.log(err)
        client.end(`\u00A7cSorry There's Error When Trying To get ip Info\nYour IP is: ${ip}`)
    }
})