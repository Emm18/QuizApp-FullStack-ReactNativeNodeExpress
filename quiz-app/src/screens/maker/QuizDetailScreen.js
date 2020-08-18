import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Button, ListItem, Card, Text } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation'
import { Context as MakerListOfQuizContext } from '../../context/maker/ListOfQuizContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import useDeleteQuiz from '../../hooks/maker/useDeleteQuiz'

const QuizDetailScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [del] = useDeleteQuiz();
    const { state: { quiz }, getQuiz } = useContext(MakerListOfQuizContext)

    const questionsList = () => {
        return quiz.questions.map((element, index) => {
            return (
                <ListItem
                    key={index}
                    bottomDivider
                    title={
                        <View>
                            <Card
                                titleStyle={{ fontSize: 24 }}
                                title={element.question.toUpperCase()}
                            >
                                <Text>Answers :</Text>
                                <View>
                                    {element.answers.map((ans, index) => {
                                        return (
                                            <View key={index}>
                                                {ans.value == 1
                                                    ?
                                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                                        {(index + 1) + ". " + ans.answer.toUpperCase()}
                                                        <Feather name="check-circle" size={20} color="black" />
                                                    </Text>
                                                    :
                                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                                                        {(index + 1) + ". " + ans.answer.toUpperCase()}
                                                    </Text>
                                                }
                                            </View>
                                        )
                                    })}
                                </View>
                            </Card>
                        </View>
                    }

                />
            );
        });
    };

    const deleteConfirmation = () => {
        return new Promise((resolve, reject) => {

            Alert.alert(
                "Warning!",
                "Are you sure you want to delete this quiz",
                [
                    {
                        text: "Cancel",
                        onPress: () => { resolve(false) },
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => { resolve(true) }
                    }
                ],
                { cancelable: false }
            )
        })
    };

    return <>
        <NavigationEvents
            onWillFocus={() => {
                getQuiz(id);
            }}
        />
        {quiz.quizTitle
            ?
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }} h2>{quiz.quizTitle.toUpperCase()}</Text>
                    </View>

                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Text>{quiz.quizType == 0
                            ?
                            <Text h4> Multiple Choice </Text>
                            : quiz.quizType == 1
                                ?
                                <Text h4> Select All That Apply </Text>
                                :
                                <Text h4> True Or False </Text>}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginHorizontal: 20 }}>
                        <View>
                            <Text style={{ fontSize: 18 }}>No. of questions :</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 24 }}>{quiz.questions.length}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 18 }}>Passing score :</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 24 }}>{quiz.passingScore}</Text>
                        </View>
                    </View>

                    <Text style={{ textAlign: 'center', flex: 1 }} h4>Questions List</Text>

                    <View style={{ flex: 3 }}>
                        {quiz.questions ? questionsList() : <Text>LOADINGGGGGGGGGGGGGGGGGGGGGGGGGG</Text>}
                    </View>


                </View>

                <Button
                    buttonStyle={{ backgroundColor: 'red' }}
                    icon={<AntDesign name="delete" size={24} color="black" />}
                    title={'Delete'}
                    onPress={async () => {
                        let userResponse = await deleteConfirmation();

                        if (userResponse) {
                            del(id, () => navigation.navigate('MakerListOfQuiz', { quizType: quiz.quizType }))
                        }
                    }}
                />
            </ScrollView>
            :
            null}
    </>
};

QuizDetailScreen.navigationOptions = ({ navigation }) => {
    const id = navigation.getParam('id');

    return {
        title: <Text>Quiz Details</Text>,
        headerRight: () => <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
            navigation.navigate('MakerEditQuiz', { id })
        }}>
            <FontAwesome5 name="edit" size={32} color="black" />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({});

export default QuizDetailScreen;