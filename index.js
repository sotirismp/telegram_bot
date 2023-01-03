const TelegramBot = require("node-telegram-bot-api");
const sound = require("sound-play");

var cmd = require("node-cmd");

require("dotenv").config();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
const CHAT_ID_1 = process.env.CHAT_ID_1;
const CHAT_ID_2 = process.env.CHAT_ID_2;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
/*
cmd.run(
  `tasklist`,
  function(err, data, stderr){
    console.log(data)
  }
);*/

async function test() {
  await cmd.run(`tasklist`, async function (err, data, stderr) {
    console.log("running 1");
    let temp = data.split(/\r?\n/);
    for (let i = 4; i < temp.length; i++) {
      let temp2 = temp[i].split(/(\s+)/);
      if (temp2[0] == "chrome.exe") {
        //console.log(temp2[0]+' - '+temp2[2])
        cmd.run(
          '"C:/Users/PC/code/telegram-bot/nircmd.exe" muteappvolume /' +
            temp2[2] +
            " 0"
        );
      }
    }
    console.log("sound play");
    await sound.play(__dirname + "/sound.mp3");
    console.log("running 2");

    await cmd.run(`tasklist`, async function (err, data, stderr) {
      console.log("running 3");
      let temp = data.split(/\r?\n/);
      for (let i = 4; i < temp.length; i++) {
        let temp2 = temp[i].split(/(\s+)/);
        if (temp2[0] == "chrome.exe") {
          //console.log(temp2[0]+' - '+temp2[2])
          cmd.run(
            '"C:/Users/PC/code/telegram-bot/nircmd.exe" muteappvolume /' +
              temp2[2] +
              " 0"
          );
        }
      }
    });
  });
}

test();

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
  if (chatId == CHAT_ID_1) {
    console.log(msg.text);
    let text = msg.text;
    if (
      text == "!!" ||
      text == "50€" ||
      text == "100€" ||
      text == "150€" ||
      text == "200€" ||
      text == "250€" ||
      text == "300€"
    ) {
      await bot.sendMessage(CHAT_ID_1, "Στάλθηκε ειδοποίηση");
      await cmd.run(`tasklist`, async function (err, data, stderr) {
        console.log("running 1");
        let temp = data.split(/\r?\n/);
        for (let i = 4; i < temp.length; i++) {
          let temp2 = temp[i].split(/(\s+)/);
          if (temp2[0] == "chrome.exe") {
            //console.log(temp2[0]+' - '+temp2[2])
            cmd.run("nircmd.exe muteappvolume /" + temp2[2] + " 1");
          }
        }
        console.log("sound play");
        await sound.play(__dirname + "/sound.mp3");
        console.log("running 2");

        await cmd.run(`tasklist`, async function (err, data, stderr) {
          console.log("running 3");
          let temp = data.split(/\r?\n/);
          for (let i = 4; i < temp.length; i++) {
            let temp2 = temp[i].split(/(\s+)/);
            if (temp2[0] == "chrome.exe") {
              //console.log(temp2[0]+' - '+temp2[2])
              cmd.run("nircmd.exe muteappvolume /" + temp2[2] + " 0");
            }
          }
        });
      });

      // send a message to the chat acknowledging receipt of their message
    }
  }
  if (chatId == CHAT_ID_2) {
    await bot.sendMessage(CHAT_ID_2, "Received your message");
    await cmd.run(`tasklist`, async function (err, data, stderr) {
      console.log("running 1");
      let temp = data.split(/\r?\n/);
      for (let i = 4; i < temp.length; i++) {
        let temp2 = temp[i].split(/(\s+)/);
        if (temp2[0] == "chrome.exe") {
          console.log(temp2[0] + " - " + temp2[2]);
          cmd.run(
            '"C:/Users/PC/code/telegram-bot/nircmd.exe" muteappvolume /' +
              temp2[2] +
              " 0"
          );
        }
      }
      console.log("sound play");
      await sleep(2000);
      await sound.play(__dirname + "/sound.mp3");
      console.log("running 2");

      await cmd.run(`tasklist`, async function (err, data, stderr) {
        console.log("running 3");
        let temp = data.split(/\r?\n/);
        for (let i = 4; i < temp.length; i++) {
          let temp2 = temp[i].split(/(\s+)/);
          if (temp2[0] == "chrome.exe") {
            console.log(temp2[0] + " - " + temp2[2]);
            cmd.run(
              '"C:/Users/PC/code/telegram-bot/nircmd.exe" muteappvolume /' +
                temp2[2] +
                " 0"
            );
          }
        }
      });
    });

    console.log(msg.text);
  }
});
