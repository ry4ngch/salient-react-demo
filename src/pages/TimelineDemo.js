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

  return (
        <Card className="card-border">
          <CardInfo justify={true}>
              <CardTitle>Timeline</CardTitle>
              <select value={showCount} onChange={updateShowCount}>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
              </select>
          </CardInfo>
          <CardContent>
            <Timeline 
              showCount={showCount}
              isHorz={true} 
              isLoading={isLoading}
              isStaggered={true}
              centerEvents={true}
              showControls={true}
              isTimelineActive={true}
              activeEventID={3}>
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