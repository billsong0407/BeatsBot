//########################### THIS FILE IS NOT A COMMAND #################################
const Discord = require('discord.js');

//define Question class => consists of a question, correct answer and other wrong answers
class Question {
    constructor(q, a, f) {
        this.question = q;
        this.answer = a;
        this.false = f;
    }
}

var question_container = []
var RED = 'FF0000';
var GREEN = '11FF00';
var YELLOW = 'EFFF20';
var total_points = 0;

exports.log_question_container = function () {
    console.log(question_container);
}

exports.get_question_container = function () {
    return question_container;
}

exports.ask_question = function (question, right_answer, wrong_answers) {

    if (wrong_answers.length != 3 || !wrong_answers instanceof Array){
        console.log('"wrong_answers" must have 3 members in an Array type')
        return 1;
    }
    if (typeof question != 'string'){
        console.error('"question" must be a string type.');
        return 2;
    }
    if (typeof right_answer != 'string'){
        console.error('"right_answer" must be a string type.');
        return 3;
    }

    question_container.push(new Question (question, right_answer, wrong_answers))
}





// Durstenfeld shuffle (opimized version of Fisher Yates shuffle)
function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}


exports.trivia = function (message, timer) {

    var q = question_container[Math.floor(Math.random() * question_container.length)]
    var a = shuffle([q.answer, q.false[0], q.false[1], q.false[2]])

    //checks for invalid inputs
    if (!Discord.Message.prototype.isPrototypeOf (message))
        return console.error ('"message" must be of type Message from discord.js');

    if (typeof timer != 'number')
        return console.error ('"timer" must be a number.');
    
    if (typeof q == 'undefined' || q.length <= 0)
        return console.error("You have to add question_container before calling for trivia function");

    

    message.channel.send (new Discord.MessageEmbed()
        .setAuthor(`Question: ${q.question}`) //message.client.user.avatarURL
        .setDescription(
            `A ) ${a[0]}
            B ) ${a[1]}
            C ) ${a[2]}
            D ) ${a[3]}`
        )
        .setColor(YELLOW)
    ).then (async emb_msg => {

        await emb_msg.react('🇦'); //display reactions async
        await emb_msg.react('🇧');
        await emb_msg.react('🇨');
        await emb_msg.react('🇩');

        const filter = (reaction, user) => {
            return ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && !user.bot;
        };

        emb_msg.awaitReactions(filter, { max: 1, time: timer*1000, errors: ['time'] }) //1000 = 1 second
            .then(collected => {

                var reaction = collected.first();
                var player = collected.first().users.cache.last();

                if (reaction.emoji.name === '🇦') {
                    if (a[0] === q.answer) {
                        message.channel.send(new Discord.MessageEmbed().setDescription(`${player} is correct! ✅`).setColor(GREEN))//green
                        total_points = total_points + 1;
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    }
                    else{
                        message.channel.send (new Discord.MessageEmbed().setDescription(`${player} is wrong ❌ The correct answer was ${q.answer}.`).setColor(RED));//red
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    }
                }
                else if (reaction.emoji.name === '🇧') {
                    if (a[1] === q.answer){
                        message.channel.send(new Discord.MessageEmbed().setDescription(`${player} is correct! ✅`).setColor(GREEN))
                        total_points = total_points + 1;
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    } 
                    else {
                        message.channel.send (new Discord.MessageEmbed().setDescription(`${player} is wrong ❌ The correct answer was ${q.answer}.`).setColor(RED));
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    }
                }
                else if (reaction.emoji.name === '🇨') {
                    if (a[2] === q.answer) {
                        message.channel.send(new Discord.MessageEmbed().setDescription(`${player} is correct! ✅`).setColor(GREEN))
                        total_points = total_points + 1;
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    }
                    else {
                        message.channel.send (new Discord.MessageEmbed().setDescription(`${player} is wrong ❌ The correct answer was ${q.answer}.`).setColor(RED));
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    }
                }
                else if (reaction.emoji.name === '🇩') {
                    if (a[3] === q.answer){
                        message.channel.send(new Discord.MessageEmbed().setDescription(`${player} is correct! ✅`).setColor(GREEN))
                        total_points = total_points + 1;
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    } 
                    else{
                        message.channel.send (new Discord.MessageEmbed().setDescription(`${player} is wrong ❌ The correct answer was ${q.answer}.`).setColor(RED));
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Total points: ${total_points}`).setColor(YELLOW));
                    } 
                }
            })
            .catch (collected => {
                message.channel.send(new Discord.MessageEmbed().setDescription("Times up! ⏰").setColor(RED));
            });
    })
    question_container.pop();
}