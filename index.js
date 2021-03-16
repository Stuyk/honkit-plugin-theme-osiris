const less = require("less");
const path = require("path");
const fs = require("fs");

async function handleInitHook() {
    const lessPath = path.join(__dirname, "_assets", "theme.less");
    const bgPath = path.join(__dirname, "_assets", "bg.png");
    const data = fs.readFileSync(lessPath).toString();
    const bgData = fs.readFileSync(bgPath);

    const lessData = await new Promise((resolve) => {
        less.render(data, (e, output) => {
            if (e) {
                throw e;
            }

            resolve(output.css);
        });
    });

    this.output.writeFile("bg.png", bgData);
    return this.output.writeFile("osiris.css", lessData);
}

module.exports = {
    hooks: {
        init: handleInitHook, // Called after everything is completed.
    },
};
