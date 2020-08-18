import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import QuizForm from '../../components/maker/QuizForm';


import { SafeAreaView } from 'react-navigation';

import useSaveQuiz from '../../hooks/maker/useSaveQuiz'

const CreateQuizScreen = ({ navigation }) => {

    const [create] = useSaveQuiz();
    const nav = () => navigation.navigate('MakerQuizTypeSelection');

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}>
                <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', bottom: 'always' }}>
                    <QuizForm
                        onSubmit={(data, cb) => create(data, cb, nav)}
                        onCancel={() => nav()}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
};

const styles = StyleSheet.create({});

export default CreateQuizScreen;