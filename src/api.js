import fs from 'fs';
import got from 'got';
import jsdom from 'jsdom';
import TeleBot from 'telebot';

const bot  = new TeleBot('5106718787:AAHtj2WJ88m0Ep2_FmVYdfJGEPzL4ox-RUk');

bot.start();


const { JSDOM } = jsdom;

const url = "https://www.krsystem.pl/index.php?szukaj=radeon+6600xt&kat=0&go=szukanie#start";

let stareCeny = [];

setInterval(() => {
    got(url).then(response => {
        const dom = new JSDOM(response.body);
        const ceny = dom.window.document.body.querySelectorAll('div .cena a');
        
            ceny.forEach(cena => {
                if(!stareCeny.includes(cena.textContent.substring(1,6))) 
                {stareCeny.push(cena.textContent.substring(1,6))
                 bot.sendMessage(2075117382, `Pojawiły się zmiany w Twoim wyszukiwaniu ${url}`);
                 console.log("powiadomienie o nowej cenie")}
                
            });
 
    }).catch(err => {
        console.log(err);
    });
}, 5000)

