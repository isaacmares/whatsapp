clear
echo -e "\033[36m"
echo "  _________       __                     __ ____  ___"
echo " /   _____/____ _/  |_ __ _________  ____   _____/  |\\   \\/  /"
echo " \\_____  \\\\__  \\\\   __\\  |  \\_  __ \\/    \\_/ __ \\   __\\\\     /"
echo " /        \\/ __ \\|  | |  |  /|  | \\/   |  \\  ___/|  | /     \\"
echo "/_______  (____  /__| |____/ |__|  |___|  /\\___  >__|/___/\\  \\"
echo "        \\/     \\/                     \\/     \\/         \\_/"
echo -e "\033[0m"

sleep 3s

echo -e "\e[33m  ________                                    _____  __"
echo -e " /  _____/_____    _____ _____    ___________/ ____\\/  |_"
echo -e "/   \\  ___\\__  \\  /     \\\\\\__  \\  /  ___/  _ \\   __\\\\   __\\"
echo -e "\\    \\_\\  \\/ __ \\|  Y Y  \\/ __ \\_\\\\___ (  <_> )  |   |  |"
echo -e " \\______  (____  /__|_|  (____  /____  >____/|__|   |__|"
echo -e "        \\/     \\/      \\/     \\/     \\/\e[0m"

sleep 2s
clear


echo -e "               \e[1;35m🚀 SaturnoVPN\e[0m          "
sleep 2s
echo -e "\e[34m                                        _.oo."
echo -e "                 _.u[[/;:,.         .odMMMMMM'"
echo -e "              .o888UU[[[/;:-.  .o@P^    MMM^"
echo -e "             oN88888UU[[[/;::-.        dP^"
echo -e "            dNMMNN888UU[[[/;:--.   .o@P^"
echo -e "           ,MMMMMMN888UU[[/;::-. o@^"
echo -e "           NNMMMNN888UU[[[/~.o@P^"
echo -e "           888888888UU[[[/o@^-.."
echo -e "          oI8888UU[[[/o@P^:--.."
echo -e "       .@^  YUU[[[/o@^;::---.."
echo -e "     oMP     ^/o@P^;:::---.."
echo -e "  .dMMM    .o@^ ^;::---..."
echo -e " dMMMMMMM@^\`       \`^^^^"
echo -e "YMMMUP^"
echo -e " ^^\e[0m"
sleep 2s
echo -e "\e[1;35m🚀 CREANDO SERVER WHATSAPP\e[0m - \e[1;36mSaturnet IsaacM\e[0m"


apt install npm
mkdir whatsapp
cd whatsapp

apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

apt update && apt install -y \
    libasound2t64 \
    libatk-bridge2.0-0t64 \
    libatk1.0-0t64 \
    libcups2t64 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libvulkan1 \
    libglu1-mesa \
    fonts-liberation \
    ca-certificates \
    wget \
    libappindicator3-1

npm install whatsapp-web.js
echo -e "\e[34m                                        _.oo."
echo -e "                 _.u[[/;:,.         .odMMMMMM'"
echo -e "              .o888UU[[[/;:-.  .o@P^    MMM^"
echo -e "             oN88888UU[[[/;::-.        dP^"
echo -e "            dNMMNN888UU[[[/;:--.   .o@P^"
echo -e "           ,MMMMMMN888UU[[/;::-. o@^"
echo -e "           NNMMMNN888UU[[[/~.o@P^"
echo -e "           888888888UU[[[/o@^-.."
echo -e "          oI8888UU[[[/o@P^:--.."
echo -e "       .@^  YUU[[[/o@^;::---.."
echo -e "     oMP     ^/o@P^;:::---.."
echo -e "  .dMMM    .o@^ ^;::---..."
echo -e " dMMMMMMM@^\`       \`^^^^"
echo -e "YMMMUP^"
echo -e " ^^\e[0m"
npm install qrcode
npm install express
npm install multer
npm install mime-types

wget wget https://github.com/isaacmares/whatsapp/archive/refs/heads/main.zip
unzip main.zip
cd whatsapp-main
rm crearDocker.sh
node otroserver.js
