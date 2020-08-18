import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ListItem, Card } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

const ListOfQuiz = ({ navigation, quizList }) => {
    return quizList.map((item, index) => {
        return (
            <TouchableOpacity key={index}>
                <ListItem
                    bottomDivider
                    title={
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('TakerQuizDetails', { id: item._id })}>
                                <Card
                                    title={item.quizTitle.toUpperCase()}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text>No. of questions :</Text>
                                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>{item.questions.length}</Text>
                                        </View>
                                        <View>
                                            <Text>Passing score :</Text>
                                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>{item.passingScore}</Text>
                                        </View>
                                    </View>

                                </Card>


                            </TouchableOpacity>

                        </View>
                    }

                />
            </TouchableOpacity>
        );
    });
};

export default withNavigation(ListOfQuiz);