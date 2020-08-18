import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { NavigationEvents, SafeAreaView } from 'react-navigation'

import { Context as TakerHistoryContext } from '../../context/taker/HistoryContext'

import { FontAwesome } from '@expo/vector-icons';

const HistoryScreen = ({ navigation }) => {
    const { state: { historyList, loaded }, getHistory, deleteHistory, unload } = useContext(TakerHistoryContext)

    const deleteHistoryConfirmation = () => {
        return new Promise((resolve, reject) => {

            Alert.alert(
                "Warning!",
                "Are you sure you want to delete all quiz history?",
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

    const displayHistory = () => {
        return historyList.map((h, index) => {
            let color;
            if (h.remarks == 'Passed') {
                color = 'lightgreen';
            } else {
                color = '#FFCCCB'
            }

            return <ListItem
                key={index}
                title={
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{h.quizTitle}</Text>
                        <Text>{h.date}</Text>
                    </View>
                }
                containerStyle={{ backgroundColor: color }}
                bottomDivider
            />
        })
    }


    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <NavigationEvents
                onWillFocus={() => {
                    unload();
                    getHistory();
                }}
            />
            <View style={{ height: "100%" }}>
                {
                    loaded ?
                        historyList.length > 0
                            ?
                            <View style={{ top: -10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'lightgreen', width: 20, height: 20, marginTop: 5 }} />
                                    <Text> - PASSED </Text>
                                    <View style={{ backgroundColor: '#FFCCCB', width: 20, height: 20, marginTop: 5 }} />
                                    <Text> - FAILED</Text>
                                </View>

                                <Button
                                    containerStyle={{ width: 200, margin: 10, alignSelf: 'center' }}
                                    buttonStyle={{ backgroundColor: 'red' }}
                                    raised
                                    title={'Clear'}
                                    icon={<FontAwesome name="trash-o" size={24} color="black" />}
                                    onPress={async () => {
                                        let userResponse = await deleteHistoryConfirmation();

                                        if (userResponse) {
                                            deleteHistory();
                                        }
                                    }} />
                                <ScrollView>
                                    {
                                        displayHistory()
                                    }
                                </ScrollView>
                            </View>
                            :
                            <Text h3>You haven't taken any quiz</Text>
                        :
                        <ActivityIndicator />
                }



            </View>
        </SafeAreaView>
    )
};



HistoryScreen.navigationOptions = ({ navigation }) => {
    return {
        title: <Text>History</Text>
    };
};

const styles = StyleSheet.create({});

export default HistoryScreen;