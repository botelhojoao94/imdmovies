import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import currentPageReducer from './reducers/currentPageReducer'
import totalPagesReducer from './reducers/totalPagesReducer'
import titleReducer from './reducers/titleReducer'
import Header from './componets/Header';
import TitlesList from './componets/TitlesList';
import TitleSelected from './componets/TitleSelected';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    console.log(process.env.REACT_APP_API_HOST)

    const allReducers = combineReducers({currentPageReducer, totalPagesReducer, titleReducer})
    const store = createStore(allReducers)

    return (
        <Provider store={store}>
            <div className="App">
                <Header />
                <TitlesList />
                <TitleSelected />
            </div>
        </Provider>
    );
}

export default App;
