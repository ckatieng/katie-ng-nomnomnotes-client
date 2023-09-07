import "./Location.scss";
import SelectLocation from "../SelectLocation/SelectLocation";

function Location() {
    return(
        <div className="location">
            <h2 className="location__title">Set Location</h2>
            
            <div className="location__search">
                <SelectLocation />
            </div>
        </div>
    );
}

export default Location;