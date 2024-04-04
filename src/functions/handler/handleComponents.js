const fs = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentsFolder = fs.readdirSync(`./src/components`);
        for (const folder of componentsFolder) {
            const componentFile = fs.readdirSync(`./src/components/${folder}`).filter(
                (file) => file.endsWith('.js')
            );

            const { buttons, selectMenus } = client;

            switch (folder) {
                case "buttons":
                    for (const file of componentFile) {
                        const button = require(`../../components/${folder}/${file}`);
                        buttons.set(button.data.name, button);

                    }
                    break;

                case "selectMenus":
                    for (const file of componentFile) {
                        const menu = require(`../../components/${folder}/${file}`);
                        selectMenus.set(menu.data.name, menu);
                   }
                    break;
                default:
                    break;
            }
        }
    }
}