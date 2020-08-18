import React, { useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

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
                    headerText="Sign Up Now!"
                    errorMessage={state.errorMessage}
                    submitButtonText="Sign Up"
                    onSubmit={signup}
                />

                <NavLink
                    routeName="Signin"
                    text="Already have an account? Sign in now!"
                    clearErrMessage={clearErrorMessage}
                />
            </View>
        </KeyboardAvoidingView>
    )
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;