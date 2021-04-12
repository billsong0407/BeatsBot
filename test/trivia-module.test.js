

const { get_question_container, ask_question} = require('./mock/mock_trivia-module');

testContainer = [];
testQuestions = ['1+1', '1+2', "2+2"]
testRightAnswers = ['2', '3', '4']
testWrongAnswers = [['0','0','0'],['0','0','0'],['0','0','0']]

testWrongAnswers_wrongLength = [['0','0'],['0','0'],['0','0']]
index = 0

describe('test get_question_container', ()=>{
    test('case: blank container',() =>{
        expect(get_question_container()).toStrictEqual(testContainer);
    });
});

describe('test asking a question', ()=>{
    test('case: wrong_answer has wrong length',() =>{
        expect(ask_question(testQuestions[index], testRightAnswers[index], testWrongAnswers_wrongLength[index])).toBe(console.error('"wrong_answers" must have 3 members in an Array type'));
    });

    test('case: wrong_answer is not array',() =>{
        expect(ask_question(testQuestions[index], testRightAnswers[index], "this is not an array")).toBe(console.error('"wrong_answers" must have 3 members in an Array type'));
    });

    test('case: question is not a string',() =>{
        expect(ask_question(12345, testRightAnswers[index], testWrongAnswers)).toBe(console.error('"question" must be a string type.'));
    });

    test('case: right_answer is not a string',() =>{
        expect(ask_question(testQuestions[index], 12345, testWrongAnswers)).toBe(console.error('"right_answer" must be a string type.'));
    });

    test('case: valid question set',() =>{
        expect(ask_question(testQuestions[index], testRightAnswers[index], testWrongAnswers[index])).toBe(undefined);
    });
});


