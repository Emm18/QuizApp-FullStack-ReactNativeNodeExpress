import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Overlay, Button, Text, CheckBox } from 'react-native-elements'


const MultipleChoiceOverlay = ({ showOverlay, toggleOverlay, addQuestion }) => {
    const [question, setQuestion] = useState('');
    const [questionError, setQuestionError] = useState(false);

    const [ansA, setAnsA] = useState('');
    const [chkA, setChkA] = useState(false);
    const [aError, setAError] = useState(false);

    const [ansB, setAnsB] = useState('');
    const [chkB, setChkB] = useState(false);
    const [bError, setBError] = useState(false);

    const [ansC, setAnsC] = useState('');
    const [chkC, setChkC] = useState(false);
    const [cError, setCError] = useState(false);

    const [ansD, setAnsD] = useState('');
    const [chkD, setChkD] = useState(false);
    const [dError, setDError] = useState(false);

    const [noSelectedAnswerError, setNoSelectedAnswerError] = useState(false);

    const selectCorrectAnswer = (ans) => {

        if (ans == 'a') {
            setChkA(true);
            setChkB(false);
            setChkC(false);
            setChkD(false);
        } else if (ans == 'b') {
            setChkA(false);
            setChkB(true);
            setChkC(false);
            setChkD(false);
        } else if (ans == 'c') {
            setChkA(false);
            setChkB(false);
            setChkC(true);
            setChkD(false);
        } else if (ans == 'd') {
            setChkA(false);
            setChkB(false);
            setChkC(false);
            setChkD(true);
        }

    }

    const reset = () => {
        setQuestion('');
        setQuestionError(false);

        setAnsA('');
        setChkA(false);
        setAError(false);

        setAnsB('');
        setChkB(false);
        setBError(false);

        setAnsC('');
        setChkC(false);
        setCError(false);

        setAnsD('');
        setChkD(false);
        setDError(false);

        setNoSelectedAnswerError(false);
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
                {questionError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Question required</Text> : null}

                <Text>Select the correct answer :</Text>

                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={chkA}
                        onPress={() => {
                            selectCorrectAnswer('a');
                        }}
                    />
                    <Text style={{ fontSize: 35 }}>A</Text>
                    <View style={{ width: 200 }}>
                        <Input
                            onChangeText={(val) => setAnsA(val)}
                            value={ansA}
                            multiline
                        />
                        {aError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Answer required</Text> : null}
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={chkB}
                        onPress={() => {
                            selectCorrectAnswer('b');
                        }}
                    />
                    <Text style={{ fontSize: 35 }}>B</Text>
                    <View style={{ width: 200 }}>
                        <Input
                            onChangeText={(val) => setAnsB(val)}
                            value={ansB}
                            multiline
                        />
                        {bError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Answer required</Text> : null}
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={chkC}
                        onPress={() => {
                            selectCorrectAnswer('c');
                        }}
                    />
                    <Text style={{ fontSize: 38 }}>C</Text>
                    <View style={{ width: 200 }}>
                        <Input
                            onChangeText={(val) => setAnsC(val)}
                            value={ansC}
                            multiline
                        />
                        {cError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Answer required</Text> : null}
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <CheckBox
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={chkD}
                        onPress={() => {
                            selectCorrectAnswer('d');
                        }}
                    />
                    <Text style={{ fontSize: 38 }}>D</Text>
                    <View style={{ width: 200 }}>
                        <Input
                            onChangeText={(val) => setAnsD(val)}
                            value={ansD}
                            multiline
                        />
                        {dError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Answer required</Text> : null}
                    </View>
                </View>
                {noSelectedAnswerError ? <Text style={{ color: 'red', marginLeft: 10, top: -20 }}>Please select the correct answer</Text> : null}


                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, margin: 5 }}>
                        <Button title={'Save'} onPress={
                            () => {
                                let hasError = false;

                                if (!question) {
                                    hasError = true;
                                    setQuestionError(true);
                                } else {
                                    setQuestionError(false);
                                }

                                if (!chkA && !chkB && !chkC && !chkD) {
                                    hasError = true
                                    setNoSelectedAnswerError(true)
                                } else {
                                    setNoSelectedAnswerError(false);
                                }

                                if (!ansA) {
                                    hasError = true
                                    setAError(true);
                                } else {
                                    setAError(false);
                                }

                                if (!ansB) {
                                    hasError = true
                                    setBError(true);
                                } else {
                                    setBError(false);
                                }

                                if (!ansC) {
                                    hasError = true
                                    setCError(true);
                                } else {
                                    setCError(false);
                                }

                                if (!ansD) {
                                    hasError = true
                                    setDError(true);
                                } else {
                                    setDError(false);
                                }

                                if (!hasError) {

                                    const answer = [
                                        {
                                            answer: ansA,
                                            value: chkA ? 1 : 0
                                        },
                                        {
                                            answer: ansB,
                                            value: chkB ? 1 : 0
                                        },
                                        {
                                            answer: ansC,
                                            value: chkC ? 1 : 0
                                        },
                                        {
                                            answer: ansD,
                                            value: chkD ? 1 : 0
                                        },
                                    ];

                                    addQuestion(question, answer);
                                    reset();
                                    toggleOverlay(false);
                                }
                            }
                        } />
                    </View>

                    <View style={{ flex: 1, margin: 5 }}>
                        <Button title={'Cancel'} buttonStyle={{ backgroundColor: 'red' }} onPress={() => { toggleOverlay(false); reset(); }} />
                    </View>
                </View>
            </View>
        </Overlay>
    </>
};

export default MultipleChoiceOverlay;