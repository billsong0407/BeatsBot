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

picLinkPool = [
    'https://ichef.bbci.co.uk/news/976/cpsprodpb/13956/production/_109741208_52992f18-40f3-4573-91a7-3792e56554a5.jpg',
    'https://www.usmagazine.com/wp-content/uploads/2020/12/Christina-Aguilera-Celebrates-Her-40th-Birthday-In-Style-Promo.jpg?quality=86&strip=all',
    'https://variety.com/wp-content/uploads/2018/11/dua-lipa-variety-hitmakers.jpg?w=1024',
    'https://www.onthisday.com/images/people/elvis-presley-medium.jpg',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2018-09-07-at-12-09-32-pm-1536336738.png?resize=480:*',

    'http://www.gstatic.com/tv/thumb/persons/182420/182420_v9_bc.jpg',
    'https://static.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551',
    'http://www.gstatic.com/tv/thumb/persons/371287/371287_v9_bc.jpg',
    'http://www.gstatic.com/tv/thumb/persons/1675/1675_v9_cc.jpg',
    'https://lh3.googleusercontent.com/XDS_2iuzovcNRUnBSpEDm1Z-fTwiAPGoPEog-mepfSO0c8uQXiBf3AgnqDThnG1xsO1q_MsswJFr44oyPrMfkWKjQQ',

    'https://media.newyorker.com/photos/5e2b598351d1330009001749/4:3/w_1899,h_1424,c_limit/Fry-JustinBieberDocuseries.jpg',
    'https://static.billboard.com/files/2020/12/jay-z-roc-nation-brunch-2020-billboard-1548-1607102538-compressed.jpg',
    'https://pyxis.nymag.com/v1/imgs/6c0/570/056961772f9239c7ad26e784b020e410ae-beyonce.rsquare.w1200.jpg',
    'https://media.newyorker.com/photos/59097443ebe912338a3777a8/4:3/w_1703,h_1277,c_limit/641024_r27604.jpg',
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F02%2F020918_ag_02_0210-v4-2000.jpg&q=85',

    'http://www.gstatic.com/tv/thumb/persons/170201/170201_v9_bc.jpg',
    'https://talentrecap.com/wp-content/uploads/2020/08/Jungkook-BTS-BTS-Army-1200x900.png',
    'https://i0.wp.com/blackpinkupdate.com/wp-content/uploads/2020/01/7-BLACKPINK-Rose-Airport-Outfit-blazer-to-Paris-26-January-2020.jpeg?fit=1024%2C1496&ssl=1',
    'https://assets.classicfm.com/2012/31/mozart-1343837321-editorial-short-form-1.jpg',
    'https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzMxNjQ2OTg4/johann-sebastian-bach-9194289-1-402.jpg'


]

picAnswerPool = [
'Taylor Swift',
'Christina Aguilera',
'Dua lipa',
'Elvis Presley',
'Kayne West',

'Eminem',
'Michael Jackson',
'Drake',
'Bruce Springsteen',
'Elton John',

'Justin Bieber',
'Jay-Z',
'Beyonce',
'Bob Dylan',
'Aariana Grande',

'Justin Timberlake',
'Jungkook',
'Rose',
'Mozart',
'Bach'
]

picWrongPool = [
[ 'Whitney Houston', 'Britney Spears', 'Beyonce'],
['Cher','Britney Spears','Celine Dion'],
['Rihanna','P!nk','Ariana Grande'],
['Paul McCartney','Roger Daltrey','Robert Plant'],
['Lil Peep','Usher','Lil Pump'],

['Tupac Shakur','Dr Dre','M&M'],
['Bruno Mars','Whitney Houston','Macaulay Culkin'],
['Kanye West','Travis Scott','Chris Brown'],
['Bob Dylan','Jon Bon Jovi','Sting'],
['Billy Joel','Freddie Mercury','John Lennon'],

['Selena Gomez','Shawn Mendes','Post Malone'],
['Lil Wayne','50 Cent','Snoop Dogg'],
['Nicki Minaj','Shakira','Kim Kardashian'],
['Bob Marley','Peter Tosh','Eric Clapton'],
['Ariana Venti','Riana Venti','Riana Grande'],

['Justin Bieber','Ed Sheeran','Eminem'],
['Suga','Jin','Jimin'],
['Lily','Jennie','Tzuyu'],
['bethoven','Chopin','Debussy'],
['Pach','Nach','Sach']
]


module.exports = {
    questionPool,
    answerPool,
    wrongPool,
    picLinkPool,
    picAnswerPool,
    picWrongPool
}
    