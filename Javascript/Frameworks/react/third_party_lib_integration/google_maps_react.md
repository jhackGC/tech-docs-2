
GOOGLE MAPS
--------------
included in the js imported library in the hmtl map
<script src="https://maps.googleapis.com/maps/api/js"></script>
so, you can access the library anywhere in the page (including component) like:

google.maps

Its a global object.

this.refs.map is the DOM element reference


componentDidMount(){
        new google.maps.Map(this.refs.map, {
                zoom: 12,
                center: {
                    lat: this.props.lat,
                    lng: this.props.lon
                }
            }
        );
    }

    render() {
        return (
            <div ref="map" /> // add this div elem to the reference list
        );
    }
