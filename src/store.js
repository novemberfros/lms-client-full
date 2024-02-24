import { configureStore } from '@reduxjs/toolkit'
import userReducer from './pages/user/userSlice'
import bookReducer from './pages/book/bookSlice'
import burrowReducer from './entity/burrow/burrowSlice'
import reviewReducer from './entity/review/reviewSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    burrow: burrowReducer,
    review: reviewReducer,
  }
})

export default store