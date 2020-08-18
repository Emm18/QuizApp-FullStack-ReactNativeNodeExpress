import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation'

import { Context as TakerListOfQuizContext } from '../../context/taker/ListOfQuizContext';



const QuizDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const { state: { quiz }, getQuiz } = useContext(TakerListOfQuizContext)

    return (
        <>
            <NavigationEvents
                onWillFocus={() => {
                    getQuiz(id);
                }}
            />
            {
                quiz.quizTitle
                    ?
                    <View style={{ flex: 1, justifyContent: "center", top: -50 }}>
                        <View style={{ justifyContent: 'center', margin: 15 }}>
                            <Text style={{ textAlign: 'center' }} h2>{quiz.quizTitle.toUpperCase()}</Text>
                        </View>

                        <View style={{ alignItems: 'center', margin: 15 }}>
                            <Text>{quiz.quizType == 0
                                ?
                                <Text h4> Multiple Choice </Text>
                                : quiz.quizType == 1
                                    ?
                                    <Text h4> Select All That Apply </Text>
                                    :
                                    <Text h4> True Or False </Text>}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, margin: 15 }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>No. of questions :</Text>
                                <Text style={{ alignSelf: 'center', fontSize: 24 }}>{quiz.questions.length}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18 }}>Passing score :</Text>
                                <Text style={{ alignSelf: 'center', fontSize: 24 }}>{quiz.passingScore}</Text>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Button containerStyle={{ width: 300 }} raised={true} title={'Take Quiz'} onPress={() => navigation.navigate('TakeQuiz', { quiz })} />
                        </View>
                    </View>
                    :
                    null
            }
        </>
    )
};

QuizDetailScreen.navigationOptions = () => {
    return {
        title: <Text>Quiz Details</Text>
    };
};

const styles = StyleSheet.create({});

export default QuizDetailScreen;