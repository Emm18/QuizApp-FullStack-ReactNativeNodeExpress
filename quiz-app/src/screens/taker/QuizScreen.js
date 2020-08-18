import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { NavigationEvents, SafeAreaView } from 'react-navigation'

import { Context as TakerQuizContext } from '../../context/taker/QuizContext'

import useSaveHistory from '../../hooks/taker/useSaveHistory'

import { EvilIcons } from '@expo/vector-icons';

const QuizScreen = ({ navigation }) => {
    const quiz = navigation.getParam('quiz');
    const { quizType, questions, quizTitle, passingScore } = quiz;

    const [save] = useSaveHistory();

    const {
        state: {
            startQuiz,
            questionsList,
            correctAnswersList,
            takerAnswersList,
            questionToDisplay
        },
        toggleStartQuiz,
        setQuestionsAndAnswersList,
        changeAnswer,
        changeQuestionToDisplay,
        reset
    } = useContext(TakerQuizContext)

    const displayAnswer = () => {
        const list = takerAnswersList.filter(qn => qn.questionNumber == questionToDisplay).sort((a, b) => a.answerNumber - b.answerNumber);

        return list.map((ans, index) => {
            return (
                <View key={index}>
                    <TouchableOpacity
                        onPress={() => changeAnswer(quizType, ans)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                center
                                checked={ans.value == 1 ? true : false}
                                onPress={() => changeAnswer(quizType, ans)}
                            />
                            <Text style={{ top: 7, width: '100%' }} h4>{ans.answer.toUpperCase()}</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            );
        });
    }

    const cancelQuizConfirmation = () => {
        return new Promise((resolve, reject) => {

            Alert.alert(
                "Warning!",
                "Are you sure you want to cancel taking this quiz?",
                [
                    {
                        text: "Cancel",
                        onPress: () => { resolve(false) },
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => { resolve(true) }
                    }
                ],
                { cancelable: false }
            )
        })
    };

    return (
        <>
            <SafeAreaView forceInset={{ top: 'always' }}>
                <NavigationEvents
                    onWillFocus={() => {
                        reset();
                    }}
                />
                {
                    startQuiz
                        ?
                        <View style={{ justifyContent: 'center', height: "100%" }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end', margin: 10 }}
                                onPress={async () => {
                                    let userResponse = await cancelQuizConfirmation();

                                    if (userResponse) {
                                        reset();
                                        navigation.navigate('quizTakeFlow');
                                    }
                                }}
                            >
                                <EvilIcons name="close" size={34} color="black" />
                            </TouchableOpacity>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {questionsList
                                    ?
                                    <Text h2>
                                        {questionsList.length > 0 ? questionsList[questionToDisplay].question : null}
                                    </Text>
                                    : null
                                }
                            </View>

                            <View style={{ flex: 1 }}>
                                {questionsList
                                    ?
                                    displayAnswer()
                                    : null
                                }
                            </View>

                            <Text style={{ textAlign: 'center' }}> {questionToDisplay + 1} of {questionsList.length}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>

                                <View style={{ height: 50 }}>
                                    {questionToDisplay > 0
                                        ?
                                        <Button
                                            raised
                                            buttonStyle={{ width: 100 }}
                                            title={'previous'}
                                            onPress={() => {
                                                changeQuestionToDisplay(-1);
                                            }} />
                                        :
                                        null
                                    }
                                </View>

                                <View style={{ height: 50 }}>
                                    {questionToDisplay < questionsList.length - 1
                                        ?
                                        <Button
                                            raised
                                            buttonStyle={{ width: 100 }}
                                            title={'next'}
                                            onPress={() => {
                                                changeQuestionToDisplay(1);
                                            }} />
                                        :
                                        null
                                    }
                                </View>
                            </View>


                            <View style={{ height: 50, marginHorizontal: 15 }}>
                                {questionToDisplay == questionsList.length - 1 && takerAnswersList.filter(q => q.value == 1).length >= questionsList.length
                                    ?
                                    <Button
                                        raised
                                        title={'Finish quiz'}
                                        onPress={() => {
                                            if (quizType != 1) {
                                                let score = 0;
                                                let mistakes = [];
                                                correctAnswersList.map(obj => {
                                                    if (obj.value == 1) {
                                                        let takersAnswer = takerAnswersList.filter(x => x.questionNumber == obj.questionNumber && x.answerNumber == obj.answerNumber)[0]
                                                        if (obj.value == takersAnswer.value) {
                                                            score++;
                                                        } else {
                                                            let takersAnswer = takerAnswersList.filter(x => x.questionNumber == obj.questionNumber && x.value == 1)[0]
                                                            mistakes.push({
                                                                questionNumber: obj.questionNumber + 1,
                                                                question: questionsList.filter(x => x.questionNumber == obj.questionNumber)[0].question,
                                                                correctAnswer: obj.answer,
                                                                takerAnswer: takersAnswer.answer
                                                            })
                                                        }
                                                    }
                                                })

                                                const result = {
                                                    quizTitle,
                                                    score,
                                                    remarks: score >= passingScore ? "Passed" : "Failed",
                                                    mistakes,
                                                    quizType,
                                                    questionsList
                                                };

                                                save(result, reset(), () => navigation.navigate('Result', { quiz, result }))
                                            } else {
                                                let score = 0;
                                                let mistakes = [];

                                                questionsList.map(q => {
                                                    let qNumber = q.questionNumber;
                                                    let isCorrect = true;
                                                    let correct = correctAnswersList.filter(x => x.questionNumber == qNumber);
                                                    let taker = takerAnswersList.filter(x => x.questionNumber == qNumber);


                                                    correct.map(a => {
                                                        let temp = taker.filter(b => b.answerNumber == a.answerNumber)[0];

                                                        if (a.value != temp.value) {
                                                            isCorrect = false;
                                                        }
                                                    })

                                                    if (isCorrect) {
                                                        score++;
                                                    } else {
                                                        let qstn = q.question;
                                                        let cAnswers = correct.filter(c => c.value == 1);
                                                        let tAnswers = taker.filter(t => t.value == 1);

                                                        mistakes.push({
                                                            question: qstn,
                                                            correctAnswers: cAnswers,
                                                            takerAnswers: tAnswers
                                                        })
                                                    }
                                                })

                                                const result = {
                                                    quizTitle,
                                                    score,
                                                    remarks: score >= passingScore ? "Passed" : "Failed",
                                                    mistakes,
                                                    quizType,
                                                    questionsList
                                                };
                                                save(result, reset(), () => navigation.navigate('Result', { quiz, result }));
                                            }
                                        }} />
                                    : null}

                            </View>

                        </View>
                        :
                        <View style={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                            <Button
                                containerStyle={{ width: 300 }}
                                buttonStyle={{ height: 100 }}
                                raised={true}
                                title={'Start Quiz'}
                                onPress={async () => {
                                    toggleStartQuiz(true);
                                    setQuestionsAndAnswersList(questions);
                                }} />
                        </View>
                }
            </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({});

export default QuizScreen;