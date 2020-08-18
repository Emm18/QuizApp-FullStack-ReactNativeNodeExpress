import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'

import { Ionicons } from '@expo/vector-icons';

const QuizTypeSelectionScreen = ({ navigation }) => {
    return (
        <View style={{ justifyContent: 'space-evenly', flex: 1, marginHorizontal: 15 }}>
            <Button title={'Multiple Choice'} onPress={() => navigation.navigate('MakerListOfQuiz', { quizType: 0 })} />
            <Button title={'Select All That Apply'} onPress={() => navigation.navigate('MakerListOfQuiz', { quizType: 1 })} />
            <Button title={'True or False'} onPress={() => navigation.navigate('MakerListOfQuiz', { quizType: 2 })} />
        </View>
    )
};

const styles = StyleSheet.create({});


QuizTypeSelectionScreen.navigationOptions = ({ navigation }) => {
    return {
        title: <Text>Select Quiz Type</Text>,
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('MakerCreateQuiz')}>
            <Ionicons name="md-add-circle" size={32} color="black" />
        </TouchableOpacity>
    };
};

export default QuizTypeSelectionScreen;