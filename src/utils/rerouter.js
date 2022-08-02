
const airlineData=require('./airlineSchedule.json');
const labels=require('./labels.json');
const journeyTime=require('./journeyTime.json');
const PriorityQueue=require('./PriorityQueue.js');

class CityGraph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    findFulfillment(start){
        var ful={center: undefined, time: Infinity};
        //start point is a fulfillment center
        if(labels.fulfillments.includes(start)){
            ful.center=start;
            ful.time=0;
        }
        //find nearest fulfillment center
        else {
            for(let idx in this.adjacencyList[start]){
                const curNode=this.adjacencyList[start][idx];
                if(labels.fulfillments.includes(curNode.node) && ful.time>curNode.weight){
                    ful.center=curNode.node;
                    ful.time=curNode.weight;
                    //update nearest fulfillment center
                }
            }
        }
        return ful;
    }
    findPort(start, isNear){

      var port={path: [],name: undefined, time: Infinity};
      //if start and finish points are near
      //small port can also be used for local shipping
      if(isNear){
        if(labels.smallports.includes(start) || labels.bigports.includes(start)){
          port.name=start;
          port.time=0;
        }
        else{
          for(let idx in this.adjacencyList[start]){
            const curNode=this.adjacencyList[start][idx];
            //chek location is an airport and distance is less than previous airport
            if((labels.smallports.includes(curNode.node) || labels.bigports.includes(curNode.node)) && Number(port.time)>Number(curNode.weight)){
              port.name=curNode.node;
              port.time=curNode.weight;
              //update nearest airport
            }
          }
        }
      }
      //find nearest big airport
      //calculations similar to small airports
      else {
        if(labels.bigports.includes(start)){
          port.name=start;
          port.time=0;
        }
        else{
          for(let idx in this.adjacencyList[start]){
            const curNode=this.adjacencyList[start][idx];
            if(labels.bigports.includes(curNode.node) && port.time>curNode.weight){
              port.name=curNode.node;
              port.time=curNode.weight;
            }
          }
        }
      }
      //return nearest port
      return port;
    }
    findFlight(start, finish, curTime, groundTime) {
        
        //check if local flights possible
        const isNear=(groundTime<20)?true:false;
        //find nearest airports to start and finish
        const portStart=this.findPort(start, isNear);
        const portFin=this.findPort(finish, isNear);

        //find flight and time taken
        const flightPath={path: [], totalTime: Infinity};
        if(portStart.name===portFin.name)return flightPath;//nearest airports are same
        const flights = airlineData.filter(obj => obj.origin===portStart.name && obj.destination===portFin.name);//all flights between ports
        if(flights.length===0)return flightPath;//if no flights available then Infinity time
        let curMinWait=Infinity, bestFlight, totalTime=Number(portStart.time)+Number(portFin.time);
        for(let idx in flights){
            //time that order sits idle at airport
            //(flight time) - (time product arrived at airport)
            const curWait=(new Date().setHours(flights[idx].departure[0],flights[idx].departure[1],0) - curTime+24*60*60*1000)/(60*60*1000);
            //update minimum wait time
            if(curWait<curMinWait){
                curMinWait=curWait;
                bestFlight=flights[idx];
            }
        }

        //calculate total time spent till product's flight arrival
        totalTime+=Number(curMinWait)+Number(bestFlight.travel[0]+bestFlight.travel[1]/60);
        //update path and time
        if(start!==portStart.name)flightPath.path.push(start);
        flightPath.path.push(portStart.name+"$");
        flightPath.path.push(portFin.name+"$");
        if(finish!==portFin.name)flightPath.path.push(finish);
        flightPath.totalTime=totalTime;
        //return optimal flight
        return flightPath;
    }
    dijkstra(start, finish){
      const nodes = new PriorityQueue();
      const distances = {};
      const previous = {};
      let path = []; //to return at end
      let smallest, tempTime;
      //build up initial state
      for (let vertex in this.adjacencyList) {
        if (vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
      }
      // as long as there is something to visit
      while (nodes.values.length) {
        const curNode = nodes.dequeue();
        smallest = curNode.val;
        tempTime = curNode.priority;
        if (finish.includes(smallest)) {
          //WE ARE DONE
          //BUILD UP PATH TO RETURN AT END
          while (previous[smallest]) {
            path.push(smallest);
            smallest = previous[smallest];
          }
          break;
        }
        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjacencyList[smallest]) {
            //find neighboring node
            let nextNode = this.adjacencyList[smallest][neighbor];
            //calculate new distance to neighboring node
            let candidate = Number(distances[smallest]) + Number(nextNode.weight);
            let nextNeighbor = nextNode.node;
            if (candidate < distances[nextNeighbor]) {
              //updating new smallest distance to neighbor
              distances[nextNeighbor] = candidate;
              //updating previous - How we got to neighbor
              previous[nextNeighbor] = smallest;
              //enqueue in priority queue with new priority
              nodes.enqueue(nextNeighbor, candidate);
            }
          }
        }
      }
      if(tempTime===Infinity)return {path: undefined, totalTime: Infinity};
      let totalTime=tempTime;
      return {path: path.concat(smallest).reverse(), totalTime};
    }
  }

function addTime(date, numOfHours, numOfMinutes=0) {
    date.setTime(date.getTime() + numOfHours *60*60*1000 + numOfMinutes*60*1000);
    return date;
}

const reroute=(curLocation, status, newDestCity)=>{

    var graph= new CityGraph();
    //update city routes
    for(let idx in journeyTime){
        const edge=journeyTime[idx];
        graph.addVertex(edge.node1);
        graph.addVertex(edge.node2);
        graph.addEdge(edge.node1, edge.node2, edge.timeCost);
    }
    let airRoute={path:[], time:0}, groundRoute={path:[], time:0};
    //constant time to be added to route time
    const cargoLoadTime=[0, 30];
    const processTime=[0, 15];

    //find fulfillment center if order is not packaged
    if(status==="Order Placed"){
        const fulfill=graph.findFulfillment(curLocation);
        //if current location is not a fulfillment center node, update path
        if(fulfill.center!==curLocation){
            airRoute.path.push(curLocation);
            groundRoute.path.push(curLocation);
        }
        airRoute.time=groundRoute.time=Number(fulfill.time);
        curLocation=fulfill.center;
    }

    //find ground path
    let tempGroundRoute=graph.dijkstra(curLocation, [newDestCity]);
    for(let idx in tempGroundRoute.path)groundRoute.path.push(tempGroundRoute.path[idx]);
    groundRoute.time+=Number(tempGroundRoute.totalTime);

    //find path through flight
    let tempAirRoute=graph.findFlight(curLocation, newDestCity, addTime(new Date(), airRoute.time), groundRoute.time);
    for(let idx in tempAirRoute.path)airRoute.path.push(tempAirRoute.path[idx]);
    //add cargo load time and more processing time
    airRoute.time+=Number(tempAirRoute.totalTime)+Number((cargoLoadTime[1]+2*processTime[1])/60)+Number(cargoLoadTime[0]+2*processTime[0]);

    //return time efficient path
    if(groundRoute.time<airRoute.time)return groundRoute;
    else return airRoute;
}

// const product={
//     curLocation: "mysore",
//     status: "order placed"
// };
// const newDestination={
//     newDestCity: "muzaffarnagar"
// };
// console.log(reroute(product, newDestination));
module.exports=reroute;