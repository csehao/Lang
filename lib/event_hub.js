class EventHub{
    /* 
        characterList: [
            "Y",
            "N",
            "L",
            "S",
            "L",
            "L",
            "L",
            "L",
            "M",
            "M",
            "M",
            "M"
        ]
    */
    constructor() {
        this.eventBySource = {};
        this.eventByDestination = {}; 
    }
    /** public */
    addEvent(event){
        const source = event.src;
        const destination = event.dst;
        if (source !== undefined && source !== null) {
            if(!this.eventBySource[source]){
                this.eventBySource[source] = [];
            }
            this.eventBySource[source].push(event);
        }
        if (destination !== undefined && destination !== null ) {
            if(!this.eventByDestination[destination]){
                this.eventByDestination[destination] = [];
            }
            this.eventByDestination[destination].push(event);
        }
    }
    getEventsForDestination(destination){
        if(!this.eventByDestination[destination]){
            this.eventByDestination[destination] = [];
        }
        return this.eventByDestination[destination];
    }
    getEventsForSource(source){
        if (!this.eventBySource[source]) {
            this.eventBySource[source] = [];
        }
        return this.eventBySource[source];
    }
}

module.exports = {
    EventHub
}