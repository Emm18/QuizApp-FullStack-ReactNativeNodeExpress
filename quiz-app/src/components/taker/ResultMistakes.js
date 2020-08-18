import React, { useState } from 'react';
import { View } from 'react-native';
import { Overlay, Button, Text } from 'react-native-elements'


const ResultMistakes = ({ showOverlay, toggleOverlay, mistakes, quizType }) => {
    const [mistakeToDisplay, changeMistakeToDisplay] = useState(0);

    const displayMistakes = () => {

        if (mistakes.length > 0) {
            return <View>
                <Text style={{ textAlign: 'center' }} h2>{mistakes[mistakeToDisplay].question.toUpperCase()}</Text>
                {
                    quizType == 1
                        ?
                        <View>
                            <Text>Correct Answer(s) :</Text>
                            {
                                mistakes[mistakeToDisplay].correctAnswers.map((c, index) => {
                                    return <View key={index}>
                                        <Text style={{ backgroundColor: 'lightgreen', margin: 2, textAlign: 'center' }} h4>{c.answer.toUpperCase()}</Text>
                                    </View>
                                })
                            }
                            <Text>Your Answer(s) :</Text>
                            {
                                mistakes[mistakeToDisplay].takerAnswers.map((c, index) => {
                                    return <View key={index}>
                                        <Text style={{ backgroundColor: '#FFCCCB', margin: 2, textAlign: 'center' }} h4>{c.answer.toUpperCase()}</Text>
                                    </View>
                                })
                            }
                        </View>
                        :
                        <View>
                            <Text>Correct Answer :</Text>
                            <Text style={{ backgroundColor: 'lightgreen', margin: 2, textAlign: 'center' }} h4>{mistakes[mistakeToDisplay].correctAnswer.toUpperCase()}</Text>
                            <Text>Your Answer :</Text>
                            <Text style={{ backgroundColor: '#FFCCCB', margin: 2, textAlign: 'center' }} h4>{mistakes[mistakeToDisplay].takerAnswer.toUpperCase()}</Text>
                        </View>
                }

            </View>
        }
    }


    return <>
        <Overlay isVisible={showOverlay} height={'auto'} width={'auto'}>
            <View>
                <View style={{ width: 350, height: 400, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        displayMistakes()
                    }
                </View>

                <View style={{ width: 320, flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>

                    <View style={{ height: 50 }}>
                        {mistakeToDisplay > 0
                            ?
                            <Button
                                raised
                                buttonStyle={{ width: 100 }}
                                title={'previous'}
                                onPress={() => {
                                    changeMistakeToDisplay(mistakeToDisplay - 1)
                                }} />
                            :
                            null
                        }
                    </View>

                    <View style={{ height: 50 }}>
                        {mistakeToDisplay < mistakes.length - 1
                            ?
                            <Button
                                raised
                                buttonStyle={{ width: 100 }}
                                title={'next'}
                                onPress={() => {
                                    changeMistakeToDisplay(mistakeToDisplay + 1)
                                }} />
                            :
                            null
                        }
                    </View>
                </View>
                <Button title={"Confirm"} onPress={() => toggleOverlay(false)} />
            </View>
        </Overlay>

    </>
};

export default ResultMistakes;