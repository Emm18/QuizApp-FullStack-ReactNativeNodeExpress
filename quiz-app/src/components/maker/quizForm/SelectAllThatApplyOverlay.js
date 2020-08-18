import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Input, Overlay, Button, Text, CheckBox, ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SelectAllThatApplyOverlay = ({ showOverlay, toggleOverlay, addQuestion }) => {
    const [question, setQuestion] = useState('');
    const [questionError, setQuestionError] = useState(false);
    const [answer, setAnswer] = useState('');
    const [answerError, setAnwerError] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [answersError, setAnswersError] = useState(false);

    const removeAnswer = (i) => {
        const newAnswers = answers.filter((ans, index) => index != i);
        setAnswers(newAnswers);
    }

    const reset = () => {
        setQuestion('');
        setQuestionError(false);
        setAnswer('');
        setAnwerError(false);
        setCorrect(false);
        setAnswers([]);
        setAnswersError(false);
    };



    return <>
        <Overlay overlayStyle={{ flex: 1, width: 380, height: 'auto' }} isVisible={showOverlay} height={'auto'} width={'auto'}>
            <View>
                <View>
                    <Input
                        label='Question'
                        labelStyle={{ fontSize: 18 }}
                        placeholder='Enter question'
                        onChangeText={(val) => setQuestion(val)}
                        value={question}
                        multiline
                    />
                    {questionError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Question is required</Text> : null}
                </View>

                <View style={{ top: -20 }}>
                    <Input
                        label='Answer'
                        labelStyle={{ fontSize: 18 }}
                        placeholder='Enter answer'
                        onChangeText={(val) => setAnswer(val)}
                        value={answer}
                        multiline
                    />
                    {answerError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Answer is required</Text> : null}
                </View>


                <View style={{ top: -40 }}>
                    <CheckBox
                        center
                        title='Correct Answer'
                        checked={correct}
                        onPress={() => setCorrect(!correct)}
                    />
                </View>


                <View style={{ top: -40 }}>
                    <Button title={'Add answer'} onPress={() => {
                        if (!answer) {
                            setAnwerError(true);
                        } else {
                            setAnwerError(false);
                            setAnswersError(false);
                            setAnswers([...answers, { answer, value: correct ? 1 : 0 }])
                            setAnswer('');
                            setCorrect(false);
                        }
                    }} />
                </View>

                <View style={{ height: 200, top: -40 }}>
                    <FlatList
                        data={answers}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity onPress={() => { }}>
                                <ListItem
                                    bottomDivider
                                    title={
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flex: 3 }}>
                                                <Text>{item.answer} {item.value == 1 ? <Feather name="check-circle" size={18} color="black" /> : null}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                                <TouchableOpacity onPress={() => removeAnswer(index)}>
                                                    <MaterialIcons name="delete" size={24} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                />
                            </TouchableOpacity>
                        }}
                    />
                </View>
                {answersError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Answers are required. Need to have at least 1 correct and 1 wrong answer</Text> : null}


                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, margin: 5 }}>
                        <Button title={'Save'} onPress={() => {
                            let hasError = false;
                            if (!question) {
                                setQuestionError(true);
                                hasError = true;
                            } else {
                                setQuestionError(false);
                            }

                            if (answers.length == 0 || answers.filter(x => x.value == 1).length == 0 || answers.filter(x => x.value == 0).length == 0) {
                                setAnswersError(true);
                                hasError = true;
                            } else {
                                setAnswersError(false);
                            }

                            if (!hasError) {
                                addQuestion(question, answers)
                                toggleOverlay(false);
                                reset();
                            }
                        }} />
                    </View>

                    <View style={{ flex: 1, margin: 5 }}>
                        <Button title={'Cancel'} buttonStyle={{ backgroundColor: 'red' }} onPress={() => { toggleOverlay(false); reset(); }} />
                    </View>
                </View>
            </View>
        </Overlay>
    </>
};

export default SelectAllThatApplyOverlay;