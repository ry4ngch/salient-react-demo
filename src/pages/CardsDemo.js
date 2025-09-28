import React from 'react'

// import Salient Library
import Card, {CardInfo, CardContent, CardTitle} from '../utils/Salient/UI/Card/Card';

const CardsDemo = () => {
  return (
        <Card className="card-border">
          <CardContent>
            <Card>
              <CardInfo>
                <CardTitle>Card (Without Animation)</CardTitle>
              </CardInfo>
              <CardContent>Normal card without animation, for more card display option, apply card-flat or card-border class to Card Component</CardContent>
              <CardContent>className='card-border' remove box-shadow and uses border, while className='card-flat' applies a single box-shadow</CardContent>
            </Card>
        
            <Card animation='scale'>
              <CardInfo>
                <CardTitle>Card (With Scale Animation)</CardTitle>
              </CardInfo>
              <CardContent>This card will scale and grow large</CardContent>
            </Card>

            <Card animation='flip-x'>
              <CardInfo>
                <CardTitle>Card (With Flip Animation)</CardTitle>
              </CardInfo>
              <CardContent>This will flip 180 around X-Axis</CardContent>
            </Card>

            <Card animation='flip-y'>
              <CardInfo>
                <CardTitle>Card (With Flip Animation)</CardTitle>
              </CardInfo>
              <CardContent>This will flip 180 around Y-Axis</CardContent>
            </Card>

            <Card animation="tilt">
                <CardInfo>
                  <CardTitle>Card (With Tilt Animation)</CardTitle>
                </CardInfo>
                <CardContent>Note: For Tilt Effect to work properly, card-grid class must be applied on inner div</CardContent>
            </Card>
          </CardContent>
          
        </Card>
  )
}

export default CardsDemo;