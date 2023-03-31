//@ts-ignore
import html from "./content.js";

const { MARKETPLACE_URL = "https://monar.io", VITRINE_URL = "https://get.monar.io" } = process.env;

export function getContent(code: string) {
    let fill_html = html.replace("{####}", code);
    fill_html = fill_html.replace("{{MARKETPLACE_URL}}", MARKETPLACE_URL);
    fill_html = fill_html.replace("{{VITRINE_URL}}", VITRINE_URL);
    return fill_html;
}

export function getContentText(code: string) {
    return `Monar\n\n
        Voici votre code de connexion : ${code}`;
}
