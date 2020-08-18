import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import { Context as TakerListOfQuizContext } from '../../context/taker/ListOfQuizContext';

const QuizTypeSelectionScreen = ({ navigation }) => {
    const { getRandomQuiz } = useContext(TakerListOfQuizContext);

    useEffect(() => {
        navigation.setParams({
            getRandomQuiz
        })
    }, [])

    return (
        <>
            <View style={{ justifyContent: 'space-evenly', flex: 1, marginHorizontal: 15 }}>
                <Button title={'Multiple Choice'} onPress={() => navigation.navigate('TakerListOfQuiz', { quizType: 0 })} />
                <Button title={'Select All That Apply'} onPress={() => navigation.navigate('TakerListOfQuiz', { quizType: 1 })} />
                <Button title={'True or False'} onPress={() => navigation.navigate('TakerListOfQuiz', { quizType: 2 })} />
            </View>
        </>
    )
};

QuizTypeSelectionScreen.navigationOptions = ({ navigation }) => {
    const getRandomQuiz = navigation.getParam('getRandomQuiz');
    return {
        title: <Text>Select Quiz Type</Text>,
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => getRandomQuiz()}>
            <Text>Random Quiz</Text>
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({});

export default QuizTypeSelectionScreen;