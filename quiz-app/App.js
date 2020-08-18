import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { setNavigator } from './src/nagivationRef'

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';

import ResolveAuthScreen from './src/screens/ResolveAuthScreen'

import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as MakerListOfQuizProvider } from './src/context/maker/ListOfQuizContext'
import { Provider as MakerQuizFormProvider } from './src/context/maker/QuizFormContext';
import { Provider as MakerQuizProvider } from './src/context/maker/QuizContext'

import { Provider as TakerListOfQuizProvider } from './src/context/taker/ListOfQuizContext';
import { Provider as TakerQuizProvider } from './src/context/taker/QuizContext'
import { Provider as TakerHistoryProvider } from './src/context/taker/HistoryContext'

//maker
import MakerListOfQuizScreen from './src/screens/maker/ListOfQuizScreen';
import MakerQuizTypeSelectionScreen from './src/screens/maker/QuizTypeSelectionScreen';

import MakerQuizDetailScreen from './src/screens/maker/QuizDetailScreen';
import CreateQuizScreen from './src/screens/maker/CreateQuizScreen';
import EditQuizScreen from './src/screens/maker/EditQuizScreen';
import AccountScreen from './src/screens/AccountScreen';

//taker
import TakerQuizTypeSelectionScreen from './src/screens/taker/QuizTypeSelectionScreen';
import TakerListOfQuizScreen from './src/screens/taker/ListOfQuizScreen';
import TakerQuizDetailScreen from './src/screens/taker/QuizDetailScreen';

import HistoryScreen from './src/screens/taker/HistoryScreen';
import QuizScreen from './src/screens/taker/QuizScreen';
import ResultScreen from './src/screens/taker/ResultScreen';

import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const makerQuizDetailsFlow = createStackNavigator({
  MakerQuizTypeSelection: MakerQuizTypeSelectionScreen,
  MakerListOfQuiz: MakerListOfQuizScreen,
  MakerQuizDetails: MakerQuizDetailScreen
})

makerQuizDetailsFlow.navigationOptions = {
  title: 'Quiz',
  tabBarIcon: <MaterialIcons name="format-color-text" size={24} color="black" />
};

const quizTakeFlow = createStackNavigator({
  TakerQuizTypeSelection: TakerQuizTypeSelectionScreen,
  TakerListOfQuiz: TakerListOfQuizScreen,
  TakerQuizDetails: TakerQuizDetailScreen
});

quizTakeFlow.navigationOptions = {
  title: 'Quiz',
  tabBarIcon: <MaterialIcons name="format-color-text" size={24} color="black" />
};

const historyFlow = createStackNavigator({
  History: HistoryScreen
})

historyFlow.navigationOptions = {
  title: 'History',
  tabBarIcon: <Fontisto name="history" size={24} color="black" />
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  makerFlow: createBottomTabNavigator({
    makerQuizDetailsFlow,
    MakerAccount: AccountScreen,
  }),
  MakerCreateQuiz: CreateQuizScreen,
  MakerEditQuiz: EditQuizScreen,
  takerFlow: createBottomTabNavigator({
    quizTakeFlow,
    historyFlow,
    TakerAccount: AccountScreen,
  }),
  quizFlow: createSwitchNavigator({
    TakeQuiz: QuizScreen,
    Result: ResultScreen
  })
},
  {});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <MakerQuizProvider>
        <MakerListOfQuizProvider>
          <MakerQuizFormProvider>
            <TakerListOfQuizProvider>
              <TakerHistoryProvider>
                <TakerQuizProvider>
                  <App ref={(navigator) => { setNavigator(navigator) }} />
                </TakerQuizProvider>
              </TakerHistoryProvider>
            </TakerListOfQuizProvider>
          </MakerQuizFormProvider>
        </MakerListOfQuizProvider>
      </MakerQuizProvider>
    </AuthProvider>
  );
};


