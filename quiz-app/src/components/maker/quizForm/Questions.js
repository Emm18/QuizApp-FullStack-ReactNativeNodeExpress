import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, ListItem } from 'react-native-elements'

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Questions = ({ items, deleteItem }) => {
    return <>
        {items.length > 0
            ?
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity onPress={() => { }}>
                        <ListItem
                            bottomDivider
                            title={
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 3 }}>
                                        <Text style={{ fontSize: 20 }}>{item.question}</Text>
                                        <FlatList
                                            data={item.answers}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={(item) => {
                                                return <ListItem
                                                    title={
                                                        <Text>{item.item.answer} {item.item.value == 1 ? <Feather name="check-circle" size={18} color="black" /> : null}</Text>
                                                    }
                                                />
                                            }}
                                        />

                                    </View>

                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                        <TouchableOpacity onPress={() => deleteItem(index)}>
                                            <MaterialIcons name="delete" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        />
                    </TouchableOpacity>
                }}
            />
            :
            <View>
                <Text style={{ color: 'red', textAlign: 'center' }}>0 questions added</Text>
            </View>
        }
    </>
};

export default Questions;