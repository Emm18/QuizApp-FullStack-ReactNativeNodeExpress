import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Text, Button, Input } from 'react-native-elements';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <Text h3>{headerText}</Text>
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Input
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
        </View>
    )
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 20,
        color: "red",
        marginLeft: 10,
        marginTop: 10
    }
});

export default AuthForm;