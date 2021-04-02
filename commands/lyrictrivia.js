//import discord-quiz npm as dquiz
const dquiz = require ('./trivia-module.js');

//initialize arrays of questions, correct answers and wrong answers with matching index per question set
var questionPool = [
                    'That tonights gonna be a good night',
                    'Lets start living dangerously',
                    'Shawtys like a melody in my head',
                    'You dont have to put on the red light',
                    'We push and pull like a magnet do',

                    'So Ima light it up like dynamite, whoa oh oh',
                    'She was more like a beauty queen from a movie scene',
                    'I threw a wish in the well, dont ask me, Ill never tell ',
                    'Y hacer de tu cuerpo todo un manuscrito (sube, sube, sube)',
                    'Theres not a thing that I would change',

                    'Look into my eyes and Ill own you',
                    'We found love in a hopeless place',
                    'Yeah its pretty clear, I aint no size two',
                    'Everybody just have a good time',
                    'To the place I belong, West Virginia, mountain mama',

                    'Now and then I think of when we were together',
                    'ileon nae mam moleugo neomuhae neomuhae',
                    'Somebody once told me the world is gonna roll me',
                    'take me by the hand, Lead me to the land that you understand',
                    'Inochi sae tamashii sae kesshite oshiku nado wa nai'
                    ];

var answerPool = [
                  'I Gotta Feeling',
                  'Cake By the Ocean',
                  'Replay',
                  'Roxanne',
                  'Shape of You',

                  'Dynamite',
                  'Billie Jean',
                  'Call Me Maybe',
                  'Despacito',
                  'Just the Way You Are',

                  'Moves Like Jagger',
                  'We Found Love',
                  'All About That Bass',
                  'Party Rock Anthem',
                  'Take Me Home, Country Roads',

                  'Somebody That I Used To Know',
                  'TT',
                  'All Star',
                  'Ocean Man',
                  'Shinzou wo Sasageyo'

                 ];

var wrongPool = [
                 ['Its Gonna Be Me', 'Baby One More Time', 'Like a Prayer'],
                 ['Rockstar', 'Dance Monkey', 'Starboy'],
                 ['Thunder', 'Take Me to Church', 'Faded'],
                 ['Despacito', 'Rockstar', 'Counting Stars'],
                 ['Demons', 'Love Yourself', 'Bad Guy'],

                 ['Dont Let Me Down','Bad Guy','Airplanes'],
                 ['Bad Guy','Stay With Me','Bad Romance'],
                 ['Wrecking Ball','Uptown Funk','Radioactive'],
                 ['Hotline Bling','Forget You','Gods Plan'],
                 ['See You Again','Perfect','Somebody That I Used To Know'],

                 ['Payphone','Airplanes','TiK ToK'],
                 ['One More Night','Shake It Off','Firework'],
                 ['Thrift Shop','Bad Guy','Dark Horse'],
                 ['Sexy And I Know It','Love The Way You Lie','Firework'],
                 ['Radioactive','Wrecking Ball','Somebody That I Used To Know'],

                 ['Thinking Out Loud','California Gurls','Lucid Dreams'],
                 ['What is Love','Cheer Up','Fancy'],
                 ['Rockstar','Ocean Man','Perfect'],
                 ['Land Man','Sea Man','Lotion Man'],
                 ['Guren no Yumiya','Boku no sensou','koi no hime hime pettanko']
                ];

//generate random number for selecting a random question with its answers
function randNum(poolLength){
    return Math.floor(Math.random()*poolLength);
}

//main driver (generates a question per play)
module.exports = {
    name: 'lyrictrivia',
    cooldown: 11,
    description: 'lyrics trivia game: guess the song based on the lyrics',

    execute(message, args) {
        var rNum = randNum(questionPool.length);
        //message.channel.send(rNum);

        message.channel.send('You have 10 seconds to guess the song title of the following piece of lyrics!');
        dquiz.ask_question(questionPool[rNum], answerPool[rNum], wrongPool[rNum]);
        // dquiz.log_question_container();
        dquiz.trivia(message, 10); // Runs the trivia command
        //dquiz.trivia(message, 10, 'ffb7c5'); 
        
      
    },
  };