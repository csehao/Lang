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
    constructor(characterCodeList) {
        this.characterCodeList = characterCodeList;
        this.events = {};
    }
    /** private */
    initEventAtTimestamp(timestamp){
        const eventsAtTimestamp = {
            eventBySource: [],
            eventByDestination: [],
        };
        for (const index in characterCodeList) {
            const code = this.characterCodeList[index];
            eventsAtTimestamp.eventBySource.push([]);
            eventsAtTimestamp.eventByDestination.push([]);
        }
        this.events[timestamp] = eventsAtTimestamp;
    }
    /** public */
    addEvent(timestamp, event){
        if(!this.events[timestamp])
        {
            this.initEventAtTimestamp(timestamp);
        }

        const source = event.src;
        if (source) {
            this.events[timestamp].eventByDestination[destination].push(event);
        }

        const destination = event.dst;
        if (destination) {
            this.events[timestamp].eventBySource[source].push(event);
        }
    }
    getEventsForDestination(timestamp, destination){
        return this.events[timestamp].eventByDestination[destination];
    }
    getEventsForSource(timestamp, source){
        return this.events[timestamp].eventBySource[source];
    }
}

module.exports = {
    EventHub
}