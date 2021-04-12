const {questionPool,answerPool,wrongPool} = require('./mock/mock_lyricpic_test_data');

var testIndex = questionPool.indexOf('That tonights gonna be a good night');
var testIndex2 = questionPool.indexOf('Y hacer de tu cuerpo todo un manuscrito (sube, sube, sube)');
var testIndex3 = questionPool.indexOf('Inochi sae tamashii sae kesshite oshiku nado wa nai');


describe('test if lyric question matches the correct answer', ()=>{
    test('Test 1 on correctness of lyrics to their corresponding answer',() =>{
        expect(answerPool[testIndex]).toMatch("I Gotta Feeling");
    });

    test('Test 2 on correctness of lyrics to their corresponding answer',() =>{
        expect(answerPool[testIndex2]).toMatch('Despacito');
    });

    test('Test 3 on correctness of lyrics to their corresponding answer',() =>{
        expect(answerPool[testIndex3]).toMatch('Shinzou wo Sasageyo');
    });
});


describe('test if correct answer is not in the wrong pool', ()=>{
    test('Test 1 on answer not being in the wrong answers set',() =>{
        expect(wrongPool[testIndex]).not.toContain("I Gotta Feeling");
    });

    test('Test 2 on answer not being in the wrong answers set',() =>{
        expect(wrongPool[testIndex2]).not.toContain('Despacito');
    });

    test('Test 3 on answer not being in the wrong answers set',() =>{
        expect(wrongPool[testIndex3]).not.toContain('Shinzou wo Sasageyo');
    });
});