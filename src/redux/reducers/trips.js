// src/redux/reducers/trips.js
const initialState = {
    trips: [],
    trip: {}
};

export default (state=initialState, action) => {
    switch (action.type) {
    case 'LOAD_TRIPS' :
        return {
            ...state,
            trips: action.trips
        };

    case 'VIEW_TRIP':
        return {
            ...state,
            trip: action.trip
        };

    case 'CLAP_TRIP':
        let trip = Object.assign({}, state.trip);
        trip.claps++;
        console.log(trip);
        return {
            ...state,
            trip: trip
        };

    default:
        return state;
    }
}
