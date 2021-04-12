const {picLinkPool,picAnswerPool,picWrongPool} = require('./mock/mock_lyricpic_test_data');

var testIndex = picLinkPool.indexOf('http://www.gstatic.com/tv/thumb/persons/371287/371287_v9_bc.jpg');
var testIndex2 = picLinkPool.indexOf('http://www.gstatic.com/tv/thumb/persons/1675/1675_v9_cc.jpg');
var testIndex3 = picLinkPool.indexOf('https://lh3.googleusercontent.com/XDS_2iuzovcNRUnBSpEDm1Z-fTwiAPGoPEog-mepfSO0c8uQXiBf3AgnqDThnG1xsO1q_MsswJFr44oyPrMfkWKjQQ');


describe('test if picture question matches the correct artist', ()=>{
    test('Test 1 on correctness of picture to their corresponding answer',() =>{
        expect(picAnswerPool[testIndex]).toMatch("Drake");
    });

    test('Test 2 on correctness of lyrics to their corresponding answer',() =>{
        expect(picAnswerPool[testIndex2]).toMatch('Bruce Springsteen');
    });

    test('Test 3 on correctness of lyrics to their corresponding answer',() =>{
        expect(picAnswerPool[testIndex3]).toMatch('Elton John');
    });
});


describe('test if correct artist is not in the wrong artist pool', ()=>{
    test('Test 1 on answer not being in the wrong answers set',() =>{
        expect(picWrongPool[testIndex]).not.toContain("Drake");
    });

    test('Test 2 on answer not being in the wrong answers set',() =>{
        expect(picWrongPool[testIndex2]).not.toContain('Bruce Springsteen');
    });

    test('Test 3 on answer not being in the wrong answers set',() =>{
        expect(picWrongPool[testIndex3]).not.toContain('Elton John');
    });
});