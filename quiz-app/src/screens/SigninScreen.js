import React, { useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { NavigationEvents } from 'react-navigation';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}>
            <View style={styles.container}>
                <NavigationEvents
                    onWillBlur={clearErrorMessage}
                />
                <AuthForm
                    headerText="Sign In to Your Account!"
                    errorMessage={state.errorMessage}
                    submitButtonText="Sign in"
                    onSubmit={signin}
                />

                <NavLink
                    routeName="Signup"
                    text="Don't have an account? Sign up now!"
                    clearErrMessage={clearErrorMessage}
                />
            </View>
        </KeyboardAvoidingView>

    )
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 150
    }
});

export default SigninScreen;