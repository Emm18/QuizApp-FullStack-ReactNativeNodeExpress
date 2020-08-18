import React, { useContext } from 'react';
import { View, Alert } from 'react-native';
import { Input, ButtonGroup, Button, Text } from 'react-native-elements'

import { Context as MakerQuizFormContext } from '../../context/maker/QuizFormContext';

import MultipleChoiceOverlay from './quizForm/MultipleChoiceOverlay';
import SelectAllThatApplyOverlay from './quizForm/SelectAllThatApplyOverlay';
import TrueOrFalseOverlay from './quizForm/TrueOrFalseOverlay';

import Questions from './quizForm/Questions';


const QuizForm = ({ onSubmit, onCancel }) => {
    const {
        state: {
            quizType,
            quizTitle,
            quizError,
            passingScore,
            passingScoreError,
            questionsError,
            showMultipleChoiceQuestion,
            showSelectAllThatApplyQuestion,
            showTrueOrFalseQuestion,
            questions
        },
        changeQuizType,
        changeQuizTitle,
        changePassingScore,
        toggleMultipleChoiceQuestion,
        toggleSelectAllThatApplyQuestion,
        toggleTrueOrFalseQuestion,
        toggleQuizTitleError,
        togglePassingScoreError,
        toggleQuestionsError,
        addQuestion,
        removeQuestion,
        removeAllQuestion,
        resetForm
    } = useContext(MakerQuizFormContext);

    const changingQuizTypeAlert = (quizTitle) => {
        return new Promise((resolve, reject) => {

            Alert.alert(
                "Warning!",
                "You currently have questions in " + quizTitle + ". Switching will delete all of it",
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
            <MultipleChoiceOverlay
                showOverlay={showMultipleChoiceQuestion}
                toggleOverlay={toggleMultipleChoiceQuestion}
                addQuestion={addQuestion}
            />

            <SelectAllThatApplyOverlay
                showOverlay={showSelectAllThatApplyQuestion}
                toggleOverlay={toggleSelectAllThatApplyQuestion}
                addQuestion={addQuestion}
            />

            <TrueOrFalseOverlay
                showOverlay={showTrueOrFalseQuestion}
                toggleOverlay={toggleTrueOrFalseQuestion}
                addQuestion={addQuestion}
            />

            <View style={{ flex: 1 }}>
                <ButtonGroup
                    onPress={async (index) => {
                        if (questions.length > 0) {
                            let response;

                            if (quizType == 0) {
                                response = await (changingQuizTypeAlert('Multiple Choice'));
                            } else if (quizType == 1) {
                                response = await (changingQuizTypeAlert('Select All That Apply'));
                            } else {
                                response = await (changingQuizTypeAlert('True Or False'));
                            }

                            if (response) {
                                changeQuizType(index)
                                removeAllQuestion();
                            }
                        } else {
                            changeQuizType(index)
                        }
                    }}
                    selectedIndex={quizType}
                    buttons={['Multiple Choice', 'Select All That Apply', 'True or False']}
                    containerStyle={{ height: 75 }}
                />
                <Input
                    label='Quiz Title : '
                    labelStyle={{ fontSize: 25 }}
                    placeholder='Enter quiz title'
                    onChangeText={(val) => changeQuizTitle(val)}
                    value={quizTitle}
                />
                {quizError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Quiz title is required</Text> : null}

                <Input
                    label='Passing Score : '
                    labelStyle={{ fontSize: 25 }}
                    placeholder='Passing Score'
                    onChangeText={(val) => changePassingScore(val)}
                    value={passingScore}
                />
                {passingScoreError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Passing score is required and should be a number and equal or below total questions. Current total questions ({questions.length})</Text> : null}

                <View style={{ flex: 3, padding: 5 }}>
                    <Button title={'Add Question'}
                        onPress={() => {
                            if (quizType == 0) {
                                toggleMultipleChoiceQuestion(true)
                            } else if (quizType == 1) {
                                toggleSelectAllThatApplyQuestion(true)
                            } else if (quizType == 2) {
                                toggleTrueOrFalseQuestion(true)
                            }
                        }} />
                    <Questions
                        items={questions}
                        deleteItem={(index) => removeQuestion(index)}
                    />
                </View>
                {questionsError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Questions are required</Text> : null}


                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, margin: 5 }}>
                            <Button
                                // icon={<AntDesign name="checkcircle" size={24} color="black" style={{ marginRight: 5 }} />}
                                title={'Save'}
                                onPress={() => {
                                    let hasError = false;

                                    if (!quizTitle) {
                                        toggleQuizTitleError(true);
                                        hasError = true;
                                    } else {
                                        toggleQuizTitleError(false);
                                    }

                                    if (!passingScore || passingScore > questions.length || isNaN(passingScore)) {
                                        togglePassingScoreError(true);
                                        hasError = true;
                                    } else {
                                        togglePassingScoreError(false);
                                    }

                                    if (questions.length == 0) {
                                        toggleQuestionsError(true);
                                        hasError = true;
                                    } else {
                                        toggleQuestionsError(false);
                                    }

                                    if (!hasError) {

                                        onSubmit({ quizTitle, passingScore, questions, quizType }, resetForm())
                                    }

                                }}
                            />
                        </View>

                        <View style={{ flex: 1, margin: 5 }}>
                            <Button
                                buttonStyle={{ backgroundColor: 'red' }}
                                // icon={<MaterialIcons name="cancel" size={26} color="black" />}
                                title={'Cancel'}
                                onPress={() => { onCancel(); resetForm(); }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default QuizForm;