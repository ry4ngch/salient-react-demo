import React, {useState, useEffect} from 'react'

// import the Dummy datas
import axios from 'axios';

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';

import Timeline, {TimelineEvent} from '../utils/Salient/UI/Timeline/Timeline';

const TimelineDemo = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [showCount, setShowCount] = useState(5);
  const [isStaggered, setIsStaggered] = useState(true);
  const [isHorz, setIsHorz] = useState(false);
  const [nodeIsCentered, setNodeIsCentered] = useState(true);

  useEffect(() => {
    axios.get('/assets/timeline_data.json')
      .then((response) => {
        setData(response.data.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        setIsLoading(false);
      });
  }, []);

  
  const updateShowCount = (event) => {
    setShowCount(parseInt(event.target.value, 10));
  }

  const updateTimelineOrientation = () => {
    setIsHorz((prevState) => !prevState);
  }

  const updateTimelinePosition = () => {
    setIsStaggered((prevState) => !prevState);
  }

  const updateNodeLocation = () => {
    setNodeIsCentered(prevState => !prevState);
  }

  return (
        <Card className="card-border">
          <CardInfo justify={true}>
              <CardTitle>Timeline</CardTitle>
              <div style={{display: 'inline-block'}}>
                <select value={nodeIsCentered} onChange={updateNodeLocation}>
                  <option value="true">Node Center</option>
                  <option value="false">Node Side</option>
                </select>
                <select value={isHorz} onChange={updateTimelineOrientation}>
                  <option value="true">Horizontal</option>
                  <option value="false">Vertical</option>
                </select>
                <select value={isStaggered} onChange={updateTimelinePosition}>
                  <option value="true">Staggered</option>
                  <option value="false">Non-Staggered</option>
                </select>
                <select value={showCount} onChange={updateShowCount}>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
              </div>
          </CardInfo>
          <CardContent>
            <Timeline 
              showCount={showCount}
              isHorz={isHorz} 
              isLoading={isLoading}
              isStaggered={isStaggered}
              centerEvents={nodeIsCentered}
              showControls={true}
              isTimelineActive={true}>
                {data.map((item, index) => (
                    <TimelineEvent 
                    key={item.id} 
                    icon={index === 0 ? 'icon-square' : 'icon-circle'}
                    text={item.text}
                    event={item.thumbnail}/>
                ))}
            </Timeline>
          </CardContent>
        </Card> 
  )
}

export default TimelineDemo;