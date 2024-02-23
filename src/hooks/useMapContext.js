const { createContext } = require("react");


const MapContext = createContext({
    lat: 0,
    lng: 0
});

export default MapContext;