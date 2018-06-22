const LPF2 = require(".").LPF2;

const lpf2 = new LPF2();
lpf2.scan();

lpf2.on("discover", async (hub) => {

    await hub.connect();

    console.log("Connected to Vernie!");

    let color = 0;
    setInterval(() => {
        color = color > 10 ? 1 : color + 1;
        hub.setLEDColor(color);
    }, 2000);

    await hub.setMotorSpeed("AB", 30, 2000);
    await hub.setMotorAngle("B", 360, -30)
    await hub.setMotorSpeed("A", 30, 2000);
    await hub.setMotorSpeed("B", -30, 2000);

});