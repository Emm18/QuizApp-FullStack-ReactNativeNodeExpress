import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { NavigationEvents, SafeAreaView } from 'react-navigation'

import ResultMistakes from '../../components/taker/ResultMistakes'

const ResultScreen = ({ navigation }) => {
    const quiz = navigation.getParam('quiz');
    const { quizTitle,
        quizType,
        remarks,
        score,
        mistakes,
        questionsList } = navigation.getParam('result');

    const [showMistakes, toggleMistakes] = useState(false)

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <NavigationEvents
                onWillFocus={() => {
                }}
            />

            <ResultMistakes
                showOverlay={showMistakes}
                toggleOverlay={(val) => toggleMistakes(val)}
                mistakes={mistakes}
                quizType={quizType}
            />





            <View style={{ justifyContent: 'center', height: "100%" }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center' }} h3>Your Score :</Text>
                    <Text style={{ textAlign: 'center' }} h2>{score} / {questionsList.length}</Text>
                    <Text style={{ textAlign: 'center' }} h1>{remarks}!</Text>

                    {score < questionsList.length
                        ?
                        <View style={{ width: 200, alignSelf: 'center', margin: 5 }}>
                            <Button raised title={'View mistakes'} onPress={() => {
                                toggleMistakes(true);
                            }} />
                        </View>
                        :
                        null
                    }

                    <View style={{ width: 200, alignSelf: 'center', margin: 5 }}>
                        <Button title={'Retake'} raised onPress={() => navigation.navigate('TakeQuiz', { quiz })} />
                    </View>

                </View>



                <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
                    <Button raised title={'Done'} onPress={() => navigation.navigate('TakerQuizTypeSelection')} />
                </View>
            </View>
        </SafeAreaView>

    )
};

const styles = StyleSheet.create({});

export default ResultScreen;