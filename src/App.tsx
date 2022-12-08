import store from 'redux/store'
import { Provider } from 'react-redux'
import Blog from 'pages/Blog'
function App() {
  return (
    <Provider store={store}>
      <Blog />
    </Provider>
  )
}

export default App
