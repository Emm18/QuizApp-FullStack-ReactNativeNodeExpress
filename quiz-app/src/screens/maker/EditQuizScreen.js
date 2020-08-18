import React, { useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import QuizForm from '../../components/maker/QuizForm';
import { SafeAreaView } from 'react-navigation';

import { Context as MakerListOfQuizContext } from '../../context/maker/ListOfQuizContext'
import { Context as MakerQuizFormContext } from '../../context/maker/QuizFormContext'

import useUpdateQuiz from '../../hooks/maker/useUpdateQuiz'

const EditQuizScreen = ({ navigation }) => {
    const id = navigation.getParam('id')

    const { state: { quiz } } = useContext(MakerListOfQuizContext);
    const { setForm } = useContext(MakerQuizFormContext);

    const [update] = useUpdateQuiz();
    const nav = () => navigation.navigate('MakerQuizDetails', { id: id });
    return (
        <>
            <NavigationEvents
                onWillFocus={() => {
                    setForm(quiz)
                }}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}>
                <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', bottom: 'always' }}>
                    <QuizForm
                        onSubmit={(data, cb) => update(id, data, cb, nav)}
                        onCancel={() => nav()}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    )
};

const styles = StyleSheet.create({});

export default EditQuizScreen;