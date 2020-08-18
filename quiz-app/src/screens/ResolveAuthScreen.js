import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, [])

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} />
    </View>
};

export default ResolveAuthScreen;