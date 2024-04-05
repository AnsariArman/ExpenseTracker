This is a financial tracking application built using React Native, Redux, and Material UI components. The app allows users to track their income and expenses by adding transactions with a category, amount, date , and delete transaction history. The app also displays the total balance, total income, and total expenses.

Functionalities:

Add Transactions: Users can add transactions by entering the amount, selecting a category, and choosing a date. The app supports both income and expense transactions.
Display Balance: The app calculates and displays the total balance based on the user's transactions.
Display Totals: The app calculates and displays the total income and total expenses based on the user's transactions.
Transaction History: The app maintains a history of all transactions, which can be viewed by the user.
Local Storage: The app uses AsyncStorage to store transactions locally on the user's device.
Notes on using Redux:

Store: The app uses Redux to manage the state of the application. The Redux store holds the list of transactions, balance, total income, and total expenses.
Actions: The app defines actions for adding transactions, updating the Redux store, and calculating the balance and totals.
Reducers: The app uses reducers to handle actions and update the Redux store. The reducer for the transactions slice handles adding new transactions and updating the store.
Selectors: The app uses selectors to retrieve data from the Redux store. The useSelector hook from react-redux is used to access the Redux store in the App component.
Notes on using Material UI:

Components: The app uses Material UI components for the user interface. Material UI components provide a consistent look and feel and help maintain a clean and organized UI.
Styling: The app uses Material UI's built-in styling options to style the components. The makeStyles hook from Material UI is used to define custom styles for the components.
Responsiveness: Material UI components are responsive by default, making it easy to create a mobile app that looks great on different screen sizes and orientations.
Overall, this financial tracking application demonstrates the power of React Native, Redux, and Material UI for building mobile apps. The app's functionalities, local storage, and Redux integration make it a useful tool for tracking income and expenses. The Material UI components and styling provide a clean and organized user interface.



Here's a brief rundown of the components and libraries used:

Redux: The app uses Redux for state management. The useDispatch and useSelector hooks from react-redux are used to interact with the Redux store. The add action creator from the Todo slice is also imported to add transactions to the Redux store.
AsyncStorage: This library is used for local data storage. The app loads transactions from AsyncStorage when it mounts and saves new transactions to AsyncStorage when the user adds them.
React-Native-Paper: This library provides UI components for React Native. The app uses the TextInput, List, TouchableRipple, and RadioButton components from this library.
React-Native-Linear-Gradient: This library is used to create linear gradients in the app.
React-Native-Date-Picker: This library is used to display a date picker dialog.
Moment.js: This library is used for date formatting and manipulation.



