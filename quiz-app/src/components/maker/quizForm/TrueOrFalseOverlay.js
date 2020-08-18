import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Overlay, Button, Text, CheckBox } from 'react-native-elements'


const TrueOrFalseOverlay = ({ showOverlay, toggleOverlay, addQuestion }) => {
    const [question, setQuestion] = useState('');
    const [questionError, setQuestionError] = useState(false);
    const [chkTrue, setChkTrue] = useState(false);
    const [chkFalse, setChkFalse] = useState(false);
    const [chkError, setChkError] = useState(false);

    const reset = () => {
        setQuestion('');
        setQuestionError(false);
        setChkTrue(false);
        setChkFalse(false);
        setChkError(false);
    }

    return <>
        <Overlay isVisible={showOverlay} height={'auto'} width={'auto'}>
            <View style={{ width: 350 }}>
                <Input
                    label='Question'
                    labelStyle={{ fontSize: 20 }}
                    placeholder='Enter question'
                    onChangeText={(val) => setQuestion(val)}
                    value={question}
                    multiline
                />
                {questionError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Question is required</Text> : null}

                <Text>Select the correct answer :</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <CheckBox
                        center
                        title='True'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={chkTrue}
                        onPress={() => {
                            setChkTrue(true);
                            setChkFalse(false);
                        }}
                    />
                    <CheckBox
                        center
                        title='False'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={chkFalse}
                        onPress={() => {
                            setChkTrue(false);
                            setChkFalse(true);
                        }}
                    />
                </View>
                {chkError ? <Text style={{ color: 'red', marginLeft: 10, top: -5 }}>Please select the correct answer</Text> : null}

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

                            if (!chkTrue && !chkFalse) {
                                setChkError(true);
                                hasError = true;
                            } else {
                                setChkError(false);
                            }

                            if (!hasError) {
                                let answer = [];
                                if (chkTrue) {
                                    answer = [{ answer: 'true', value: 1 }, { answer: 'false', value: 0 }]
                                } else {
                                    answer = [{ answer: 'true', value: 0 }, { answer: 'false', value: 1 }]
                                }
                                addQuestion(question, answer);
                                toggleOverlay(false)
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

export default TrueOrFalseOverlay;