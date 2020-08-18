import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation'
import { Input } from 'react-native-elements';

import { Feather } from '@expo/vector-icons';

import { Context as MakerListOfQuizContext } from '../../context/maker/ListOfQuizContext';

import ListOfQuiz from '../../components/maker/ListOfQuiz'

const ListOfQuizScreen = ({ navigation }) => {
    const { state: { search, quizList }, changeSearch, getQuizByType, searchQuiz } = useContext(MakerListOfQuizContext);
    const quizType = navigation.getParam('quizType');

    return (
        <>
            <NavigationEvents
                onWillFocus={() => {
                    changeSearch('');
                    getQuizByType(quizType);
                }}
            />
            <View style={styles.backgroundStyle}>
                <Feather
                    name="search"
                    style={styles.iconStyle}
                />
                <View style={{ width: 300 }}>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Search"
                        style={styles.inputStyle}
                        value={search}
                        onChangeText={val => changeSearch(val)}
                        onEndEditing={() => searchQuiz(search, quizType)}
                    />
                </View>
            </View>

            {quizList.length > 0
                ?
                <ScrollView>
                    <Text style={{ textAlign: "center" }}>Found {quizList.length} quiz title(s)</Text>
                    <ListOfQuiz
                        quizList={quizList}
                    />
                </ScrollView>
                :
                <Text style={{ textAlign: "center" }}>Found 0</Text>}
        </>
    )
};

ListOfQuizScreen.navigationOptions = ({ navigation }) => {
    const quizType = navigation.getParam('quizType');

    let headTitle = quizType == 0 ? 'Multiple Choice' : quizType == 1 ? 'Select All That Apply' : 'True Or False';

    return {
        title: <Text>{headTitle}</Text>
    };
};

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 15
    },
    buttons: {
        margin: 20
    },
    titleText: {
        fontSize: 20
    }
});

export default ListOfQuizScreen;