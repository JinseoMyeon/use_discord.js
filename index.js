const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client();

bot.login(botconfig.token);
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
bot.user.setActivity("!명령어목록 을 입력하여 도움말 보기");

});

bot.on("message", async message => {
  if(message.author.bot) return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let client = message.channel.client;
  let author = message.author;
  let cooldown1 = new Set();

 if(cmd === `${prefix}명령어목록`) {

    let bicon = bot.user.displayAvatarURL;
    let list = new Discord.RichEmbed()
    .setTitle("가상국가전쟁 전용 봇")
    .setThumbnail(bicon)
    .setColor("#39A29B")
    .addField("| 명령어 목록", "-")
    .addField("| !서버정보", "서버의 정보를 확인합니다.")
    .addField("| !영토획득 [지역]", "해당 지역을 획득합니다.")
    .addField("| !전쟁 [국가] [지역]", "해당 국가의 해당 지역과 전쟁합니다.");

    return message.channel.send(list);
  }

  if(cmd === `${prefix}서버정보`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("I 서버 정보 I")
    .setColor("#5980ab")
    .setThumbnail(sicon)
    .addField("- 서버 정보 안내 -", "-")
    .addField("| 서버 이름", message.guild.name)
    .addField("| 생성 날짜", message.guild.createdAt)
    .addField("| 최초접속날짜", message.member.joinedAt)
    .addField("| 총 멤버 수", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}영토획득`){
    if(!args.length) {
      return message.channel.send("지역 이름이 입력되지 않았습니다. 다시 입력하여주세요.");
    }
    else {
    message.channel.send("관리자에게 전송하였습니다. 잠시만 기다려주세요.");
    client.fetchUser('391417643418255372').then((user) => {
    user.send(`${author} 유저가 **${args}** 지역을 획득하고자 합니다.`);

  });
  }
}

if(cmd === `${prefix}전쟁`){
  if(!args.length) {
    return message.channel.send("전쟁할 국가가 입력되지 않았습니다. 다시 입력하여주세요.");
  }
  else {
  message.channel.send("관리자에게 전송하였습니다. 잠시만 기다려주세요.");
  client.fetchUser('391417643418255372').then((user) => {
  user.send(`${author} 유저가 **${args[0]}** 국가의 **${args[1]}** 도시를 침공하고자 합니다.`);
});
  }

}
});
